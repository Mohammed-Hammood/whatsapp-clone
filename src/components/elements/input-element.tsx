import React, { useState } from "react";
import styled from "styled-components";
import { ICON } from "components";

interface WrapperProps {
    $buttonID: string;
    $minHeight?: string;
    $clearButtonMaxHeight: string;
    $clearButtonMargin: string;
}

const Wrapper = styled.div<WrapperProps>`
    width: 100%;
    display: flex;
    justify-content:center;
    flex-direction: column;
    .input__wrapper {
        width: 100%;
        display: flex;
        justify-content: flex-end;
         
        button[id="${({ $buttonID }) => $buttonID}"] {
            cursor: pointer;
            align-items: center;
            border:none;
            background: transparent;
            border-radius: 5px;
            outline:none;
            display: flex;
            justify-content: center;
            position: absolute;
            padding:1px;
            min-width: 20px;
            max-height: ${({ $clearButtonMaxHeight }) => $clearButtonMaxHeight};
            min-height: ${({ $minHeight }) => $minHeight || "20px"};
            margin: ${({ $clearButtonMargin }) => $clearButtonMargin };
            svg {
                width:13px;
                height:13px;
            }
            &:hover {
                background: rgba(255,255, 255, 0.9);
                svg path {
                    fill:black;
            }
            &:active {
                transform: scale(1.03);
            }
        }
        }
        input {
            padding:0 10px;
            min-height: ${({ $minHeight }) => $minHeight ? $minHeight : "40px"};
            outline:1px solid var(--borderColor);
            border-radius: 5px;
            padding:5px 10px;
            border:none;
            width:100%;
            &:focus {
                outline:1px solid var(--mainColor);
            }
        }
    }
    .label__wrapper {
        width:100%;
        display: flex;
        justify-content: space-between;
        .length_counter {
            font-size:var(--fontSize12);
            color:rgba(0,0, 0, 0.5);
        }
    }
`
type InputTypeTypes = "password" | "text" | "button" | "search" | "url" | "email";
interface Props {
    placeholder?: string;
    title?: string;
    maxLength?: number;
    required?: boolean;
    onInput?: (value: string) => void;
    onFocus?: (value: any) => void;
    onKeyDown?: (value: any) => void;
    onChange?: (value: any) => void;
    value: string;
    labelInnerText?: string;
    minLength?: number;
    type?: InputTypeTypes;
    clearButton?: boolean;
    autoFocus?: boolean;
    counter?: boolean;
    minHeight?: string;
    clearButtonMaxHeight?: string;
    clearButtonMargin?: string;
    className?: string;
    disabled?: boolean;
    passwordToggle?: boolean;
}

export default function InputElement(props: Props): JSX.Element {
    const { value, labelInnerText, title, placeholder, required, passwordToggle } = props;
    const [type, setType] = useState<InputTypeTypes>(props.type || "text")
    const inputID = React.useId();
    const buttonID = React.useId();
    const maxLength = props.maxLength !== undefined ? props.maxLength : 100;
    const minLength = props.minLength !== undefined ? props.minLength : 0;
    const disabled = props.disabled !== undefined ? props.disabled : false;
    const className = props.className || "";
    const clearButton = props.clearButton !== undefined ? props.clearButton : true;
    const onFocus = props.onFocus ? props.onFocus : (): void => { }
    const autoFocus = props.autoFocus === true ? true : false;
    const counter = props.counter === false ? false : true;
    const clearButtonMaxHeight: string = props.clearButtonMaxHeight || "100%";
    const clearButtonMargin: string = props.clearButtonMargin || "0 10px";
    const onChange = props.onChange ? props.onChange : (): void => { }
    const onInput = props.onInput ? props.onInput : (): void => { }
    const onKeyDwon = props.onKeyDown ? props.onKeyDown : (): void => { }
    return (
        <Wrapper $buttonID={buttonID} $minHeight={props.minHeight} $clearButtonMaxHeight={clearButtonMaxHeight} $clearButtonMargin={clearButtonMargin}>
            <div className="label__wrapper">
                <label htmlFor={inputID}>{labelInnerText}
                    {required ?
                        <span className="red">*</span>
                        : null}
                </label>
                {counter ?
                    <span className="length_counter">{value.length}/{maxLength}</span>
                    : null}
            </div>
            <div className="input__wrapper">
                <input
                    type={type}
                    id={inputID}
                    autoFocus={autoFocus}
                    maxLength={maxLength}
                    title={title}
                    required={required}
                    className={className}
                    minLength={minLength}
                    disabled={disabled}
                    onKeyDown={(e) => onKeyDwon((e))}
                    value={value}
                    placeholder={placeholder}
                    onInput={(e) => onInput((e.target as HTMLInputElement).value)}
                    onChange={(e) => onChange((e.target as HTMLInputElement).value)}
                    onFocus={(e) => onFocus(e)}
                ></input>
                {value.length > 0 && clearButton && props.type !== 'password' ?
                    <button id={buttonID} onClick={() => { onInput(""); onChange("") }} type="button">
                        <ICON color="silver" name="xmark-solid" />
                    </button>
                    : null}

                {passwordToggle && props.type === 'password' ?
                    <button id={buttonID} onClick={() => { setType(type === 'password' ? "text" : "password") }} type="button">
                        <ICON color="silver" name={type === 'password'? "eye": "eye-slash"} />
                    </button>
                    : null}
            </div>
        </Wrapper>
    )
}