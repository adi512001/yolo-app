import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Logo from "./components/Logo/Logo";
import Options from "./components/Options/Options";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Input, Select } from "@mui/material";
import { colors } from "./components/Options/Options";
import { MainOptionChip } from "./components/Options/OptionsStyles";
import {
  CompleteButton,
  Content,
  FormWrapper,
  InnerContent,
  MenuProps,
  RecieptTitle,
  SearchContainer,
  Space,
  Wrapper,
} from "./AppStyles";

const App = () => {
  const [data, setData] = useState({
    "Menu-Item": {},
    Ingredient: {},
    And: [],
  });
  const [searchValue, setSearchValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<
    { type: string; name: string; price: number; menuItem: string }[]
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
              <Select
                labelId="input-label"
                id="input"
                multiple
                value={selectedOptions}
                open={listOpen}
                onClose={handleCloseList}
                onOpen={handleOpenList}
                input={<Input id="select-input" />}
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
