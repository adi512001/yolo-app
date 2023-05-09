import React from "react";
import { styled } from "styled-components";
import Logo from "./Logo";

const Wrapper = styled.div`
  height: 3em;
  width: 100%;
  background: #262626;
  position: relative;
  display: flex;
  justify-content: center;
  box-shadow: 0px 0px 4px 2px #686868;
`;

const Header = () => {
  return (
    <Wrapper>
      <Logo header />
    </Wrapper>
  );
};

export default Header;
