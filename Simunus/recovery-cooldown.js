/* UI-only, browser-wide resend pacing. No account identifiers or credentials. */
(() => {
    const key = "simunus-recovery-cooldown-v1";
    const empty = () => ({ count: 0, lastAcceptedAt: 0, until: 0 });
    let memory = empty();
    let storageAvailable = true;
    const listeners = new Set();
    let channel;
    function valid(value) {
        return value && Number.isInteger(value.count) && value.count >= 0 && value.count <= 5
            && Number.isFinite(value.lastAcceptedAt) && value.lastAcceptedAt >= 0
            && Number.isFinite(value.until) && value.until >= 0;
    }
    function read() {
        try {
            const stored = storageAvailable ? JSON.parse(localStorage.getItem(key)) : null;
            if (valid(stored)) memory = stored;
        } catch (_) { storageAvailable = false; }
        return { ...memory };
    }
    function notify() { listeners.forEach(fn => fn()); }
    function write(state) {
        memory = state;
        try { if (storageAvailable) localStorage.setItem(key, JSON.stringify(state)); } catch (_) { storageAvailable = false; }
        try { channel?.postMessage(state); } catch (_) {}
        notify();
    }
    function accepted() {
        const state = read(), now = Date.now();
        const count = Math.min(5, (now - state.lastAcceptedAt >= 3600000 ? 0 : state.count) + 1);
        write({ count, lastAcceptedAt: now, until: Math.max(state.until, now + count * 60000) });
    }
    function limited(retryAfter) {
        const state = read(), now = Date.now();
        const raw = typeof retryAfter === "string" ? retryAfter.trim() : "";
        let delay = /^\d+(\.\d+)?$/.test(raw) ? Number(raw) * 1000 : Date.parse(raw) - now;
        // Missing/unreadable CORS header: conservative five minutes, no automatic retry.
        if (!Number.isFinite(delay)) delay = 300000;
        delay = Math.max(0, delay);
        write({ ...state, until: Math.max(state.until, now + delay) });
    }
    window.addEventListener("storage", event => {
        if (event.key !== key && event.key !== null) return;
        try {
            const state = JSON.parse(event.newValue);
            if (valid(state)) memory = state;
        } catch (_) {}
        notify();
    });
    try {
        channel = new BroadcastChannel(key);
        channel.onmessage = event => {
            if (valid(event.data)) { memory = event.data; notify(); }
        };
    } catch (_) {}
    window.SimunusRecoveryCooldown = Object.freeze({
        read, accepted, limited,
        remaining: () => Math.max(0, Math.ceil((read().until - Date.now()) / 1000)),
        subscribe: fn => { listeners.add(fn); return () => listeners.delete(fn); }
    });
})();
