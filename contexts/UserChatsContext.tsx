import React, {useState, useContext, ReactNode, createContext, useMemo} from 'react';
import {ChatMessage, UserChats} from '../schema/user';

interface GlobalUserChatsProviderProps {
    children: ReactNode;
}

export interface UserChatsSchema {
    userChats: UserChats[];
}

const initialState: UserChatsSchema = {
    userChats: []
};

interface UserChatActionsSchema {
    initialiseUserChats: (userChats: UserChats[]) => void;
    addMessageToChat: (id2: string, message: ChatMessage);
}

const UserChatsContext = createContext<UserChatsSchema>(initialState);
const ContentContextActions = createContext<UserChatActionsSchema | undefined>(undefined);

export const UserChatContext = ({children}: GlobalUserChatsProviderProps) => {
    const [chats, setChats] = useState<UserChats[]>([]);


    const initialiseUserChats = (userChats: UserChats[]) => {
        setChats(userChats);
    }

    const addMessageToChat = (id2: string, message: ChatMessage) => {
        let userChatsCopy: UserChats[] = [];
        chats.map(c => {
            if (c.id2 === id2) {
                userChatsCopy.push({...c, messages: [...c.messages, message]})
            } else {
                userChatsCopy.push(c);
            }
        });
        setChats(userChatsCopy);
    }


    const actions = useMemo(
        () => ({
            initialiseUserChats,
            addMessageToChat,


        }),
        [
            initialiseUserChats,
            addMessageToChat,

            ],
    );

    const state = useMemo(() => {
        return {
            userChats: chats,
        };
    }, [chats]);

    return (
        <UserChatsContext.Provider value={state}>
            <ContentContextActions.Provider value={actions}>
                {children}
            </ContentContextActions.Provider>
        </UserChatsContext.Provider>
    );
};

export function useUserChatsContext() {
    const context = useContext(UserChatsContext);
    if (context === undefined) {
        throw new Error(
            'useUserChatsContext must be used within a UserDataContext.Provider',
        );
    }
    return context;
}

export function useUserChatsContextActions() {
    const context = useContext(ContentContextActions);
    if (context === undefined) {
        throw new Error(
            'useUserChatsContextActions must be used within a UserDataContext.Provider',
        );
    }
    return context;
}
