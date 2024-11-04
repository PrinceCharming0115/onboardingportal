export const checkAuth = async (keycloak: any) => {
    try {
        if (keycloak.authenticated) {
            return true;
        }

        const authenticated = await keycloak.init({
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
            checkLoginIframe: false // Add this to prevent iframe issues
        });
        return authenticated;
    } catch (error) {
        console.error('Keycloak init error:', error);
        return false;
    }
};