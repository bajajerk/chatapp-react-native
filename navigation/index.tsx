import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';
import {useEffect} from "react";


import NotFoundScreen from '../screens/NotFoundScreen';
import {RootStackParamList} from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import {useUserDataContextActions} from "../contexts";
import {ChatListScreen} from '../screens/ChatsListScreen/ChatsListScreen';
import {ChatScreen} from "../screens/ChatScreen/ChatScreen";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {

    const {setUserData} = useUserDataContextActions();
    useEffect(() => {
        setUserData({
            id: '1',
            name: 'Mayank Bajaj'
        })
    }, []);


    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator/>
        </NavigationContainer>
    );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={"ChatListScreen"} component={ChatListScreen} options={{headerTitle: 'Chats'}}/>
            <Stack.Screen name={"ChatScreen"} component={ChatScreen} options={{headerTitle: 'Chats'}}/>
        </Stack.Navigator>
    );
}
