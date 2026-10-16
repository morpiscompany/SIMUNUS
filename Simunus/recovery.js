/* Recovery uses the existing Supabase client, isolated in memory by supabase.js.
 * Only Supabase verifies/refreshes credentials; no local token expiry calculation.
 */
(() => {
    const messages = {
        pt: {
            title: "Recuperar senha", description: "Informe seu e-mail para receber as instruções.",
            resetTitle: "Redefinir senha", resetDescription: "Escolha uma nova senha para sua conta.",
            email: "E-mail", send: "Enviar link", sending: "Enviando...", newPassword: "Nova senha", confirm: "Confirmar nova senha",
            wait: "Aguarde {time} para enviar outro link.", available: "Você já pode enviar outro link.", checkMail: "Conferir e-mail",
            chooseProvider: "Abra seu serviço de e-mail ou escolha uma opção:", mailHint: "Abra a mensagem mais recente. Confira também Spam ou Lixo eletrônico.",
            save: "Salvar nova senha", login: "Voltar para entrar", another: "Solicitar outro link",
            policy: "Use entre 8 e 128 caracteres. Requisitos adicionais de segurança serão verificados pelo servidor.",
            accepted: "Se existir uma conta vinculada a este e-mail, enviaremos as instruções para redefinir sua senha.",
            invalidEmail: "Digite um e-mail válido.", mismatch: "As senhas não coincidem.",
            weak: "A senha não atende à política de segurança. Use entre 8 e 128 caracteres e tente combinar maiúsculas, minúsculas, números e símbolos.",
            invalidLink: "Link inválido, expirado ou já utilizado. Solicite outro link.",
            busy: "Aguarde…", rate: "Muitas tentativas ou limite de envio atingido. Aguarde antes de tentar novamente.",
            network: "Não foi possível conectar ao serviço. Verifique sua conexão e tente novamente.",
            unavailable: "Serviço indisponível. Tente novamente mais tarde. Se persistir, contate o suporte.",
            same: "Escolha uma senha diferente da atual.", reauth: "É necessária uma nova confirmação de identidade. Solicite outro link ou contate o suporte.",
            success: "Senha alterada e encerramento das sessões solicitado com sucesso. Entre novamente.",
            cleanup: "Senha alterada. Não foi possível concluir o encerramento das sessões. Tente concluir novamente antes de sair desta página.",
            retryCleanup: "Concluir encerramento das sessões",
            partial: "Senha alterada e sessões revogadas no Supabase. Não foi possível sincronizar o controle de sessão única do SIMUNUS. Entre novamente; se houver problema, contate o suporte."
        },
        es: {
            title: "Recuperar contraseña", description: "Ingresa tu correo para recibir las instrucciones.",
            resetTitle: "Restablecer contraseña", resetDescription: "Elige una nueva contraseña para tu cuenta.",
            email: "Correo electrónico", send: "Enviar enlace", sending: "Enviando...", newPassword: "Nueva contraseña", confirm: "Confirmar nueva contraseña",
            wait: "Espera {time} para enviar otro enlace.", available: "Ya puedes enviar otro enlace.", checkMail: "Revisar correo",
            chooseProvider: "Abre tu servicio de correo o elige una opción:", mailHint: "Abre el mensaje más reciente. Revisa también Spam o Correo no deseado.",
            save: "Guardar nueva contraseña", login: "Volver a iniciar sesión", another: "Solicitar otro enlace",
            policy: "Usa entre 8 y 128 caracteres. El servidor verificará los requisitos adicionales de seguridad.",
            accepted: "Si existe una cuenta vinculada a este correo, enviaremos las instrucciones para restablecer tu contraseña.",
            invalidEmail: "Ingresa un correo válido.", mismatch: "Las contraseñas no coinciden.",
            weak: "La contraseña no cumple la política de seguridad. Usa entre 8 y 128 caracteres e intenta combinar mayúsculas, minúsculas, números y símbolos.",
            invalidLink: "Enlace inválido, caducado o ya utilizado. Solicita otro enlace.", busy: "Espera…",
            rate: "Demasiados intentos o límite de envío alcanzado. Espera antes de intentarlo de nuevo.",
            network: "No se pudo conectar al servicio. Verifica tu conexión e inténtalo de nuevo.",
            unavailable: "Servicio no disponible. Inténtalo más tarde. Si persiste, contacta al soporte.",
            same: "Elige una contraseña diferente de la actual.", reauth: "Se requiere otra verificación de identidad. Solicita otro enlace o contacta al soporte.",
            success: "Contraseña actualizada y cierre de sesiones solicitado correctamente. Inicia sesión de nuevo.",
            cleanup: "Contraseña actualizada. No se pudo completar el cierre de sesiones. Reintenta antes de salir de esta página.",
            retryCleanup: "Completar cierre de sesiones",
            partial: "Contraseña actualizada y sesiones revocadas en Supabase. No se pudo sincronizar el control de sesión única de SIMUNUS. Inicia sesión de nuevo; si hay problemas, contacta al soporte."
        },
        en: {
            title: "Recover password", description: "Enter your email to receive instructions.",
            resetTitle: "Reset password", resetDescription: "Choose a new password for your account.",
            email: "Email", send: "Send link", sending: "Sending...", newPassword: "New password", confirm: "Confirm new password",
            wait: "Wait {time} before sending another link.", available: "You can send another link now.", checkMail: "Check email",
            chooseProvider: "Open your email service or choose an option:", mailHint: "Open the most recent message. Also check Spam or Junk.",
            save: "Save new password", login: "Back to sign in", another: "Request another link",
            policy: "Use 8–128 characters. Additional security requirements will be checked by the server.",
            accepted: "If an account is associated with this email, we will send instructions to reset your password.",
            invalidEmail: "Enter a valid email.", mismatch: "Passwords do not match.",
            weak: "Password does not meet the security policy. Use 8–128 characters and try combining uppercase, lowercase, numbers and symbols.",
            invalidLink: "Invalid, expired or already used link. Request another link.", busy: "Please wait…",
            rate: "Too many attempts or email limit reached. Wait before trying again.",
            network: "Could not connect to the service. Check your connection and try again.",
            unavailable: "Service unavailable. Try again later. If this persists, contact support.",
            same: "Choose a password different from your current password.", reauth: "Identity verification is required. Request another link or contact support.",
            success: "Password updated and session sign-out requested successfully. Sign in again.",
            cleanup: "Password updated. Session sign-out could not be completed. Retry before leaving this page.",
            retryCleanup: "Complete session sign-out",
            partial: "Password updated and Supabase sessions revoked. SIMUNUS single-session control could not be synchronized. Sign in again; contact support if needed."
        }
    };
    const client = window.SimunusSupabase?.client;
    const $ = id => document.getElementById(id);
    const callback = window.SimunusRecoveryCallback || {};
    delete window.SimunusRecoveryCallback;
    let language = messages[callback.language] ? callback.language : (navigator.language || "pt").split("-")[0];
    if (!messages[language]) language = "en";
    let mode = "request", busy = false, validRecovery = false, passwordUpdated = false;
    let activeSessionRegistered = false, feedbackKey = "", feedbackKind = "";
    const text = key => messages[language][key];
    const cooldown = window.SimunusRecoveryCooldown;
    let mailAccepted = cooldown.read().lastAcceptedAt > 0, inboxHref = null;
    let announcedUntil = 0;
    function inboxFor(email) {
        const domain = email.slice(email.lastIndexOf("@") + 1).toLowerCase();
        if (["gmail.com", "googlemail.com"].includes(domain)) return "https://mail.google.com/mail/u/0/#inbox";
        if (/^(outlook|hotmail|live)\.(com|com\.br|es|co\.uk|fr|de|it|pt)$/.test(domain)) return "https://outlook.live.com/mail/0/inbox";
        if (/^yahoo\.(com|com\.br|es|co\.uk|fr|de|it|ca)$/.test(domain)) return "https://mail.yahoo.com/";
        if (["icloud.com", "me.com", "mac.com"].includes(domain)) return "https://www.icloud.com/mail";
        return null;
    }
    function updateCooldown() {
        const seconds = cooldown.remaining();
        const time = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
        const label = seconds ? text("wait").replace("{time}", time) : "";
        $("recovery-countdown").textContent = label;
        document.querySelector("#recovery-request button").disabled = busy || seconds > 0;
        const until = seconds ? cooldown.read().until : 0;
        if (until !== announcedUntil) {
            $("recovery-cooldown-status").textContent = seconds ? label : text("available");
            announcedUntil = until;
        }
    }
    function render() {
        document.querySelector(".recovery-logo").src = document.documentElement.dataset.tema === "escuro"
            ? "./assets/simunus-logo-dark.png" : "./assets/simunus-logo-light.png";
        document.documentElement.lang = language === "pt" ? "pt-BR" : language;
        $("recovery-language").value = language;
        $("recovery-title").textContent = text(mode === "password" ? "resetTitle" : "title");
        $("recovery-description").textContent = text(mode === "password" ? "resetDescription" : "description");
        document.querySelectorAll("[data-text]").forEach(el => el.textContent = text(el.dataset.text));
        $("recovery-request").hidden = mode !== "request";
        $("recovery-password").hidden = mode !== "password" || !validRecovery || passwordUpdated;
        $("recovery-another").hidden = mode !== "invalid";
        $("recovery-retry-cleanup").hidden = !passwordUpdated || !validRecovery;
        $("recovery-feedback").textContent = feedbackKey ? text(feedbackKey) : "";
        $("recovery-feedback").dataset.kind = feedbackKind;
        document.querySelectorAll("input, button, select").forEach(el => el.disabled = busy);
        document.querySelectorAll("form").forEach(el => el.setAttribute("aria-busy", String(busy)));
        $("recovery-mail-actions").hidden = !mailAccepted || mode !== "request";
        $("recovery-check-mail").hidden = !inboxHref;
        if (inboxHref) $("recovery-check-mail").href = inboxHref;
        $("recovery-mail-choice").hidden = Boolean(inboxHref);
        $("recovery-mail-choice").disabled = false;
        updateCooldown();
        if (busy) {
            const button = document.querySelector(mode === "request" ? "#recovery-request button" : "#recovery-password button");
            if (button) button.textContent = text(mode === "request" ? "sending" : "busy");
        }
    }
    function feedback(key, kind = "error") { feedbackKey = key; feedbackKind = kind; render(); }
    function errorKey(error) {
        const code = error?.code || "";
        if (error?.status === 429 || /rate_limit|over_email_send_rate_limit/.test(code)) return "rate";
        if (/same_password/.test(code)) return "same";
        if (/weak_password/.test(code)) return "weak";
        if (/reauthentication/.test(code)) return "reauth";
        if (error?.status === 401 || /session_not_found|session_expired|refresh_token|otp_expired|bad_jwt/.test(code)) return "invalidLink";
        if (error?.name === "AuthRetryableFetchError" || error instanceof TypeError || navigator.onLine === false) return "network";
        return "unavailable";
    }
    function invalidate() {
        validRecovery = false; mode = "invalid"; feedback("invalidLink");
    }
    $("recovery-language").addEventListener("change", event => { language = event.target.value; render(); });
    $("recovery-another").addEventListener("click", async () => {
        if (busy) return;
        busy = true; render();
        // Discard this isolated recovery session before requesting another link.
        try { if (validRecovery && client) await client.auth.signOut({ scope: "local" }); } catch (_) {}
        validRecovery = false; busy = false; mode = "request"; feedbackKey = ""; render();
        $("recovery-email").focus();
    });
    $("recovery-mail-choice").addEventListener("click", () => {
        $("recovery-mail-options").hidden = !$("recovery-mail-options").hidden;
    });
    async function requestLink() {
        if (busy || cooldown.remaining() > 0) return;
        const email = $("recovery-email").value.trim();
        $("recovery-email").value = email;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
            feedback("invalidEmail"); $("recovery-email").focus(); return;
        }
        if (!client) { feedback("unavailable"); return; }
        busy = true; feedbackKey = ""; render();
        try {
            // Default is the exact production URL, even when requesting from localhost.
            // Missing/invalid configuration fails before sending any email request.
            const redirectTo = window.SimunusRecoveryConfig.getRedirectTo();
            const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo });
            if (error) throw error;
            cooldown.accepted();
            mailAccepted = true; inboxHref = inboxFor(email);
            $("recovery-mail-options").hidden = true;
            feedback("accepted", "success");
        } catch (error) {
            if (errorKey(error) === "rate") cooldown.limited(window.SimunusSupabase.getRecoveryRetryAfter?.());
            feedback(errorKey(error));
        }
        finally { busy = false; render(); }
    }
    $("recovery-request").addEventListener("submit", async event => {
        event.preventDefault();
        // Serializes overlapping requests from same-origin tabs where Web Locks is available.
        if (navigator.locks?.request) {
            await navigator.locks.request("simunus-recovery-send", { ifAvailable: true }, lock => lock ? requestLink() : undefined);
        } else { await requestLink(); }
    });
    cooldown.subscribe(updateCooldown);
    setInterval(updateCooldown, 1000);
    window.addEventListener("focus", updateCooldown);
    document.addEventListener("visibilitychange", updateCooldown);
    async function finishRecovery() {
        // Register only AFTER updateUser succeeds: opening an email must not replace the user's session.
        // The existing RPC rejects older sessions superseded by a newer login. Global sign-out
        // must still run in that case; a custom-session failure is reported honestly.
        let registrationError = null;
        if (!activeSessionRegistered) {
            try {
                const { error } = await client.rpc("register_active_session");
                if (error) throw error;
                activeSessionRegistered = true;
            } catch (error) { registrationError = error; }
        }
        const { error } = await client.auth.signOut({ scope: "global" });
        if (error) throw error;
        validRecovery = false;
        if (registrationError) {
            // Global revocation succeeded, but the custom RPC did not. No session remains to retry it.
            mode = "cleanup-incomplete"; feedback("partial");
            return;
        }
        mode = "success"; feedback("success", "success");
        $("recovery-login").focus();
    }
    $("recovery-password").addEventListener("submit", async event => {
        event.preventDefault();
        if (busy || passwordUpdated) return;
        if (!validRecovery || !client) { invalidate(); return; }
        const password = $("recovery-new").value;
        if (password.length < 8 || password.length > 128) { feedback("weak"); return; }
        if (password !== $("recovery-confirm").value) { feedback("mismatch"); return; }
        busy = true; render();
        try {
            const { data, error } = await client.auth.getUser();
            if (error) throw error;
            if (!data?.user) { invalidate(); return; }
            const result = await client.auth.updateUser({ password });
            if (result.error) throw result.error;
            passwordUpdated = true;
            $("recovery-password").reset();
            await finishRecovery();
        } catch (error) {
            if (passwordUpdated) feedback("cleanup");
            else if (errorKey(error) === "invalidLink") invalidate();
            else feedback(errorKey(error));
        } finally { busy = false; render(); }
    });
    $("recovery-retry-cleanup").addEventListener("click", async () => {
        if (busy || !passwordUpdated || !validRecovery) return;
        busy = true; render();
        try { await finishRecovery(); } catch (_) { feedback("cleanup"); }
        finally { busy = false; render(); }
    });
    async function initialize() {
        if (!callback.present) { render(); return; }
        mode = "invalid"; busy = true; render();
        try {
            if (!client || callback.error || callback.type !== "recovery" || !callback.access_token || !callback.refresh_token) {
                invalidate(); return;
            }
            // The email endpoint already consumed the one-use token. Establish the resulting
            // implicit session through the SDK, then verify it against Auth before showing inputs.
            const { error } = await client.auth.setSession({ access_token: callback.access_token, refresh_token: callback.refresh_token });
            if (error) throw error;
            const result = await client.auth.getUser();
            if (result.error) throw result.error;
            if (!result.data?.user) { invalidate(); return; }
            validRecovery = true; mode = "password"; feedbackKey = "";
        } catch (error) {
            invalidate();
            if (["network", "unavailable"].includes(errorKey(error))) feedback(errorKey(error));
        } finally {
            callback.access_token = null; callback.refresh_token = null;
            busy = false; render();
            if (validRecovery) $("recovery-new").focus();
        }
    }
    initialize();
})();
