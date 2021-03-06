import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from "react-native-paper";
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import {LocalisationContext, UserChatContext, UserGlobalContext} from './contexts';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';


// TODO, add to json
i18n.translations = {
    en: {chats: 'Chats', status: 'Status'},
    hd: {chats: 'बातचीत', status: 'स्टेट्स'},
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
                            <Provider>
                                <Navigation colorScheme={colorScheme}/>
                                <StatusBar/>
                            </Provider>
                        </LocalisationContext>
                    </UserChatContext>
                </UserGlobalContext>
            </SafeAreaProvider>
        );
    }
}
