'use client';

import { useRouter } from 'next/router';

const useLanguageSwitcher = () => {
    const router = useRouter();
    const { pathname, asPath, query } = router;

    const switchLanguage = (locale: string) => {
        router.push({ pathname, query }, asPath, { locale });
    };

    return switchLanguage;
};

export default useLanguageSwitcher;