import * as React from 'react';
import {StyleSheet, FlatList, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import {Avatar, List} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TabView, SceneMap} from 'react-native-tab-view';
import i18n from 'i18n-js';

import {useLocalisationGlobalContext, useUserChatsContext} from "../../contexts";
import {StackParams} from '../../stackparams';
import {useState} from 'react';

type NavigationProps = StackNavigationProp<StackParams, 'ChatListScreen'>;


const initialLayout = {width: Dimensions.get('window').width};

export const ChatListScreen = () => {
    const {navigate} = useNavigation<NavigationProps>();
    const {userChats} = useUserChatsContext();
    const { t, locale, setLocale } = useLocalisationGlobalContext();


    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {key: 'first', title: t('chats')},
        {key: 'second', title: t('status')},
    ]);

    console.log(locale)

    const ChatsRoute = () => {
        return (
            <>
                <FlatList
                    data={userChats}
                    renderItem={({item, index}) => (
                        <TouchableOpacity onPress={() => navigate('ChatScreen', {friendUserId: item.id2})}>
                            <List.Item
                                title={item.user2Name}
                                description={item.messages.length ? item.messages[item.messages.length - 1].text : ''}
                                left={props => <Avatar.Image size={36} source={{
                                    uri:
                                    item.user2ImageUrl
                                }}/>}
                            />
                        </TouchableOpacity>
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
        />
    );
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});

