import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { ListItem, ListItemText } from "@mui/material";

type OptionsListProps = {
  selectedType: string;
  data: {
    [key: string]: { [key: string]: number | string[] } | string[];
  };
  searchValue: string;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
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
};

const OptionsList = (props: OptionsListProps) => {
  const {
    selectedType,
    setSelectedType,
    data,
    searchValue,
    selectedOptions,
    setSelectedOptions,
  } = props;

  const [ingredients, setIngredients] = useState<string[]>([]);

  const handleMainOptionClick = (itemKey: string) => {
    switch (itemKey) {
      case "Menu-Item":
        setSelectedType(itemKey);
        break;
      case "Ingredient":
        const allMenuItems = selectedOptions.filter(
          (opt) => opt.type === "Menu-Item"
        );
        if (allMenuItems.length > 1) {
          const lastSelectedMenuItem = allMenuItems[allMenuItems.length - 1];
          setIngredients(
            data["Ingredient"]
              ? data["Ingredient"][lastSelectedMenuItem.name]
              : []
          );
        }
        setSelectedType(itemKey);
        break;
      case "And":
        setSelectedType("");
        break;
      default:
        break;
    }
  };

  const handleMenuItemClick = (itemKey: string) => {
    setSelectedOptions([
      ...selectedOptions,
      {
        type: selectedType,
        name: itemKey,
        // price: data["Menu-Item"] ? data["Menu-Item"][itemKey] : 0,
        price: 0,
      },
    ]);
    setSelectedType("");
  };

  const renderList = () => {
    switch (selectedType) {
      case "":
        return Object.keys(data).map((itemKey, index) => (
          <ListItem
            key={itemKey + index}
            onClick={() => handleMainOptionClick(itemKey)}
          >
            <ListItemText>{itemKey}</ListItemText>
          </ListItem>
        ));
      case "Menu-Item":
        const filteredMenuItems = Object.keys(data["Menu-Item"]).filter(
          (itemKey) => {
            if (searchValue === "") {
              return itemKey;
            } else if (
              itemKey.toLowerCase().includes(searchValue.toLowerCase())
            ) {
              return itemKey;
            }
          }
        );
        if (filteredMenuItems.length > 0) {
          return (filteredMenuItems as string[]).map((itemKey, index) => (
            <ListItem
              key={itemKey + index}
              onClick={() => handleMenuItemClick(itemKey)}
            >
              <ListItemText>{itemKey}</ListItemText>
            </ListItem>
          ));
        }
        break;
      case "Ingredient":
        const filteredIngredients = ingredients.filter((itemKey) => {
          if (searchValue === "") {
            return itemKey;
          } else if (
            itemKey.toLowerCase().includes(searchValue.toLowerCase())
          ) {
            return itemKey;
          }
        });
        if (filteredIngredients.length > 0) {
          return (filteredIngredients as string[]).map((itemKey, index) => (
            <ListItem
              key={itemKey + index}
              onClick={() => handleMenuItemClick(itemKey)}
            >
              <ListItemText>{itemKey}</ListItemText>
            </ListItem>
          ));
        }
        break;

      default:
        break;
    }
  };

  return <>{renderList()}</>;
};

export default OptionsList;
