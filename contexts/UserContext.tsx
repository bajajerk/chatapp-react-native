import React, {createContext, ReactNode, useContext, useMemo, useState} from 'react';

import {User} from '../schema/user';

interface GlobalUserChatsProviderProps {
    children: ReactNode;
}

export interface UserSchema {
    user: User | undefined,
}

const initialState: UserSchema = {
    user: undefined,
};

interface UserActionsSchema {
    setUserData: (user: User) => void;
}

const UserContext = createContext<UserSchema>(initialState);
const UserActionsContext = createContext<UserActionsSchema | undefined>(undefined);

export const UserGlobalContext = ({children}: GlobalUserChatsProviderProps) => {
    const [user, setUser] = useState<User | undefined>(undefined);

    const setUserData = (userArg: User) => {
        setUser(userArg);
    }

    const actions = useMemo(
        () => ({
            setUserData,
        }),
        [setUserData],
    );

    const state = useMemo(() => {
        return {
            user,
        };
    }, [user]);

    return (
        <UserContext.Provider value={state}>
            <UserActionsContext.Provider value={actions}>
                {children}
            </UserActionsContext.Provider>
        </UserContext.Provider>
    );
};

export function useUserDataContext() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error(
            'useUserChatsContext must be used within a UserDataContext.Provider',
        );
    }
    return context;
}

export function useUserDataContextActions() {
    const context = useContext(UserActionsContext);
    if (context === undefined) {
        throw new Error(
            'useUserChatsContextActions must be used within a UserDataContext.Provider',
        );
    }
    return context;
}
