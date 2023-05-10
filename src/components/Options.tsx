import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { ListItem, ListItemText } from "@mui/material";
import OptionsList from "./OptionsList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6em;
`;

type OptionsProps = {
  data: {
    [key: string]: { [key: string]: number | string[] } | string[];
  };
  searchValue: string;
};

type IngredientType = {
  [key: string]: string[];
};

type MenuItemType = {
  [key: string]: number;
};

type AndType = string[];

const Options = (props: OptionsProps) => {
  const { data, searchValue } = props;
  // const [options, setOptions] = useState<{
  //   [key: string]: IngredientType | MenuItemType | AndType;
  // }>({});
  const [options, setOptions] = useState<{
    [key: string]: any;
  }>({});
  const [selectedOptions, setSelectedOptions] = useState<
    { type: string; name: string; price: number }[]
  >([]);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    setOptions(data);
  }, [data]);

  useEffect(() => {
    if (selectedType === "") {
      setOptions(data);
    }
  }, [selectedType]);

  useEffect(() => {}, [selectedOptions]);

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
