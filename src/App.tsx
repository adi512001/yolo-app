import React, { useEffect, useState, useRef } from "react";
import Header from "./components/Header";
import { styled } from "styled-components";
import background from "./bg.jpg";
import Logo from "./components/Logo";
import Options from "./components/Options";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  List,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { MainOptionChip, colors } from "./components/OptionsList";

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
  width: 100%;
  justify-content: center;
`;

const FormWrapper = styled(FormControl)`
  min-width: 38em !important;
  .MuiInputBase-root {
    background-color: white !important;
    border-radius: 0 !important;
    &.Mui-focused fieldset {
      border: 0.5px solid #ff4377cc;
    }
  }
  position: relative;
`;

const RecieptTitle = styled.span`
  padding-left: 1.5em;
`;

const CompleteButton = styled(IconButton)`
  position: absolute !important;
  right: 11em;
  top: 13.1em;
  color: #099d09 !important;
`;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      borderRadius: 0,
      marginTop: ".5em",
    },
  },
};

const App = () => {
  const [data, setData] = useState({
    "Menu-Item": {},
    Ingredient: {},
    And: [],
  });
  const [searchValue, setSearchValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<
    { type: string; name: string; price: number }[]
  >([]);
  const [selectedType, setSelectedType] = useState("");
  const [listOpen, setListOpen] = useState(false);
  const [showSelectedOptions, setShowSelectedOptions] = useState(true);

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
    setShowSelectedOptions(false);
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
            <FormWrapper sx={{ m: 1, width: 300 }}>
              <InputLabel id="input-label">Order</InputLabel>
              <Select
                labelId="input-label"
                id="input"
                multiple
                value={selectedOptions}
                open={listOpen}
                onClose={handleCloseList}
                onOpen={handleOpenList}
                input={<OutlinedInput id="select-input" label="Order" />}
                MenuProps={MenuProps}
                renderValue={(selected) =>
                  showSelectedOptions ? (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value, index) => (
                        <MainOptionChip
                          key={value.name + index}
                          type={colors[value.type].color || ""}
                          bg={colors[value.type].bgColor || ""}
                          label={<>{renderChipLabel(value)}</>}
                        />
                      ))}
                    </Box>
                  ) : (
                    <RecieptTitle>Reciept:</RecieptTitle>
                  )
                }
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
            </FormWrapper>
            <CompleteButton color="secondary" onClick={handleOrderClick}>
              <CheckCircleIcon />
            </CompleteButton>
          </SearchContainer>
        </InnerContent>
      </Content>
    </Wrapper>
  );
};

export default App;
