import React from "react";
import logo from "../../logo.png";
import { Name, Wrapper } from "./LogoStyles";

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
