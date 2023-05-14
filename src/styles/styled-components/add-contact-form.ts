import styled from "styled-components"

export const AddContactFormWrapper = styled.div`
    width: 100%;
    background-color: white;
    max-width: 1000px;
    margin: 0 10px;
    margin-top: 50px;
    padding: 15px;
    border-radius: 5px;
    z-index: 2;
    display: grid;
    justify-content: stretch;
    flex-direction: column;
    align-items: stretch;
    border: 1px solid var(--borderColor);
    border-bottom: 6px solid var(--mainColor);
    height: 870px;

        form {
            width: 100%;
            flex-direction: column;
            height: unset;
            display: flex;
            gap: 10px;

            input {
                outline: 1px solid var(--borderColor);
                padding: 10px;
                border-radius: 5px;
                border: none;
                min-height: 40px;

                &:focus {
                    outline: 1px solid var(--mainColor);
                }
            }

            .buttons {
               display: flex;
               align-items: center;

                button {
                    border: none;
                    cursor: pointer;
                    padding: 10px;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    color: white;
                    background-color: var(--mainColor);
                    border-radius: 5px;
                    width: auto;
                    height: auto;
                    min-width: 100px;
                    min-height: 40px;

                    &:active {
                        transform: scale(1.1);
                    }
                }
            }
        }

        svg path {
            fill: var(--icon-lighter);
        }

        .image {
            min-height: 100px;
            width: 100%;
            padding: 5px;
            display:flex;
            justify-content:center;
            align-items:center;

            img {
                width: 100%;
                max-width: 400px;
                object-fit: contain;
            }
        }

        .textCenter {
            padding: 10px;
            display:flex;
            justify-content:center;
            align-items:center;
            flex-direction: column;
            color: #41525d;

            p:first-child {
                text-align: center;
                width: 100%;
                padding: 10px;
                font-size: var(--fontSize30);
                min-height: 40px;
                ;
            }
        }

        .textBottom {
            width: 100%;
            /* position: fixed; */
            bottom: 40px;
            left: 0;
            display: flex;
            justify-content: center;
            color: #41525d;
        }
`