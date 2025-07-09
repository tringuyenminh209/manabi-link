// Import trực tiếp các file JSON (Vite hỗ trợ import JSON)
import vi from './locale/vi.json';
import en from './locale/en.json';
import ja from './locale/ja.json';
// Định nghĩa các ngôn ngữ được hỗ trợ
export const SUPPORTED_LOCALES = {
    vi: {
        name: 'Tiếng Việt',
        flag: '🇻🇳',
        code: 'vi'
    },
    en: {
        name: 'English',
        flag: '🇺🇸',
        code: 'en'
    },
    ja: {
        name: '日本語',
        flag: '🇯🇵',
        code: 'ja'
    }
} as const;

export type SupportedLocale = keyof typeof SUPPORTED_LOCALES;

// Lấy ngôn ngữ mặc định từ localStorage hoặc browser
export function getDefaultLocale(): SupportedLocale {
    const savedLocale = localStorage.getItem('locale') as SupportedLocale;
    if (savedLocale && SUPPORTED_LOCALES[savedLocale]) {
        return savedLocale;
    }

    const browserLocale = navigator.language.split('-')[0];
    if (browserLocale === 'ja') return 'ja';
    if (browserLocale === 'en') return 'en';

    return 'vi';
}

// Utility functions
export const setLocale = (locale: SupportedLocale) => {
    if (SUPPORTED_LOCALES[locale]) {
        localStorage.setItem('locale', locale);
        document.documentElement.lang = locale;
        // Trigger custom event để các component có thể cập nhật
        window.dispatchEvent(new CustomEvent('localeChanged', { detail: locale }));
    }
};

export const getCurrentLocale = (): SupportedLocale => {
    const saved = localStorage.getItem('locale') as SupportedLocale;
    return saved && SUPPORTED_LOCALES[saved] ? saved : getDefaultLocale();
};

// Translation function
export const t = (key: string, params?: Record<string, any>): string => {
    const locale = getCurrentLocale();
    const translations = getTranslations(locale);

    let translation = getNestedValue(translations, key) || key;

    // Replace parameters
    if (params) {
        Object.entries(params).forEach(([param, value]) => {
            translation = translation.replace(`{${param}}`, String(value));
        });
    }

    return translation;
};

// Helper function để lấy giá trị nested
function getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => {
        return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
}

function getTranslations(locale: SupportedLocale) {
    switch (locale) {
        case 'en':
            return en;
        case 'ja':
            return ja;
        default:
            return vi;
    }
}
