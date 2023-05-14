type MethodTypes = "POST" | "GET" | "DELETE" | "PUT";

export type MessagesInitialStateTypes = {
    messages: MessageTypes[];
    chats: ChatTypes[];
}

type AuthenticationStateTypes = {
    isAuthenticated: boolean;
    id: null | number;
    apiToken: null | string;
    wid:string;
}
type MessageTypes = {
    idMessage: string;
    textMessage: string;
    senderName:string;
    senderId: string;
    statusMessage: MessageStatusTypes;
    typeMessage: TypeMessageTypes;
    mimeType?:string;
    type: "incoming" | "outgoing";
    timestamp:number;
    downloadUrl?:string;
    caption?:string;
}

type ChatTypes = {
    id: string;
    recipientNumber: number;
    messages: MessageTypes[];
    recipientName: string;
    lastTimeSeen:string;
    lastAction: {
        text: string;
        timestamp: number;
    }
}

// type TypeWebkookTypes = "outgoingMessageStatus" | "incomingMessageReceived" | "outgoingMessageReceived" | "outgoingAPIMessageReceived" | "stateInstanceChanged" | "statusInstanceChanged" | "incomingCall";

export type TypeMessageTypes = "textMessage" | "videoMessage" | "audioMessage" | "imageMessage" | "extendedTextMessage";

export type MessageStatusTypes = "sent" | "read" | "delivered" | "failed" | "notInGroup";

interface OutgoingMessageStatusNotification {
    receiptId: number;
    body: {
        chatId: string;
        instanceData: {
            idInstance: number,
            wid: string;
            typeInstance: string;
        },
        timestamp: number,
        idMessage: string;
        status: MessageStatusTypes;
        sendByApi: boolean;
        typeWebhook: "outgoingMessageStatus";
    }
}


type IncomingMessageReceivedNotification = {
    body: {
        idMessage: string;
        instanceData: {
            typeInstance: string;
            wid: string;
            idInstance: number;
        };
        messageData: {
            textMessageData?: {
                textMessage: string;
            };
            fileMessageData?: {
                fileName:string;
                downloadUrl:string;
                caption:string;
                jpegThumbnail:string;
                mimeType:string;
            }
            typeMessage: TypeMessageTypes;
        };
        senderData: {
            chatId: string;
            chatName: string;
            sender: string;
            senderName: string;
        };
        timestamp: number;
        typeWebhook: "incomingMessageReceived";
    };
    receiptId: number;
}

type StateInstanceChangedNotification = {
    receiptId: number;
    body: {
        typeWebhook: "stateInstanceChanged";
        instanceData: {
            idInstance: number;
            wid: string;
            typeInstance: string;
        },
        timestamp: number;
        stateInstance: "authorized";
    }

}

type OutgoingAPIMessageReceived = {
    body: {
        idMessage: string;
        instanceData: {
            typeInstance: string;
            wid: string;
            idInstance: number;
        };
        messageData: {
            extendedTextMessageData: {
                text: string;
                title: string;
                description: string;
                jpegThumbnail: string;
                previewType: string;
            },
            typeMessage: TypeMessageTypes;
        };
        senderData: {
            chatId: string;
            chatName: string;
            sender: string;
            senderName: string;
        };
        timestamp: number;
        typeWebhook: "outgoingAPIMessageReceived";
    };
    receiptId: number;
}

type NotificationTypes = null | OutgoingMessageStatusNotification | IncomingMessageReceivedNotification | StateInstanceChangedNotification | OutgoingAPIMessageReceived;

export type {
    MethodTypes,
    AuthenticationStateTypes,
    ChatTypes,
    MessageTypes,
    NotificationTypes,
}

