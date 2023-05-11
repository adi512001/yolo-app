import React from "react";
import Logo from "../Logo/Logo";
import { Wrapper } from "./HeaderStyles";

const Header = () => {
  return (
    <Wrapper>
      <Logo header />
    </Wrapper>
  );
};

export default Header;
