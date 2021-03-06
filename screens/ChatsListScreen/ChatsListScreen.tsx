import * as React from 'react';
import {StyleSheet, FlatList, TouchableHighlight, TouchableOpacity} from 'react-native';
import {Avatar, List} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {useUserChatsContext} from "../../contexts";
import { StackParams } from '../../stackparams';

type NavigationProps = StackNavigationProp<StackParams, 'ChatListScreen'>;


export const ChatListScreen = () => {
    const {navigate} = useNavigation<NavigationProps>();

    const {userChats} = useUserChatsContext();
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

