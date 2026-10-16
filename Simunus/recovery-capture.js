/* Capture the official implicit callback in memory and erase credentials before external scripts. */
(() => {
    const hash = new URLSearchParams(location.hash.slice(1));
    const query = new URLSearchParams(location.search);
    window.SimunusRecoveryCallback = {
        present: Boolean(location.hash) || query.has("error") || query.has("code") || query.has("token_hash"),
        type: hash.get("type"),
        access_token: hash.get("access_token"),
        refresh_token: hash.get("refresh_token"),
        error: hash.has("error") || query.has("error") || query.has("code") || query.has("token_hash"),
        language: query.get("lang")
    };
    const clean = new URL(location.href);
    clean.hash = "";
    clean.search = "";
    if (["pt", "es", "en"].includes(query.get("lang"))) clean.searchParams.set("lang", query.get("lang"));
    history.replaceState(null, "", clean.href);
    try {
        const theme = localStorage.getItem("simulados-medicina-theme");
        document.documentElement.dataset.tema = theme === "escuro" || theme === "claro" ? theme
            : (matchMedia("(prefers-color-scheme: dark)").matches ? "escuro" : "claro");
    } catch (_) {}
})();
