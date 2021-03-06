import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
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
                        <Navigation colorScheme={colorScheme}/>
                        <StatusBar/>
                    </UserChatContext>
                </UserGlobalContext>
            </SafeAreaProvider>
        );
    }
}
