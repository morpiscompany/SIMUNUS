/* One language policy for the app and recovery. Only an explicit manual choice
 * is persisted; old automatic/browser/database preferences are not imported. */
(() => {
    const key = "simunus-manual-language-v1";
    const names = { en: "English", pt: "Português (Brasil)", es: "Español" };
    const dictionaries = new Map();
    const listeners = new Set();
    const normalize = value => {
        const code = String(value || "").toLowerCase().split(/[-_]/)[0];
        return Object.hasOwn(names, code) ? code : null;
    };
    const device = () => (navigator.languages?.length ? navigator.languages : [navigator.language])
        .map(normalize).find(Boolean) || "en";
    function stored() {
        try {
            const value = JSON.parse(localStorage.getItem(key));
            return value?.source === "manual" ? normalize(value.language) : null;
        } catch (_) { return null; }
    }
    let manual = stored(), language = manual || device(), channel;
    let notified = language;
    function notify() {
        document.documentElement.lang = language === "pt" ? "pt-BR" : language;
        if (notified === language) return;
        notified = language;
        listeners.forEach(fn => fn(language));
        window.dispatchEvent(new CustomEvent("simunus:language", { detail: { language } }));
    }
    function setManual(value) {
        const next = normalize(value);
        if (!next) return;
        manual = next; language = next;
        const record = { source: "manual", language: next };
        try { localStorage.setItem(key, JSON.stringify(record)); } catch (_) {}
        try { channel?.postMessage(record); } catch (_) {}
        notify();
    }
    window.addEventListener("storage", event => {
        if (event.key !== key && event.key !== null) return;
        manual = stored(); language = manual || device(); notify();
    });
    window.addEventListener("languagechange", () => {
        if (!manual) { language = device(); notify(); }
    });
    try {
        channel = new BroadcastChannel(key);
        channel.onmessage = event => {
            const next = event.data?.source === "manual" && normalize(event.data.language);
            if (next) { manual = next; language = next; notify(); }
        };
    } catch (_) {}
    dictionaries.set("common", {
        pt: { chooseLanguage:"Escolher idioma", contentAvailable:"Conteúdo disponível em {language}.", contentMissing:"Não há tradução completa desta questão disponível.", reportPrepared:"Relato preparado. O envio ainda não está conectado.", openPhase:"Abrir fase", reorderPhase:"Reorganizar fase", dragReorder:"Arraste para reorganizar", moreOptions:"Mais opções" },
        es: { chooseLanguage:"Elegir idioma", contentAvailable:"Contenido disponible en {language}.", contentMissing:"No hay una traducción completa de esta pregunta disponible.", reportPrepared:"Informe preparado. El envío aún no está conectado.", openPhase:"Abrir fase", reorderPhase:"Reordenar fase", dragReorder:"Arrastra para reordenar", moreOptions:"Más opciones" },
        en: { chooseLanguage:"Choose language", contentAvailable:"Content available in {language}.", contentMissing:"No complete translation of this question is available.", reportPrepared:"Report prepared. Sending is not connected yet.", openPhase:"Open phase", reorderPhase:"Reorder phase", dragReorder:"Drag to reorder", moreOptions:"More options" }
    });
    const extra = {"pt":{"catalogOriginal":"Títulos e descrições do catálogo permanecem no idioma de origem.","exampleAnatomy":"Ex.: Anatomia","exampleBones":"Ex.: Ossos longos","exampleStudy":"Ex.: Estudo da classificação e características dos ossos longos","exampleSkeleton":"Ex.: Esqueleto","exampleQuestion":"Ex.: Qual é o maior osso do corpo humano?","exampleAnswer":"Ex.: Fêmur","exampleExplanation":"Ex.: O fêmur é o maior e mais longo osso do corpo humano.","exampleObjective":"Ex.: Diferenciar os ossos longos"},"es":{"catalogOriginal":"Los títulos y las descripciones del catálogo se conservan en su idioma original.","exampleAnatomy":"Ej.: Anatomía","exampleBones":"Ej.: Huesos largos","exampleStudy":"Ej.: Estudio de la clasificación y las características de los huesos largos","exampleSkeleton":"Ej.: Esqueleto","exampleQuestion":"Ej.: ¿Cuál es el hueso más grande del cuerpo humano?","exampleAnswer":"Ej.: Fémur","exampleExplanation":"Ej.: El fémur es el hueso más grande y largo del cuerpo humano.","exampleObjective":"Ej.: Diferenciar los huesos largos"},"en":{"catalogOriginal":"Catalog titles and descriptions remain in their original language.","exampleAnatomy":"E.g. Anatomy","exampleBones":"E.g. Long bones","exampleStudy":"E.g. Study of the classification and features of long bones","exampleSkeleton":"E.g. Skeleton","exampleQuestion":"E.g. What is the largest bone in the human body?","exampleAnswer":"E.g. Femur","exampleExplanation":"E.g. The femur is the largest and longest bone in the human body.","exampleObjective":"E.g. Distinguish long bones"}};
    for (const language of Object.keys(extra)) Object.assign(dictionaries.get("common")[language], extra[language]);
    const messages = namespace => {
        const table = dictionaries.get(namespace) || {};
        return table[language] || table.en || table.pt || {};
    };
    function translateExisting(value, from) {
        const trimmed = value.trim(), marker = trimmed.endsWith(" *") ? " *" : "";
        const source = marker ? trimmed.slice(0, -2) : trimmed;
        function find(old, next) {
            for (const [name, text] of Object.entries(old || {})) {
                if (typeof text === "string" && text === source && typeof next?.[name] === "string") return next[name];
                if (text && typeof text === "object") { const found = find(text, next?.[name]); if (found) return found; }
            }
            return null;
        }
        for (const table of dictionaries.values()) {
            const found = find(table[normalize(from)], table[language]);
            if (found) return value.replace(trimmed, found + marker);
        }
        return value;
    }
    window.SimunusI18n = Object.freeze({
        current: () => language, manual: () => manual, device, normalize, names, setManual,
        register: (namespace, table) => dictionaries.set(namespace, table), messages, translateExisting,
        t: (namespace, name, parameters = {}) => {
            let value = messages(namespace)[name] || "";
            for (const [key, replacement] of Object.entries(parameters)) value = value.replaceAll(`{${key}}`, replacement);
            return value;
        },
        subscribe: fn => { listeners.add(fn); return () => listeners.delete(fn); }
    });
    document.documentElement.lang = language === "pt" ? "pt-BR" : language;
})();
