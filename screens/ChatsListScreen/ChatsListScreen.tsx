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
import {Liquidity} from "../BasePage/Liquidity/Liquidity";

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
            <>
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
            </>
        );
    }

    const StatusRoute = () => (
        <View>
            <Text>
                {i18n.t('status')}
            </Text>
        </View>
    );


    const renderScene = SceneMap({
        first: ChatsRoute,
        second: StatusRoute,
    });

    return (
        <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={props => <TabBar {...props} style={{backgroundColor: Liquidity.colors.main.primary}}/>}
        />
    );
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});

