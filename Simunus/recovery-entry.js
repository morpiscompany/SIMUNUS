/* Run before Auth initialization, including when Supabase falls back to Site URL. */
(() => {
    const hash = new URLSearchParams(location.hash.slice(1));
    const query = new URLSearchParams(location.search);
    window.SIMUNUS_RECOVERY_REDIRECT = hash.get("type") === "recovery"
        || (!hash.has("type") && (hash.has("access_token") || hash.has("refresh_token")))
        || hash.has("error") || query.has("error") || query.has("code") || query.has("token_hash");
    if (window.SIMUNUS_RECOVERY_REDIRECT) {
        const target = new URL("./recovery.html", location.href);
        target.search = location.search;
        target.hash = location.hash;
        location.replace(target.href);
    }
})();
