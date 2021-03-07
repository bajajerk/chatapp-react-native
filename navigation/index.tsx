import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';
import {useEffect, useState} from "react";
import {Appbar, Menu} from "react-native-paper";

import LinkingConfiguration from './LinkingConfiguration';
import {useLocalisationGlobalContext, useUserDataContextActions} from "../contexts";
import {ChatListScreen} from '../screens/ChatsListScreen/ChatsListScreen';
import {ChatScreen} from "../screens/ChatScreen/ChatScreen";
import {Language} from "../constants/Language";

export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    const {setUserData} = useUserDataContextActions();
    const {setLocale, locale, t} = useLocalisationGlobalContext();

    useEffect(() => {
        setUserData({
            id: '1',
            name: 'Mayank Bajaj'
        })
    }, []);

    // @ts-ignore
    const NavigationBar = ({navigation, previous}) => {
        const [visible, setVisible] = useState(false);
        const openMenu = () => setVisible(true);
        const closeMenu = () => setVisible(false);


        const switchLanguage = () => {
            if (locale === Language.EN) {
                setLocale('hd');
            } else {
                setLocale('en');
            }
            closeMenu();
        }

        return (
            <Appbar.Header>
                {previous ? <Appbar.BackAction onPress={navigation.goBack}/> : null}
                <Appbar.Content title={t('chatApp')}/>
                {!previous ? (
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                            <Appbar.Action icon="menu" color="white" onPress={openMenu}/>
                        }>
                        <Menu.Item onPress={switchLanguage} title={t('changeLanguage')}/>
                    </Menu>
                ) : null}
            </Appbar.Header>
        );
    }

    const Stack = createStackNavigator();

    function RootNavigator() {
        return (
            <Stack.Navigator
                screenOptions={{
                    header: (props) => <NavigationBar {...props} />,
                }}>
                <Stack.Screen name={"ChatListScreen"} component={ChatListScreen} options={{headerTitle: 'Chats'}}/>
                <Stack.Screen name={"ChatScreen"} component={ChatScreen} options={{headerTitle: 'Chats'}}/>
            </Stack.Navigator>
        );
    }

    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator/>
        </NavigationContainer>
    );
}

