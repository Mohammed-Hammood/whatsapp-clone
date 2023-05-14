import React, { useState } from "react";
import { ChatsList, ChatElement, AddContactForm } from "components";
import { ChatTypes } from 'types';
import "styles/home-page.scss";


export default function HomePage() {
    const [activeChat, setActiveChat] = useState<null | ChatTypes>(null);

    return (
        <>
            <main className="homePage">
                {!activeChat ?
                    <AddContactForm
                        setActiveChat={setActiveChat}
                    /> :
                    <>
                        <div className="content-center">
                            <ChatsList
                                setActiveChat={setActiveChat}
                                activeChat={activeChat}
                            />
                            <ChatElement
                                chat={activeChat}
                                setChat={setActiveChat}
                            />

                        </div>
                    </>}
            </main>
        </>)
}