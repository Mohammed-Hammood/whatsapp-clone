import React from "react";
import styled from "styled-components";

type Props = {
    timestamp: number;
    color?: string;
    fontSize?: string;
}
type WrapperProps = {
    $fontSize?: string;
    $color?: string;
}
const Wrapper = styled.div<WrapperProps>`
    display:flex;
    justify-content: flex-start;
    gap:5px;
    padding:0;
    outline:0;
    border:0;
    cursor: default;
    background:transparent;
    word-spacing: normal;
    font-size: ${({ $fontSize }) => $fontSize || "var(--fontSize13)"};
    align-items: center;
    color: ${({ color }) => color || "black"};

`
const format = (date: number): string => {
    if (date < 10) return `0${date}`;
    return `${date}`;
}


const getFormatedTime = (timestamp: number) => {
    const localDate = new Date(timestamp * 1000);
    return {
        time: `${format(localDate.getHours())}:${format(localDate.getMinutes())}`,

    }
}

export default function TimeElement(props: Props) {
    const { timestamp } = props;

    const time = getFormatedTime(timestamp).time;
    return (
        <Wrapper  {...{ $color: props.color, $fontSize: props.fontSize }}>
            {time}
        </Wrapper>
    )
}