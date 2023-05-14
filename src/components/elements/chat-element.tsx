import React, { useId, useState } from "react";
import { ChatTypes, MessageTypes, NotificationTypes, TypeMessageTypes } from "types";
import { selectAuthentication, selectMessages } from "store/selectors";
import { useDispatch, useSelector } from "react-redux";
import { setChats, setMessages as setMessagesList } from "store/slicers/messages";
import { PhotoElement, useFetch, ICON, InputElement, TimeElement, Loader } from "components";
import { Endpoints } from "utils";
import ReactAudioPlayer from "react-audio-player";


interface Props {
    chat: ChatTypes;
    setChat: (chat: ChatTypes) => void;
}


export default function ChatElement(props: Props) {
    const { chat, setChat } = props;
    const [notification, setNotification] = useState<null | NotificationTypes>(null);
    const [sendMessageLoading, setSendMessageLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const auth = useSelector(selectAuthentication);
    const { messages, chats } = useSelector(selectMessages);
    const MessagesContainerId = useId();
    const dispatch = useDispatch();
    const { setUrl, setMethod, setCallback, loading, setData } = useFetch({});
    const updateChat = (chat:ChatTypes):void => {
        const updatedChats = chats.map(item => item.id === chat.id ? chat : item);
        setChat(chat);
        dispatch(setChats({ chats: updatedChats }));
    }
    const callbackNotifications = (data?: NotificationTypes): void => {
        const createNewMessage = ({ idMessage, text, type, senderName, senderId, timestamp, typeMessage, downloadUrl, mimeType, status, caption }:
            {
                caption?: string,
                status?: MessageTypes['statusMessage'],
                mimeType?: string,
                typeMessage?: TypeMessageTypes,
                idMessage: string,
                text: string,
                type?: MessageTypes['type'],
                senderId: string,
                senderName: string,
                timestamp?: number,
                downloadUrl?: string
            }): MessageTypes => {
            const newMessage: MessageTypes = {
                idMessage,
                textMessage: text,
                statusMessage: status || "sent",
                typeMessage: typeMessage || "textMessage",
                senderId,
                senderName,
                timestamp: timestamp || new Date().getTime() / 1000,
                type: type || "incoming",
                downloadUrl,
                mimeType,
                caption,
            }
            return newMessage;
        }

        if (data && (data.body.typeWebhook === 'incomingMessageReceived')) {
            const { senderData, messageData, timestamp, idMessage } = data.body;
            const { fileMessageData, textMessageData } = messageData;
            if (senderData.chatId === chat.id && senderData.sender !== auth.wid) {
                const newMessage = createNewMessage({
                    idMessage,
                    text: textMessageData ? textMessageData.textMessage : "",
                    senderId: senderData.sender,
                    status: "read",
                    typeMessage: messageData.typeMessage,
                    downloadUrl: fileMessageData ? fileMessageData.downloadUrl : "",
                    mimeType: fileMessageData?.mimeType,
                    timestamp,
                    caption: fileMessageData?.caption,
                    senderName: senderData.senderName,
                });
                const messageFound = messages.find(item => item.idMessage === newMessage.idMessage);
                if (!messageFound) {
                    dispatch(setMessagesList({ messages: [...messages, newMessage] }));
                    const updatedChat = {
                        ...chat,
                        recipientName: senderData.senderName,
                        lastAction: { text: newMessage.textMessage, timestamp: new Date().getTime() / 1000 },
                        lastTimeSeen: "Online"
                    }

                   updateChat(updatedChat);
                }

            }
        }
        else if (data && (data.body.typeWebhook === 'outgoingAPIMessageReceived')) {
            const { senderData, messageData, timestamp, idMessage } = data.body;

            if (senderData.chatId === chat.id && senderData.sender !== auth.wid) { //save message only when the sender is not the same loggined user
                const newMessage = createNewMessage({
                    idMessage,
                    text: messageData.extendedTextMessageData.text,
                    senderId: senderData.sender, timestamp,
                    senderName: senderData.senderName,
                    type: "incoming",

                })
                const messageFound = messages.find(item => item.idMessage === newMessage.idMessage);
                if (!messageFound) {
                    dispatch(setMessagesList({ messages: [...messages, newMessage] }));
                }
            }
        }
        else if (data && data.body.typeWebhook === 'outgoingMessageStatus') {
            const { status, idMessage } = data.body;
            const updatedMessages = messages.map(item => item.idMessage === idMessage ? { ...item, statusMessage: status } : item);
            dispatch(setMessagesList({ messages: updatedMessages }));
        }
        if (data) {
            setNotification(data)
        }
    }



    const sendMessage = async (key: string): Promise<void> => {

        if (key === 'Enter' && message.trim().length > 0 && auth.id) {
            try {
                setSendMessageLoading(true)
                const req = await fetch(Endpoints.sendMessage(auth), {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        message: message,
                        chatId: `${chat.recipientNumber}@c.us`,
                    })
                })
                const res = await req.json();
                if (res && res.idMessage) {
                    const newMessage: MessageTypes = {
                        idMessage: res.idMessage,
                        textMessage: message.trim(),
                        timestamp: new Date().getTime() / 1000,
                        senderName: "",
                        type: "outgoing",
                        statusMessage: "sent",
                        typeMessage: "textMessage",
                        senderId: auth.wid,
                    }
                    const updatedChat = { ...chat, lastAction: { text: newMessage.textMessage, timestamp: newMessage.timestamp } };
                    updateChat(updatedChat);

                    dispatch(setMessagesList({ messages: [...messages, { ...newMessage, idMessage: res.idMessage }] }));

                }
                setMessage("");
            }
            finally {
                setSendMessageLoading(false);
            }
        }
    }
    const scrollToBottom = (): void => {
        const messagesContainer = document.getElementById(MessagesContainerId) as HTMLDivElement;
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    React.useEffect(() => {
        let interval = setInterval(() => {
            if (notification && !loading) {
                setUrl(Endpoints.deleteNotification({ ...auth, receiptId: notification.receiptId }));
                setMethod("DELETE");
                setCallback(() => setNotification(null));
            } else if (!notification && !loading) {
                setUrl(Endpoints.receiveNotifications(auth));
                setCallback(() => callbackNotifications);
                setMethod("GET");
            }
        }, 100);

        if (sendMessageLoading) scrollToBottom();

        return () => clearInterval(interval);

    });
    React.useEffect(() => {
        if (messages.length === 0) {
            setUrl(Endpoints.getChatHistory(auth));
            
            setMethod("POST");
            
            const callbackChatHistory = (messages: MessageTypes[]): void => {
                const sortedMessages = messages.sort((a, b) => a.timestamp - b.timestamp);
                dispatch(setMessagesList({ messages: sortedMessages }));
                const senderMessage = messages.find(item => item.type === 'incoming' && item.senderId !== auth.wid);
                if(senderMessage){
                    updateChat({...chat, recipientName: senderMessage.senderName});
                }
            }

            setData({
                chatId: `${chat.recipientNumber}@c.us`,
                count: 10,
            })
            setCallback(() => callbackChatHistory);
        }
    })
    return (
        <div className="chat">
            <div className="chat__header">
                <div className="chat__header__rightGroup">
                    <button onClick={() => { }} type="button">
                        <PhotoElement />
                    </button>
                    <div className="chat__header__rightGroup__receiverInfo">
                        <span>{chat.recipientName}</span>
                        <span className="chat__header__rightGroup__receiverInfo__receiverStatus">{chat.lastTimeSeen}</span>
                    </div>
                </div>
                <div className="chat__header__leftGroup">
                    <button type="button" onClick={() => { }}>
                        <ICON name="magnifying-glass-solid" color='#54656f' />
                    </button>
                    <button type="button" onClick={() => { }}>
                        <ICON name="ellipsis-vertical-solid" color='#54656f' />
                    </button>
                </div>
            </div>
            <div className="bodyWrapper" id={MessagesContainerId}>
                <div className="bgImage">
                    <div className="bgImage__bg"></div>
                </div>
                <div className="body" >
                    <div className="encryptionMessage">
                        <div>
                            <span>
                                <ICON name="lock-solid" color="#54656f" />
                            </span>
                            <span>
                                Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.
                            </span>
                        </div>
                    </div>
                    {messages.map(item => {
                        return (
                            <div className={item.type === 'outgoing' ? "message_sender" : "message_receiver"} key={item.idMessage} id={`message_${item.idMessage}`}>
                                <div className="message">
                                    {item.typeMessage === 'videoMessage' ?
                                        <div className="message__video">
                                            <video src={item.downloadUrl} />
                                            <span className="message__video__caption">{item.caption}</span>
                                        </div> : null}
                                    {item.typeMessage === 'audioMessage' ?
                                        <div className="message__audio">
                                            <ReactAudioPlayer
                                                controls
                                                src={item.downloadUrl}
                                            />
                                        </div>
                                        : null}
                                    {item.typeMessage === 'textMessage' || item.typeMessage === 'extendedTextMessage' ?
                                        <div className='message__text'>{item.textMessage}</div>
                                        : null}
                                    {item.typeMessage === 'imageMessage' ?
                                        <div className='message__image'>
                                            <img src={item.downloadUrl} alt="" />
                                            <span className="message__image__caption">{item.caption}</span>
                                        </div>
                                        : null}

                                    <div className='message__info'>
                                        <div className='message__info__timestamp' >
                                            <TimeElement timestamp={item.timestamp} fontSize="var(--fontSize10)" />
                                        </div>
                                        {item.type === 'outgoing' ? <>
                                            <div className="message__info__icon" title={item.statusMessage}>
                                                {item.statusMessage === "delivered" || item.statusMessage === "read" ?
                                                    <ICON name={item.statusMessage === 'read' ? 'check-double-solid' : (item.statusMessage === 'delivered' ? 'check-solid' : "")}
                                                        class="icon13"
                                                        color={item.statusMessage === 'read' ? "#53bdeb" : "silver"}
                                                    />
                                                    : null}
                                                {item.statusMessage === "sent" ? <Loader $size={10} $borderWidth={1} /> : null}
                                                {item.statusMessage === "failed" ? <ICON name="circle-exclamation-solid" color="red" /> : null}
                                            </div>
                                        </> : null}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="chat__footer">
                <button type="button" className="primary" title={"Send"} >
                    <ICON name="face-laugh-regular" color="black" />
                </button>
                <button type="button" className="primary" title={"Send"} >
                    <ICON name="paper-clip-solid" color="black" />
                </button>

                <InputElement
                    minHeight="42px"
                    type="text"
                    placeholder="Enter your message"
                    counter={false}
                    onChange={setMessage}
                    onKeyDown={(e) => sendMessage(e.key)}
                    value={message}
                    autoFocus={true}
                    clearButton={false}
                    disabled={sendMessageLoading}
                />
                <button type="button" title={"Cancel"}>
                    <ICON name="microphone-solid" color="black" />
                </button>

            </div>
        </div>
    )
}