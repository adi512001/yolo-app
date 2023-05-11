import React, { useEffect, useState, useRef } from "react";
import Header from "./components/Header";
import { styled } from "styled-components";
import background from "./bg.jpg";
import Logo from "./components/Logo";
import Options from "./components/Options";
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  List,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";

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

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
`;

const Input = styled.input`
  outline: none;
  cursor: pointer;
`;

const App = () => {
  const [data, setData] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<
    { type: string; name: string; price: number }[]
  >([]);
  const [selectedType, setSelectedType] = useState("");
  const [listOpen, setListOpen] = useState(false);

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

  const handleOpenList = () => {
    setListOpen(true);
  };

  const handleCloseList = () => {
    setListOpen(false);
  };

  const handleOrderClick = () => {
    setSelectedType("Reciept");
    handleOpenList();
  };

  const renderChipLabel = (value: {
    type: string;
    name: string;
    price: number;
  }) => {
    if (value.type === "And") {
      return "AND";
    }
    if (value.name === "") {
      return value.type;
    }
    return `${value.type.charAt(0)} / ${value.name}`;
  };

  return (
    <Wrapper>
      <Header />
      <Content>
        <Space />
        <InnerContent>
          <Logo />
          <SearchContainer>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="input-label">Order</InputLabel>
              <Select
                labelId="input-label"
                id="input"
                multiple
                value={selectedOptions}
                open={listOpen}
                onClose={handleCloseList}
                onOpen={handleOpenList}
                input={<OutlinedInput id="select-input" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value, index) => (
                      <Chip
                        key={value.name + index}
                        label={<>{renderChipLabel(value)}</>}
                      />
                    ))}
                  </Box>
                )}
              >
                <Options
                  data={data}
                  searchValue={searchValue}
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                />
              </Select>
            </FormControl>
            <Button variant="outlined" onClick={handleOrderClick}>
              Order
            </Button>
          </SearchContainer>
        </InnerContent>
      </Content>
    </Wrapper>
  );
};

export default App;
