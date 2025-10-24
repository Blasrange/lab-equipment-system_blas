import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from '@/hooks/use-translation';
import { Check, Languages } from 'lucide-react';

export function LanguageSelector() {
    const { language, setLanguage, t } = useTranslation();

    const languages = [
        {
            code: 'es' as const,
            name: t('language.spanish'),
            flag: (
                <span className="relative block h-full w-full">
                    <div className="absolute top-0 left-0 h-1/2 w-full bg-yellow-400"></div>
                    <div className="absolute top-1/2 left-0 h-1/4 w-full bg-blue-600"></div>
                    <div className="absolute bottom-0 left-0 h-1/4 w-full bg-red-600"></div>
                </span>
            ),
        },
        {
            code: 'en' as const,
            name: t('language.english'),
            flag: (
                <span className="relative block h-full w-full">
                    {/* Fondo azul marino */}
                    <div className="absolute inset-0 bg-blue-800"></div>

                    {/* Cruz del Union Jack */}
                    {/* Cruz de San Jorge (roja) */}
                    <div className="absolute top-1/2 left-0 h-[2px] w-full -translate-y-1/2 bg-red-600"></div>
                    <div className="absolute top-0 left-1/2 h-full w-[2px] -translate-x-1/2 bg-red-600"></div>

                    {/* Cruz de San Andrés (blanca - borde) */}
                    <div className="absolute top-1/2 left-0 h-[4px] w-full -translate-y-1/2 bg-white"></div>
                    <div className="absolute top-0 left-1/2 h-full w-[4px] -translate-x-1/2 bg-white"></div>

                    {/* Cruz de San Patricio (roja - más delgada) */}
                    <div className="absolute top-1/2 left-0 h-[1px] w-full -translate-y-1/2 bg-red-600"></div>
                    <div className="absolute top-0 left-1/2 h-full w-[1px] -translate-x-1/2 bg-red-600"></div>

                    {/* Estrellas de la Commonwealth */}
                    {/* Estrella grande de 7 puntas (izquierda) */}
                    <div className="absolute top-1/2 left-[15%] -translate-y-1/2 text-white">
                        <span className="text-[6px]">★</span>
                    </div>

                    {/* Cruz del Sur (derecha) */}
                    <div className="absolute top-1/3 right-[10%] text-white">
                        <span className="text-[4px]">★</span>
                    </div>
                    <div className="absolute top-1/4 right-[20%] text-white">
                        <span className="text-[3px]">★</span>
                    </div>
                    <div className="absolute top-2/3 right-[20%] text-white">
                        <span className="text-[3px]">★</span>
                    </div>
                    <div className="absolute top-1/2 right-[5%] text-white">
                        <span className="text-[3px]">★</span>
                    </div>
                </span>
            ),
        },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-0 shadow-sm transition-all hover:shadow-md"
                    title={t('language.switch')}
                >
                    <Languages className="h-4 w-4 text-blue-600 transition-colors hover:text-blue-700" />
                    <span className="sr-only">{t('language.switch')}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className="flex cursor-pointer items-center justify-between"
                    >
                        <div className="flex items-center gap-2">
                            <span className="h-4 w-6">
                                {lang.code === 'es' ? (
                                    <span className="relative block h-full w-full">
                                        <div className="absolute top-0 left-0 h-1/2 w-full bg-yellow-400"></div>
                                        <div className="absolute top-1/2 left-0 h-1/4 w-full bg-blue-600"></div>
                                        <div className="absolute bottom-0 left-0 h-1/4 w-full bg-red-600"></div>
                                    </span>
                                ) : (
                                    <span>{lang.flag}</span>
                                )}
                            </span>
                            <span className="text-sm">{lang.name}</span>
                        </div>
                        {language === lang.code && (
                            <Check className="h-4 w-4 text-primary" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
