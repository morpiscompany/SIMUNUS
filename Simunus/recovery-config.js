/* Public recovery destinations. Production never derives its email URL from the
 * requesting browser. Local mode requires an explicit, local-only opt-in.
 */
(() => {
    const productionRedirectTo = "https://morpiscompany.github.io/SIMUNUS/Simunus/recovery.html";
    const isLoopback = hostname => ["localhost", "127.0.0.1", "[::1]"].includes(hostname);

    function getRedirectTo() {
        const config = window.SIMUNUS_RECOVERY_CONFIG || {};
        const environment = config.environment || "production";
        if (environment === "production") return productionRedirectTo;
        if (environment !== "development" || !isLoopback(location.hostname)) {
            throw new Error("Invalid recovery environment configuration");
        }
        // No implicit localhost/port/path fallback, and never enable via URL parameters.
        const target = new URL(config.developmentRedirectTo);
        if (!isLoopback(target.hostname) || !["http:", "https:"].includes(target.protocol)
            || target.username || target.password || target.search || target.hash
            || !target.pathname.endsWith("/recovery.html")) {
            throw new Error("Invalid development recovery destination");
        }
        return target.href;
    }

    window.SimunusRecoveryConfig = Object.freeze({ getRedirectTo, productionRedirectTo });
})();
