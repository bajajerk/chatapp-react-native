export interface User {
    name: string,
    id: string
}

// id1 will always by current user id
export interface UserChats {
    id1: string,
    id2: string,
    messages: ChatMessage[]
}

export interface ChatMessage {
    id: string,
    text: string,
    type: string,
    timeStamp: string,
    sentById: string,
    receivedById: string
}
