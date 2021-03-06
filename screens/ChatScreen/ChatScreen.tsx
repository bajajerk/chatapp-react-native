import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TextInput, Image, FlatList, Text, Button, TouchableOpacity} from 'react-native';
import {Liquidity} from '../BasePage/Liquidity/Liquidity';
import {ChatMessage, UserChats} from "../../schema/user";
import {TextMedium, TextXLarge} from '../../components/Typography';
import {useUserChatsContext, useUserChatsContextActions} from "../../contexts";

export const ChatScreen = () => {
    const [newMessageText, setNewMessageText] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const {userChats} = useUserChatsContext();
    const {fetchChatConversation} = useUserChatsContextActions();

    const userId = '1';

    useEffect(() => {
        const c= fetchChatConversation('2');
        if(c){
            setMessages(c.messages);
        }
        // setMessages(c);
    }, [])


    const sendMessage = async () => {
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

