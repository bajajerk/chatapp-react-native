import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TextInput, Image, FlatList, Text, Button, TouchableOpacity} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';

import {Liquidity} from '../../utils/Liquidity/Liquidity';
import {ChatMessage, User, UserChats} from "../../schema/user";
import {TextMedium, TextXLarge} from '../../components/Typography';
import {useLocalisationGlobalContext, useUserChatsContextActions, useUserDataContext} from "../../contexts";
import {StackParams} from '../../stackparams';
import moment from "moment";

type RouteProps = RouteProp<StackParams, 'ChatScreen'>;

export const ChatScreen = () => {
    const [newMessageText, setNewMessageText] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const {params} = useRoute<RouteProps>();
    const {friendUserId} = params;

    const {fetchChatConversation, addMessageToChat} = useUserChatsContextActions();
    const {t} = useLocalisationGlobalContext();
    const {user} = useUserDataContext();
    const userId = (user as User).id;


    useEffect(() => {
        const c = fetchChatConversation(friendUserId);
        if (c) {
            setMessages(c.messages);
        }
    }, [])


    const sendMessage = () => {
        const newMessage: ChatMessage = {
            receivedById: friendUserId,
            sentById: userId,
            id: Math.random().toString(),
            text: newMessageText,
            timeStamp: Date.now().toString(),
            type: 'TEXT'
        }
        addMessageToChat(friendUserId, newMessage);
        setMessages([newMessage, ...messages])
        setNewMessageText('')
    };

    return (
        <View style={styles.screenWrapper}>
            <View style={{flex: 1}}>
                <FlatList
                    data={messages}
                    inverted={true}
                    renderItem={({item}) => {
                        return (
                            <View
                                key={item.id}
                                style={[
                                    styles.container,
                                    item.receivedById === userId ? styles.containerLeft : styles.containerRight,
                                ]}
                            >
                                <TextXLarge key={item.id}>
                                    {item.text}
                                </TextXLarge>
                                <TextMedium>
                                    {moment(parseInt(item.timeStamp)).fromNow()}
                                </TextMedium>
                            </View>
                        );
                    }}
                />
            </View>

            <View style={styles.textInputContainer}>
                <View style={{flex: 1}}>
                    <TextInput
                        style={styles.textInput}
                        autoCorrect={true}
                        value={newMessageText}
                        onChangeText={(newValue) => setNewMessageText(newValue)}
                        multiline={true}
                        placeholder={t('typeMessage')}
                    />
                </View>
                <TouchableOpacity style={styles.sendMessageIconContainer} onPress={sendMessage}
                                  disabled={newMessageText === ''}>
                    <Image source={require('../../assets/icons/ic_messageSend.png')} style={{width: 24, height: 24}}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        backgroundColor: Liquidity.colors.chatScreen.background
    },
    container: {
        width: '75%',
        marginBottom: Liquidity.measurements.spacing4,
        padding: Liquidity.measurements.spacing5,
    },
    containerLeft: {
        alignSelf: 'flex-start',
        backgroundColor: Liquidity.colors.main.offPrimary,
        borderBottomRightRadius: Liquidity.measurements.spacing5,
        borderTopRightRadius: Liquidity.measurements.spacing5,
    },
    containerRight: {
        alignSelf: 'flex-end',
        backgroundColor: Liquidity.colors.chatScreen.lightMustard,
        borderBottomLeftRadius: Liquidity.measurements.spacing5,
        borderTopLeftRadius: Liquidity.measurements.spacing5,
    },
    textInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 30,
        padding: Liquidity.measurements.spacing1,
        marginHorizontal: Liquidity.measurements.spacing2Half,
        marginVertical: Liquidity.measurements.spacing2Half,
        backgroundColor: Liquidity.colors.chatScreen.textInput
    },
    textInput: {
        margin: Liquidity.measurements.spacing2,
        fontSize: Liquidity.measurements.spacing5,
        maxHeight: 250,
    },
    sendMessageIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: Liquidity.measurements.spacing3,
    },
});

