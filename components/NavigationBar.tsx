import {useState} from "react";
import {Appbar, Menu} from "react-native-paper";
import * as React from "react";

import {useLocalisationGlobalContext} from "../contexts";
import {Language} from "../constants/Language";

// @ts-ignore
export const NavigationBar = ({navigation, previous}) => {
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const {setLocale, locale, t} = useLocalisationGlobalContext();

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
