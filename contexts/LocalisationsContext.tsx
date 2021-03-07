import React, {createContext, useContext, useMemo, useState} from 'react';
import i18n from "i18n-js";
import * as Localization from 'expo-localization'; // or whatever library you want

export const LocalizationContext = createContext<any>(undefined);

export const LocalisationContext = ({children}: any) => {
    const [locale, setLocale] = useState(Localization.locale);
    const localizationContext = useMemo(
        () => ({
            t: (scope: i18n.Scope, options: i18n.TranslateOptions | undefined) => i18n.t(scope, {locale, ...options}),
            locale,
            setLocale,
        }),
        [locale]
    );

    return (
        <LocalizationContext.Provider value={localizationContext}>
            {children}
        </LocalizationContext.Provider>
    );
};

export function useLocalisationGlobalContext() {
    const context = useContext(LocalizationContext);
    if (context === undefined) {
        throw new Error(
            'localContext error',
        );
    }
    return context;
}
