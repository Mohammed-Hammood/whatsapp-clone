import styled from "styled-components";


export const ChatsListWrapper = styled.div`
    width: 100%;
    display: flex;
    flex: 1 1 30%;
    flex-direction: column;
    z-index: 3;    
    .chats {
        width: 100%;
        display: flex;
        flex: 1 1 30%;
        flex-direction: column;
        z-index: 3;

        &__header {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    border-right: 1px solid silver;
                    height: 59px;
                    padding: 10px;
                    background-color: var(--panel-header-background);

                    &__leftGroup,
                    &__rightGroup {
                        display: flex;
                        gap: 5px;
                    }
                }

            &__search {
                padding: 10px;
                display: flex;
                justify-content: space-between;
                background-color: white;

                svg path {
                    fill: var(--icon-lighter);
                }

                &__wrapper {
                    display: flex;
                    border-radius: 8px;
                    width: 100%;
                    background-color: var(--search-input-background);

                    input {
                        border: none;
                        outline: none;
                        background: transparent;
                        padding: 10px;
                        width: 100%;
                    }
                }
            }

            &__list {
                display: flex;
                flex-direction: column;
                background-color: white;
                height: 100%;
                gap: 1px;
                max-height: 780px;
                overflow-y: auto;
                padding-bottom: 20px;
                .listChat {
                    display: flex;
                    justify-content: center;
                    padding: 10px;
                    width: 100%;
                    height: auto;
                    cursor: pointer;
                    
                    &:hover,
                    &.activeListChat {
                        background-color: var(--background-default-hover);
                    }

                    &__leftGroup,
                    &__rightGroup,
                    &__centerGroup {
                        width: 100%;
                        display: flex;
                        gap: 10px;
                        flex-direction: column;
                        
                        &__receiverName {
                            font-size: var(--fontSize17);
                        }
                        
                        &__lastAction {
                            overflow: hidden;
                            font-size: var(--fontSize14);
                            max-width: 95%;
                            padding: 2px 0;
                            text-overflow: ellipsis;
                            height: 20px;

                        }
                    }

                    &__leftGroup,
                    &__rightGroup {
                        max-width: 55px;
                        display: flex;
                        flex-direction: column;
                        gap: 5px;
                    }

                    &__rightGroup {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        &__dropdown {
                            &:focus-within {
                                .listChat__rightGroup__dropdown__list {
                                    display: flex;
                                }
                            }
                            &__button {
                                padding:1px;
                                height:20px;
                                width: 20px;
                                &:active + div, &:focus + div {
                                    display: flex;
                                }
                            }
                            &__list {
                                position: absolute;
                                width:100%;
                                background-color: white;
                                max-width: 100px;
                                border-radius: 5px;
                                box-shadow: 0 0 5px rgba(0, 0, 10, 0.2);
                                margin-left: -50px;
                                display: none;

                                &__item {
                                    gap:5px;
                                    width:100%;
                                    padding:5px;
                                    max-width: 100%;
                                    &:hover {
                                        border-radius: 0;
                                    }
                                }
                            }
                        }
                    }
                }

                .chat:not(:first-child) {
                    border-top: 1px solid var(--border-list);
                }
            }
        }
@media screen and (max-width: 1600px) {
    .chats__list {
        max-height: 818px;
    }
}
`;