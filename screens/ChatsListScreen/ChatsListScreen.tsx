import * as React from 'react';
import {StyleSheet, FlatList, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import {useState} from 'react';
import {Avatar, Divider, List} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import i18n from 'i18n-js';

import {useLocalisationGlobalContext, useUserChatsContext} from "../../contexts";
import {StackParams} from '../../stackparams';
import {Liquidity} from "../../utils/Liquidity/Liquidity";

type NavigationProps = StackNavigationProp<StackParams, 'ChatListScreen'>;
const initialLayout = {width: Dimensions.get('window').width};

export const ChatListScreen = () => {
    const {navigate} = useNavigation<NavigationProps>();
    const {userChats} = useUserChatsContext();
    const {t} = useLocalisationGlobalContext();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {key: 'first', title: t('chats')},
        {key: 'second', title: t('status')},
    ]);

    const ChatsRoute = () => {
        return (
            <View style={styles.screenWrapper}>
                <FlatList
                    data={userChats}
                    renderItem={({item, index}) => (
                        <>
                            <TouchableOpacity onPress={() => navigate('ChatScreen', {friendUserId: item.id2})}>
                                <List.Item
                                    title={item.user2Name}
                                    description={item.messages.length ? item.messages[0].text : ''}
                                    left={props => <Avatar.Image size={36} source={{
                                        uri:
                                        item.user2ImageUrl
                                    }}/>}
                                />
                            </TouchableOpacity>
                            <Divider/>
                        </>
                    )}
                    keyExtractor={event => event.id}
                />
            </View>
        );
    }

    const StatusRoute = () => (
        <View>
            <Text>
                {i18n.t('status')}
            </Text>
        </View>
    );

    const renderTabNavigation = SceneMap({
        first: ChatsRoute,
        second: StatusRoute,
    });

    return (
        <TabView
            navigationState={{index, routes}}
            renderScene={renderTabNavigation}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={props => <TabBar {...props} style={{backgroundColor: Liquidity.colors.main.primary}}/>}
        />
    );
}

const styles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        backgroundColor: Liquidity.colors.background.light
    }
})

