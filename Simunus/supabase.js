/* ============================================================
   SUPABASE CLIENT — configuração pública do navegador
   ============================================================ */
(function () {
    const fallbackConfig = {
        url: "https://bpcuhebnkpfyeinkulyg.supabase.co",
        anonKey: "sb_publishable_6cgHkINNF7_UtTvp7SjzIA_UKo5ZcZX"
    };

    const runtimeConfig = window.SIMUNUS_SUPABASE_CONFIG || {};
    const config = {
        url: runtimeConfig.url || fallbackConfig.url,
        anonKey: runtimeConfig.anonKey || fallbackConfig.anonKey
    };

    function isConfigured() {
        return Boolean(
            window.supabase?.createClient &&
            config.url &&
            config.anonKey &&
            !config.url.includes("YOUR-PROJECT") &&
            !config.anonKey.includes("YOUR-SUPABASE-ANON-KEY")
        );
    }

    const recoveryPage = location.pathname.endsWith("/recovery.html");
    let recoveryRetryAfter = null;
    const client = isConfigured() && !window.SIMUNUS_RECOVERY_REDIRECT
        ? window.supabase.createClient(config.url, config.anonKey, {
            ...(recoveryPage ? { global: { fetch: async (input, init) => {
                const response = await fetch(input, init);
                if (new URL(typeof input === "string" ? input : input.url).pathname === "/auth/v1/recover") {
                    recoveryRetryAfter = response.headers.get("Retry-After");
                }
                return response;
            } } } : {}),
            auth: {
                persistSession: !recoveryPage,
                autoRefreshToken: true,
                detectSessionInUrl: !recoveryPage,
                flowType: "implicit",
                ...(recoveryPage ? { storageKey: "simunus-recovery-memory" } : {})
            }
        })
        : null;

    if (!client) {
        console.warn("[Supabase] Configure window.SIMUNUS_SUPABASE_CONFIG com url e anonKey públicos.");
    }

    window.SimunusSupabase = Object.freeze({
        client,
        isConfigured,
        getRecoveryRetryAfter: () => recoveryRetryAfter,
        getConfig: () => ({ url: config.url, anonKeyConfigured: Boolean(config.anonKey) })
    });
})();
