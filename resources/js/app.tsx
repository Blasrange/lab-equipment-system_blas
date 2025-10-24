import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { TranslationProvider } from './contexts/translation-context';
import { initializeTheme } from './hooks/use-appearance';
import { useLanguage } from './hooks/use-language';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

function AppWrapper({ App, props }: { App: any; props: any }) {
    const { language, setLanguage, toggleLanguage } = useLanguage();

    // Hide loading indicator once React app is ready
    useEffect(() => {
        const loadingEl = document.getElementById('app-loading');
        if (loadingEl) {
            loadingEl.style.opacity = '0';
            loadingEl.style.transition = 'opacity 0.3s ease';
            setTimeout(() => loadingEl.remove(), 300);
        }
    }, []);

    return (
        <TranslationProvider
            language={language}
            setLanguage={setLanguage}
            toggleLanguage={toggleLanguage}
        >
            <App {...props} />
        </TranslationProvider>
    );
}

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<AppWrapper App={App} props={props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
