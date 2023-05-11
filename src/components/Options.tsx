import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { ListItem, ListItemText } from "@mui/material";
import OptionsList from "./OptionsList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

type OptionsProps = {
  data: {
    "Menu-Item": { [key: string]: number };
    Ingredient: { [key: string]: string[] };
    And: string[];
  };
  searchValue: string;
  selectedOptions: {
    type: string;
    name: string;
    price: number;
  }[];
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<
      {
        type: string;
        name: string;
        price: number;
      }[]
    >
  >;
  selectedType: string;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
};

type IngredientType = {
  [key: string]: string[];
};

type MenuItemType = {
  [key: string]: number;
};

type AndType = string[];

const Options = (props: OptionsProps) => {
  const {
    data,
    searchValue,
    selectedOptions,
    setSelectedOptions,
    selectedType,
    setSelectedType,
  } = props;
  // const [options, setOptions] = useState<{
  //   [key: string]: IngredientType | MenuItemType | AndType;
  // }>({});
  const [options, setOptions] = useState<{
    [key: string]: any;
  }>({});

  useEffect(() => {
    setOptions(data);
  }, [data]);

  useEffect(() => {
    if (selectedType === "") {
      setOptions(data);
    }
  }, [selectedType]);

  return (
    <Wrapper>
      <OptionsList
        selectedType={selectedType}
        data={data}
        searchValue={searchValue}
        setSelectedType={setSelectedType}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    </Wrapper>
  );
};

export default Options;
