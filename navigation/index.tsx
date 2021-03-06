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
import { Appbar, Menu } from 'react-native-paper';

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

const Stack = createStackNavigator();

// @ts-ignore
function CustomNavigationBar({ navigation, previous }) {
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <Appbar.Header>
            {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title="Qohoo Chat App" />
            {!previous ? (
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <Appbar.Action icon="menu" color="white" onPress={openMenu} />
                    }>
                    <Menu.Item onPress={() => {console.log('Option 1 was pressed')}} title="Change Language" />
                    <Menu.Item onPress={() => {console.log('Option 2 was pressed')}} title="Option 2" />
                    <Menu.Item onPress={() => {console.log('Option 3 was pressed')}} title="Option 3" disabled />
                </Menu>
            ) : null}
        </Appbar.Header>
    );
}

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


