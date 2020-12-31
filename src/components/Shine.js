import React from "react";
import styled from "styled-components";
import {appColors} from "../utils/styles";

const activeBackground = `linear-gradient(to right, ${appColors.secondaryDarker} 20%, ${appColors.secondaryDarker} 40%, ${appColors.secondary} 50%, rgb(104, 83, 214) 55%, ${appColors.secondaryDarker} 70%, ${appColors.secondaryDarker} 100%);`

const Border = styled.div`
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

const Children = styled.div`
  border-radius: 16px;
  position: absolute;
  top: 0.75%;
  left: 0.75%;
  display: block;
  height: 98.5%;
  width: 98.5%;
  margin: auto;
  align-self: center;
  background: ${props => props.background};
  z-index: 1;
`

function Shine({children, active = false, borderColor}) {
    return (
        <>
            <Border active={active} background={borderColor}>
            </Border>
            <Children background={borderColor}>
                {children}
            </Children>
        </>
    )
}

export default Shine;