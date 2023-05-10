import React from "react";
import { styled } from "styled-components";
import logo from "../logo.png";

const Wrapper = styled.div`
  display: flex;
  gap: 1.6em;
  align-items: center;
`;
const Name = styled.p`
  font-family: inherit;
  font-weight: 500;
  letter-spacing: 0.3rem;
`;

type LogoProps = {
  header?: boolean;
};

const Logo = (props: LogoProps) => {
  const { header } = props;

  return (
    <Wrapper>
      <img src={logo} style={{ height: header ? "1.5em" : "3em" }} alt="logo" />
      <Name style={{ color: header ? "white" : "#262626" }}>YOLO</Name>
    </Wrapper>
  );
};

export default Logo;
