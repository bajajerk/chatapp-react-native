import React, {useState, useContext, ReactNode, createContext, useMemo} from 'react';
import {ChatMessage, UserChats} from '../schema/user';

const db = [
    {
        id: '213',
        id1: '1',
        id2: '2',
        user2Name: 'Vimal',
        user2ImageUrl: 'https://media-exp1.licdn.com/dms/image/C5103AQE6sGkiC6oWxw/profile-displayphoto-shrink_400_400/0/1574969682197?e=1620259200&v=beta&t=19nw6CLMFbbk6n2HN6z8zEkKE_aW73cJB7t2DXHUmf8',
        messages: [
            {
                id: '33',
                text: 'vimal=> aseem',
                type: 'TEXT',
                timeStamp: '1615063710108',
                sentById: '2',
                receivedById: '1'
            },
            // {
            //     id: '3233',
            //     text: 'Hi Vimal, how are you',
            //     type: 'TEXT',
            //     timeStamp: '1615063710108',
            //     sentById: '1',
            //     receivedById: '2'
            // },
        ]
    },

    {
        id: '121',
        id1: '1',
        id2: '3',
        user2Name: 'Mayank',
        user2ImageUrl: 'https://instagram.famd8-1.fna.fbcdn.net/v/t51.2885-19/s320x320/147468840_3853384498054038_1185376672293681406_n.jpg?tp=1&_nc_ht=instagram.famd8-1.fna.fbcdn.net&_nc_ohc=TdslWTeZgaAAX8SMAJh&oh=591b9aa55e7c2bcbe92474846bf35519&oe=606E1834',
        messages: [
            // {
            //     id: '3312',
            //     text: 'Hi Mayank, Aseem this side. Whats the status of assignment ',
            //     type: 'TEXT',
            //     timeStamp: '1615063710108',
            //     sentById: '1',
            //     receivedById: '3'
            // },
            {
                id: '321233',
                text: 'mayank=> aassen',
                type: 'TEXT',
                timeStamp: '1615063710108',
                sentById: '3',
                receivedById: '1'
            },
        ]
    }
];

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
    addMessageToChat: (id2: string, message: ChatMessage) => void;
    fetchChatConversation: (id2: string) => UserChats | undefined;
}

const UserChatsContext = createContext<UserChatsSchema>(initialState);
const ContentContextActions = createContext<UserChatActionsSchema | undefined>(undefined);

export const UserChatContext = ({children}: GlobalUserChatsProviderProps) => {
    const [chats, setChats] = useState<UserChats[]>(db);


    const initialiseUserChats = (userChats: UserChats[]) => {
        setChats(userChats);
    }

    const addMessageToChat = (id2: string, message: ChatMessage) => {
        let userChatsCopy: UserChats[] = [];
        chats.map(c => {
            if (c.id2 === id2) {
                userChatsCopy.push({...c, messages: [message, ...c.messages]})
            } else {
                userChatsCopy.push(c);
            }
        });
        setChats(userChatsCopy);
    }

    const fetchChatConversation = (id2: string) => {
        // console.log(chats)
        return (chats.find((c) => c.id2 === id2));
    }

    const actions = useMemo(
        () => ({
            initialiseUserChats,
            addMessageToChat,
            fetchChatConversation
        }),
        [
            initialiseUserChats,
            addMessageToChat,
            fetchChatConversation
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
