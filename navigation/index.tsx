import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';
import {useEffect} from "react";

import LinkingConfiguration from './LinkingConfiguration';
import {useLocalisationGlobalContext, useUserDataContextActions} from "../contexts";
import {ChatListScreen} from '../screens/ChatsListScreen/ChatsListScreen';
import {ChatScreen} from "../screens/ChatScreen/ChatScreen";
import {Appbar, Menu} from 'react-native-paper';

export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {

    const {setUserData} = useUserDataContextActions();
    const {setLocale} = useLocalisationGlobalContext();

    useEffect(() => {
        setUserData({
            id: '1',
            name: 'Mayank Bajaj'
        })
    }, []);

    // @ts-ignore
    function CustomNavigationBar({navigation, previous}) {
        const [visible, setVisible] = React.useState(false);
        const openMenu = () => setVisible(true);
        const closeMenu = () => setVisible(false);

        return (
            <Appbar.Header>
                {previous ? <Appbar.BackAction onPress={navigation.goBack}/> : null}
                <Appbar.Content title="Qohoo Chat App"/>
                {!previous ? (
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                            <Appbar.Action icon="menu" color="white" onPress={openMenu}/>
                        }>
                        <Menu.Item onPress={() => setLocale('hd')} title="Change Language"/>
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
                    header: (props) => <CustomNavigationBar {...props} />,
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

