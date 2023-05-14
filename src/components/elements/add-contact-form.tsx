import { ICON, InputElement, Loader, useFetch } from "components";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthentication, selectMessages } from "store/selectors";
import { setWid } from "store/slicers/authentication";
import { setChats } from "store/slicers/messages";
import { ChatTypes } from "types";
import { Endpoints, validNumber } from "utils";
import { AddContactFormWrapper as Wrapper } from "styles/styled-components";

type Props = {
    setActiveChat: (chat: ChatTypes) => void;
}
export default function AddContactForm(props: Props) {
    const { setActiveChat } = props
    const [recipientNumber, setRecipientNumber] = useState<string>("");
    const [recipientName, setRecipientName] = useState<string>("");
    const { chats } = useSelector(selectMessages);
    const dispatch = useDispatch();
    const auth = useSelector(selectAuthentication);
    const url = Endpoints.createChat(auth);

    const callback = (data: { wid: string }): void => {
        const newChat: ChatTypes = {
            id: `${recipientNumber}@c.us`,
            messages: [],
            recipientName: recipientName.trim(),
            recipientNumber: parseInt(recipientNumber),
            lastTimeSeen: "",
            lastAction: {
                text: "",
                timestamp: new Date().getTime() / 1000,
            }
        }
         setActiveChat(newChat);
        dispatch(setChats({ chats: [...chats, newChat] }));
        dispatch(setWid({ wid: data.wid }))
        console.log(recipientNumber)
    }
    const { setUrl, loading, setCallback } = useFetch({});

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUrl(url);
        setCallback(() => callback);
    }
    return (<Wrapper>
        <div className="newChatForm">
            <form onSubmit={(e) => handleSubmit(e)} >
                <InputElement
                    required={true}
                    labelInnerText="Recipient's number"
                    value={recipientNumber}
                    type="text"
                    placeholder="e.g. 79009123456"
                    onChange={(value: string) => validNumber({ value, setValue: setRecipientNumber })}
                />
                <InputElement
                    type="text"
                    required={false}
                    labelInnerText="Recipient's name (optional)"
                    value={recipientName}
                    placeholder="e.g John Smith"
                    onChange={setRecipientName}
                />
                <div className="buttons">
                    <button type="submit">
                        {loading ? <Loader $size={20} /> : "New chat"}
                    </button>
                </div>
            </form >
            <div className="image">
                <img alt="" src={'/images/whatsapp-phone-laptop.jpeg'} />
            </div>
            <div className="textCenter">
                <p>WhatsApp Web</p>
                <p>Send and receive messages without having to leave your phone connected.</p>
                <p>Use WhatsApp on up to four linked devices and one phone at the same time. </p>
            </div>
            <div className="textBottom">
                <p><ICON name="lock-solid" /> Protected by end-to-end encryption </p>
            </div>
        </div>
    </Wrapper>)
}