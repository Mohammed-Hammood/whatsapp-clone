import React from "react";
import styled from "styled-components";
import ICON from "components/shared/icon";

interface WrapperProps {
    height: string;
    width: string;
    $borderRadius: string;
}

const Wrapper = styled.div<WrapperProps>`
        .profile {
            &__image {
                width: ${({ width }) => width};
                height: ${({ height }) => height};
                border-radius: ${({ $borderRadius }) => $borderRadius};
                overflow:hidden;
                display:flex;
                justify-content: center;
                align-items: center;
                background-color: #DFE5E7;
                img {
                    height: ${({ height }) => height};
                    width: ${({ width }) => width};
                    object-fit: cover;
                }
                svg {
                    width:  30px;
                    height: 30px;
                    margin-bottom:-10px;
                    path {
                        fill:white;
                    }
                }
            }
        }
`
interface Props {
    user?:any
    onClick?: (value?: any) => void
    height?: string;
    width?: string
    borderRadius?: string;
    image?:string;
}
export default function PhotoElement(props: Props): JSX.Element {
    const onClick = props.onClick || (() => { });
    const height = props.height || "40px";
    const width = props.width || "40px";
    const borderRadius = props.borderRadius || "50%";
    const image = props.image
    return (
        <Wrapper height={height} width={width} $borderRadius={borderRadius}>
                <div onClick={onClick} className="profile">
                    <div className="profile__image">
                        {image?<img src={image} alt=""/>: <ICON name="user"/>}
                    </div>
                </div>
        </Wrapper>
    )
}