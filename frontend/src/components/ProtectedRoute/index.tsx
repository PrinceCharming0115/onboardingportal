import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { checkAuth } from 'util/checkAuth';
import { keycloak, initializeKeycloak } from 'config/keycloak';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const validateAuth = async () => {
            try {
                console.log('Current path:', router.asPath);
                console.log('Query params:', router.query);

                // Skip auth check if we're in the callback process
                if (router.query.code || router.query.session_state) {
                    console.log('In callback process, waiting...');
                    setIsLoading(false);
                    return;
                }

                const authenticated = await initializeKeycloak();
                // const authenticated = keycloak.authenticated;
                console.log('Auth status:', authenticated);
                setIsAuthenticated(authenticated);

                if (!authenticated) {
                    console.log('Not authenticated, starting login process');
                    const currentPath = router.asPath;
                    sessionStorage.setItem('redirectPath', currentPath);
                    
                    // Use the full URL for redirect
                    const redirectUri = `${window.location.origin}${currentPath}`;
                    console.log('Redirect URI:', redirectUri);
                    
                    await keycloak.login({
                        redirectUri,
                    });
                } else {
                    console.log('User is authenticated');
                    const redirectPath = sessionStorage.getItem('redirectPath');
                    if (redirectPath) {
                        console.log('Redirecting to stored path:', redirectPath);
                        sessionStorage.removeItem('redirectPath');
                        router.push(redirectPath);
                    }
                }
            } catch (error) {
                console.error('Auth validation error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        validateAuth();
    }, [router.asPath]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;