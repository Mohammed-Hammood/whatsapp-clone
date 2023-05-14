import React from "react";
import { ICON, PhotoElement, TimeElement } from "components";
import { useDispatch, useSelector } from "react-redux";
import { selectMessages } from "store/selectors";
import { ChatTypes } from "types";
import { clearMessages, setChats } from "store/slicers/messages";
import { ChatsListWrapper as Wrapper } from "styles/styled-components";



type Props = {
    setActiveChat: (chat: ChatTypes | null) => void;
    activeChat: ChatTypes;
}
export default function ChatsList(props: Props) {
    const { setActiveChat, activeChat } = props
    const { chats } = useSelector(selectMessages);
    const dispatch = useDispatch();
    const deleteChat = (chat: ChatTypes): void => {
        const newChatsList = chats.filter(item => item.id !== chat.id);
        dispatch(setChats({ chats: newChatsList }));
        dispatch(clearMessages()); //temperary solution. 
        setActiveChat(null);

    }
    return (<Wrapper>
        <div className="chats">
            <div className="chats__header">
                <div className="chats__header__leftGroup">
                    <button type="button" onClick={() => { }}>
                        <PhotoElement />
                    </button>
                </div>
                <div className="chats__header__rightGroup">
                    <button type="button" onClick={() => { }}>
                        <ICON name='users-group' color="" />
                    </button>
                    <button type="button" onClick={() => deleteChat(activeChat)}>
                        <ICON name='user-group-solid' />
                    </button>
                    <button type="button" onClick={() => { }}>
                        <ICON name='comment-dots-solid' color="#54656f" />
                    </button>
                    <button type="button" onClick={() => { }}>
                        <ICON name='ellipsis-vertical-solid' />
                    </button>
                </div>
            </div>
            <div className="chats__search">
                <div className="chats__search__wrapper">
                    <button type="button" onClick={() => { }}>
                        <ICON name='magnifying-glass-solid' />
                    </button>
                    <input type="text" value={""} onChange={() => { }} placeholder="Search or new chat" />
                </div>
                <button type="button" onClick={() => { }}>
                    <ICON name='filter-solid' />
                </button>
            </div>
            <div className="chats__list">
                {chats.map((item, index) => {
                    return (
                        <div key={index} className={`listChat ${item.id === activeChat.id ? "activeListChat" : ""}`}>
                            <div className="listChat__leftGroup" onClick={() => setActiveChat(item)}>
                                <PhotoElement />
                            </div>
                            <div className="listChat__centerGroup" onClick={() => setActiveChat(item)}>
                                <div className="listChat__centerGroup__receiverName">{item.recipientName}</div>
                                <div className="listChat__centerGroup__lastAction">{item.lastAction.text}</div>
                            </div>
                            <div className="listChat__rightGroup">
                                <span onClick={() => setActiveChat(item)}>
                                    {<TimeElement timestamp={item.lastAction.timestamp} />}
                                </span>
                                <span className="listChat__rightGroup__dropdown">
                                    <button type="button" className="listChat__rightGroup__dropdown__button">
                                        <ICON name="angle-down" />
                                    </button>
                                    <div className="listChat__rightGroup__dropdown__list">
                                        <button type="button" className="listChat__rightGroup__dropdown__list__item" onClick={() => deleteChat(item)}>
                                            <span>Delete Chat</span>
                                            <ICON name="trash-solid" />
                                        </button>
                                    </div>
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </Wrapper>)
}