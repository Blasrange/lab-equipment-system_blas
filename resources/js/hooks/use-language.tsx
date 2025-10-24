import { useCallback, useState } from 'react';

export type Language = 'es' | 'en';

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') {
        return null;
    }

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null;
    }

    return null;
};

const getDefaultLanguage = (): Language => {
    // Primero intentamos obtener de localStorage
    if (typeof localStorage !== 'undefined') {
        const savedLanguage = localStorage.getItem('language') as Language;
        if (
            savedLanguage &&
            (savedLanguage === 'es' || savedLanguage === 'en')
        ) {
            return savedLanguage;
        }
    }

    // Luego intentamos obtener de cookie
    const savedLanguage = getCookie('language') as Language;
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
        return savedLanguage;
    }

    // Si no hay cookie, intentamos detectar el idioma del navegador
    if (typeof navigator !== 'undefined') {
        const browserLanguage = navigator.language.toLowerCase();
        if (browserLanguage.startsWith('es')) {
            return 'es';
        }
    }

    // Por defecto español
    return 'es';
};

export function useLanguage() {
    const [language, setLanguageState] = useState<Language>(() =>
        getDefaultLanguage(),
    );

    const setLanguage = useCallback((newLanguage: Language) => {
        setLanguageState(newLanguage);
        setCookie('language', newLanguage);

        // También guardamos en localStorage como respaldo
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('language', newLanguage);
        }
    }, []);

    const toggleLanguage = useCallback(() => {
        setLanguage(language === 'es' ? 'en' : 'es');
    }, [language, setLanguage]);

    return {
        language,
        setLanguage,
        toggleLanguage,
    };
}
