export interface User {
    name: string,
    id: string
}

export interface UserChats {
    id1: string,
    id2: string,
    messages: ChatMessage[]
}

export interface ChatMessage {
    text: string,
    type: string,
    timeStamp: string,
    sentById: string,
    receivedById: string
}
