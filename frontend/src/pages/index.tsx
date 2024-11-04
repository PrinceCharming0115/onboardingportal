import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { keycloak, initializeKeycloak } from 'config/keycloak'

const Home: NextPage = () => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        // Initialize keycloak when component mounts
        initializeKeycloak().then(authenticated => {
            setAuthenticated(authenticated);
        });
    }, []);

    const login = () => {
        if (keycloak) {
            keycloak.login();
        }
    };

    const logout = () => {
        if (keycloak) {
            keycloak.logout();
        }
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div>
                    {authenticated ? (
                        <>
                            <p>You are logged in!</p>
                            <button onClick={logout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <p>Please log in to continue</p>
                            <button onClick={login}>Login</button>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Home
