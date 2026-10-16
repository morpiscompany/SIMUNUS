(() => {
    const i18n = window.SimunusI18n;
    let openControl = null;
    const controls = [...document.querySelectorAll(".language-control")];
    function close(restoreFocus = false) {
        if (!openControl) return;
        const trigger = openControl.querySelector("[data-language-trigger]");
        openControl.querySelector('[role="menu"]').hidden = true;
        trigger.setAttribute("aria-expanded", "false");
        openControl = null;
        if (restoreFocus) trigger.focus({ preventScroll: true });
    }
    function refresh() {
        controls.forEach(control => {
            const trigger = control.querySelector("[data-language-trigger]");
            trigger.setAttribute("aria-label", i18n.t("common", "chooseLanguage"));
            trigger.title = i18n.t("common", "chooseLanguage");
            control.querySelectorAll("[data-language-choice]").forEach(item => {
                item.setAttribute("aria-checked", String(item.dataset.languageChoice === i18n.current()));
            });
        });
    }
    controls.forEach(control => {
        const trigger = control.querySelector("[data-language-trigger]");
        const menu = control.querySelector('[role="menu"]');
        const items = [...menu.querySelectorAll("button")];
        function open(last = false) {
            close(); openControl = control; menu.hidden = false; trigger.setAttribute("aria-expanded", "true");
            (last ? items.at(-1) : items.find(item => item.dataset.languageChoice === i18n.current()) || items[0]).focus();
        }
        trigger.addEventListener("click", () => openControl === control ? close(true) : open());
        trigger.addEventListener("keydown", event => {
            if (["ArrowDown", "ArrowUp"].includes(event.key)) { event.preventDefault(); open(event.key === "ArrowUp"); }
        });
        items.forEach(item => item.addEventListener("click", () => {
            i18n.setManual(item.dataset.languageChoice); close(true);
        }));
        menu.addEventListener("keydown", event => {
            const index = items.indexOf(document.activeElement);
            const next = { ArrowDown: (index + 1) % items.length, ArrowUp: (index + items.length - 1) % items.length, Home: 0, End: items.length - 1 }[event.key];
            if (next !== undefined) { event.preventDefault(); items[next].focus(); }
            if (event.key === "Escape") { event.preventDefault(); close(true); }
            if (event.key === "Tab") close(true);
        });
    });
    document.addEventListener("pointerdown", event => { if (openControl && !openControl.contains(event.target)) close(); });
    document.addEventListener("keydown", event => { if (event.key === "Escape") close(true); });
    document.addEventListener("focusin", event => { if (openControl && !openControl.contains(event.target)) close(); });
    i18n.subscribe(refresh); refresh();
})();
