import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TextInput, Image, FlatList, Text, Button, TouchableOpacity} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import {Liquidity} from '../BasePage/Liquidity/Liquidity';
import {ChatMessage, User, UserChats} from "../../schema/user";
import {TextXLarge} from '../../components/Typography';
import {useUserChatsContextActions, useUserDataContext} from "../../contexts";
import { StackParams } from '../../stackparams';


type RouteProps = RouteProp<StackParams, 'ChatScreen'>;

export const ChatScreen = () => {
    const { params } = useRoute<RouteProps>();
    const { friendUserId } = params;
    console.log(friendUserId);

    const [newMessageText, setNewMessageText] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const {fetchChatConversation, addMessageToChat} = useUserChatsContextActions();
    const {user} = useUserDataContext();
    const userId = (user as User).id


    useEffect(() => {
        const c = fetchChatConversation(friendUserId);
        if (c) {
            setMessages(c.messages);
        }
    }, [])


    const sendMessage = () => {
        const newMessage = {
            receivedById: '2',
            sentById: userId,
            id: Math.random().toString(),
            text: newMessageText,
            timeStamp: Date.now().toString(),
            type: 'TEXT'
        }
        addMessageToChat('2', newMessage);
        messages.push(newMessage)
        setNewMessageText('')
    };

    return (
        <View style={styles.screenWrapper}>

            <View style={{flex: 1}}>
                <FlatList
                    data={messages}
                    renderItem={({item}) => {
                        return (
                            <View
                                key={item.id}
                                style={[
                                    styles.container,
                                    item.receivedById === userId ? styles.containerLeft : styles.containerRight,
                                ]}
                            >
                                {/*<TextMedium>{item.receivedById === userId }</TextMedium>*/}
                                <TextXLarge color={Liquidity.colors.main.black} key={item.id}>
                                    {item.text}
                                </TextXLarge>
                            </View>
                        );
                    }}
                />
            </View>

            <View style={styles.textInputContainer}>
                <View style={{flex: 1}}>
                    <TextInput
                        style={styles.input}
                        // autoCaptalize="none"
                        autoCorrect={true}
                        value={newMessageText}
                        onChangeText={(newValue) => setNewMessageText(newValue)}
                        multiline={true}
                        placeholder="Type your message..."
                    />
                </View>
                <TouchableOpacity style={styles.sendMessageIconContainer} onPress={sendMessage}>
                    <Image source={require('../../assets/icons/ic_messageSend.png')} style={{width: 24, height: 24}}/>
                </TouchableOpacity>
            </View>

        </View>
    );
};


const styles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        backgroundColor: Liquidity.colors.main.white,
    },
    container: {
        width: '75%',
        marginBottom: 15,
        padding: 20,
    },
    containerLeft: {
        alignSelf: 'flex-start',
        backgroundColor: Liquidity.colors.chatScreen.peach,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
    },
    containerRight: {
        alignSelf: 'flex-end',
        backgroundColor: Liquidity.colors.chatScreen.lightMustard,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
    },
    input: {
        margin: 10,
        borderColor: Liquidity.colors.main.black,
        fontSize: 20,
        maxHeight: 250,
    },
    textInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: Liquidity.colors.chatScreen.peach,
        borderRadius: 30,
        padding: 4,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    sendMessageIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
    },
});

