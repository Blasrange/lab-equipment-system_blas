import { useTranslation as useTranslationContext } from '@/contexts/translation-context';

export function useTranslation() {
    return useTranslationContext();
}

// Hook para facilitar el uso en componentes
export function useT() {
    const { t } = useTranslationContext();
    return t;
}
