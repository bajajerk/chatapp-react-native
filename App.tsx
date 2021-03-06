import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from "react-native-paper";

import {UserChatContext, UserGlobalContext} from './contexts';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

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
                        <Provider>
                            <Navigation colorScheme={colorScheme}/>
                            <StatusBar/>
                        </Provider>
                    </UserChatContext>
                </UserGlobalContext>
            </SafeAreaProvider>
        );
    }
}
