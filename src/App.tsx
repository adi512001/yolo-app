import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { styled } from "styled-components";
import background from "./bg.jpg";
import Logo from "./components/Logo";

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;

  &:before {
    background-image: url(${background});
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.35;
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
  }
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 2fr;
`;

const Space = styled.div`
  display: block;
`;

const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = () => {
  const [data, setData] = useState({});

  const getData = async () => {
    const res = await fetch("http://localhost:3030/items");
    if (res.ok) {
      const items = await res.json();
      setData(items);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Wrapper>
      <Header />
      <Content>
        <Space />
        <InnerContent>
          <Logo />
        </InnerContent>
      </Content>
    </Wrapper>
  );
};

export default App;
