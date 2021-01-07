import React from "react";
import styled from "styled-components";
import {appColors} from "../utils/styles";

const activeBackground = `linear-gradient(to right, ${appColors.secondaryDarker} 20%, ${appColors.secondaryDarker} 40%, ${appColors.shine} 50%, rgb(104, 83, 214) 55%, ${appColors.secondaryDarker} 70%, ${appColors.secondaryDarker} 100%);`

const BorderPulse = styled.div`
  position: absolute;
  top: -50%;
  left: -50%;
  z-index: -9;
  display: block;
  height: 200%;
  width: 200%;
  transform: rotate(-45deg);
  overflow: hidden;
  background: ${props => props.active ? activeBackground : props.background};
  background-size: 200% auto;

  animation: ${props => props.active ? "shine 2.5s linear infinite" : "none"};

  @keyframes shine {
    to {
      background-position: 150% center;
    }
  }
`;

const BorderFill = styled.div`
  position: absolute;
  top: -50%;
  left: -50%;
  z-index: -9;
  display: block;
  height: 200%;
  width: 200%;
  transform: rotate(90deg);
  overflow: hidden;
  background: ${props => props.background};
  background-size: 200% auto;

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.active ? "100%" : 0 };
    height: 100%;
    background-color: white;
    transition: width .3s ease-in-out;
  }
  
`;


const Children = styled.div`
  border-radius: 16px;
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  height: 100%;
  width: 100%;
  margin: auto;
  transform: ${props => props.borderSize ? `scale(${props.borderSize})` : "scale(1)"};
  align-self: center;
  background: ${props => props.background};
  z-index: 1;
`

function Shine({children, active = false, borderColor, childrenStyle, borderSize, variant = "wave"}) {
    return (
        <>
            {variant === "wave" && (
                <BorderPulse active={active} background={borderColor} />
            )}
            {variant === "fill" && (
                <BorderFill active={active} background={borderColor} />
            )}
            <Children background={borderColor} style={childrenStyle} borderSize={1 - (borderSize * 0.01)}>
                {children}
            </Children>
        </>
    )
}

export default Shine;