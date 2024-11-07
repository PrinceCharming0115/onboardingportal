import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
    url: 'https://onboarding.obp.ishareworks.nl:8443/',
    realm: 'myrealm',
    clientId: 'myclient',
});

// Add initialization function to ensure single init
let initialized = false;

export const initializeKeycloak = async () => {
    if (initialized) {
        return keycloak.authenticated;
    }

    try {
        const auth = await keycloak.init({
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
            checkLoginIframe: false,
            enableLogging: true  // Enable Keycloak debug logging
        });
        initialized = true;
        console.log('Keycloak initialized:', auth);
        return auth;
    } catch (error) {
        console.error('Keycloak init error:', error);
        return false;
    }
};