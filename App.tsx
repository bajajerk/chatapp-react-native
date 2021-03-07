import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import i18n from 'i18n-js';
import {Provider as PaperProvider} from 'react-native-paper';

import EN from './translation/en.json';
import HD from './translation/hd.json';

import {LocalisationContext, UserChatContext, UserGlobalContext} from './contexts';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {theme} from './utils/theme';

i18n.translations = {
    en: EN,
    hd: HD,
};
i18n.fallbacks = true;

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <UserGlobalContext>
                    <UserChatContext>
                        <LocalisationContext>
                            <PaperProvider theme={theme}>
                                <Navigation colorScheme={colorScheme}/>
                                <StatusBar/>
                            </PaperProvider>
                        </LocalisationContext>
                    </UserChatContext>
                </UserGlobalContext>
            </SafeAreaProvider>
        );
    }
}
