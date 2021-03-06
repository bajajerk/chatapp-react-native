import React from 'react';
import {Platform, SafeAreaView, StatusBar, View} from 'react-native';
import {styles} from './BasePage.styles';
import {helperStyle} from '../../helper/HelperStyle/HelperStyle.styles';

// @ts-ignore
export const BasePage: React.FC = ({children}) => {
    return (
        <View style={styles.mobileBody}>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView style={helperStyle.androidSafeArea}>
                <View>{children}</View>
            </SafeAreaView>
        </View>
    );
};
