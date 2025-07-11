import { useState, useEffect } from 'react';
import { getCurrentLocale } from './index';

export function useLocale() {
    const [locale, setLocale] = useState(getCurrentLocale());
    useEffect(() => {
        const handler = (e: any) => setLocale(e.detail);
        window.addEventListener('localeChanged', handler);
        return () => window.removeEventListener('localeChanged', handler);
    }, []);
    return locale;
}
