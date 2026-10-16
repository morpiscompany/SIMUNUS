/* Select existing translations only. Never mutate authored question banks. */
(() => {
    const i18n = window.SimunusI18n;
    const backendCode = language => language === "pt" ? "pt-BR" : language;
    function questionLanguage(item, preferred = i18n.current()) {
        const order = [...new Set([preferred, "pt", "es", "en"])];
        if (item?.translations) {
            return order.find(code => {
                const entry = item.translations[backendCode(code)] || item.translations[code];
                return entry?.stem && entry.options && Object.keys(entry.options).length >= 2;
            }) || null;
        }
        return order.find(code => {
            if (code === "pt") return item?.perguntaPT && (item.respostaPT || item.resposta || item.nomePT);
            if (code === "es") return (item?.perguntaES || item?.pergunta) && (item.respostaES || item.resposta || item.nome);
            return (item?.perguntaEN || item?.ingles?.pergunta || item?.ingles?.stem)
                && (item.respostaEN || item.nomeEN || item.ingles?.resposta || item.ingles?.nome || item.ingles?.correctAnswer);
        }) || null;
    }
    function notice(language) {
        let element = document.getElementById("content-language-notice");
        if (!element) {
            element = document.createElement("p"); element.id = "content-language-notice";
            element.className = "content-language-notice";
            document.getElementById("pergunta")?.before(element);
        }
        const normalized = i18n.normalize(language);
        element.hidden = normalized === i18n.current();
        element.textContent = normalized ? i18n.t("common", "contentAvailable", { language: i18n.names[normalized] }) : i18n.t("common", "contentMissing");
    }
    async function attempt(api, id, preferred) {
        const order = [...new Set([preferred, "pt-BR", "es", "en"])];
        const versions = await Promise.all(order.map(async language => ({ language, rows: await api.getSimulationAttempt(id, language) })));
        const allIds = new Set(versions.flatMap(value => (value.rows || []).map(row => row.attempt_question_id)));
        for (const version of versions) {
            if (!allIds.size || version.rows?.length !== allIds.size || version.rows.some(row => !row.prompt)) continue;
            const questions = await Promise.all(version.rows.map(async row => ({
                ...row, alternativasSupabase: await api.getAttemptQuestionOptions(row.attempt_question_id, version.language)
            })));
            if (questions.every(row => Array.isArray(row.alternativasSupabase) && row.alternativasSupabase.length >= 2)) {
                return { language: version.language, requestedLanguage: preferred, questions };
            }
        }
        throw new Error("CONTENT_TRANSLATION_UNAVAILABLE");
    }
    function catalogNotice() {
        for (const id of ["subtitulo-materias", "subtitulo-fases", "subtitulo-criar-simulado"]) {
            const anchor = document.getElementById(id); if (!anchor) continue;
            let note = document.getElementById(id + "-language-note");
            if (!note) { note = document.createElement("p"); note.id = id + "-language-note"; note.className = "content-language-notice"; anchor.after(note); }
            note.textContent = i18n.t("common", "catalogOriginal");
        }
    }
    i18n.subscribe(catalogNotice);
    catalogNotice();
    window.SimunusContentLanguage = Object.freeze({ questionLanguage, notice, attempt });
})();
