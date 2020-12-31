import React from "react";
import styled from "styled-components";
import Shine from "./Shine";

const Holder = styled.div`
  width: 350px;
  height: 250px;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
`

function Test() {
    return (
        <Holder>
            <Shine>
                <img style={{borderRadius:"16px", width: "100%", height:"100%"}} src="https://via.placeholder.com/350x250" />
            </Shine>

        </Holder>
    )
}

export default Test;