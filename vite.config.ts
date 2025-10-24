import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

// Check if we're in a static build environment (like Vercel)
const isStaticBuild =
    process.env.VERCEL ||
    (process.env.NODE_ENV === 'production' && !process.env.PHP_AVAILABLE);

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        // Only use wayfinder when PHP is available
        ...(isStaticBuild
            ? []
            : [
                  wayfinder({
                      formVariants: true,
                  }),
              ]),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    build: {
        rollupOptions: {
            output: {
                // Optimize chunk splitting
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    inertia: ['@inertiajs/react'],
                    ui: [
                        '@radix-ui/react-dialog',
                        '@radix-ui/react-dropdown-menu',
                        '@radix-ui/react-tooltip',
                    ],
                },
            },
        },
        // Optimize CSS inlining for critical CSS
        cssCodeSplit: true,
        // Reduce preload warnings
        modulePreload: {
            polyfill: false,
            resolveDependencies: (filename, deps) => {
                // Only preload critical dependencies
                return deps.filter((dep) => {
                    // Preload only CSS and main JS chunks
                    return (
                        dep.includes('.css') ||
                        dep.includes('app-') ||
                        dep.includes('vendor-')
                    );
                });
            },
        },
    },
});
