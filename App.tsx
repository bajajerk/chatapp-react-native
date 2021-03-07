import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from "react-native-paper";
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#075E54',
        accent: 'yellow',
    },
};
import {LocalisationContext, UserChatContext, UserGlobalContext} from './contexts';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';


// TODO, add to json
i18n.translations = {
    en: {chats: 'Chats', status: 'Status', changeLanguage: 'Change Language', chatApp: 'Chat App', typeMessage: 'Type message'},
    hd: {chats: 'बातचीत', status: 'स्टेट्स', changeLanguage: 'भाषा बदलें', chatApp: 'चैट ऐप', typeMessage: 'संदेश टाइप करें'}
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
