import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Chip, MenuItem } from "@mui/material";

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
    menuItem: string;
  }[];
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<
      {
        type: string;
        name: string;
        price: number;
        menuItem: string;
      }[]
    >
  >;
  selectedType: string;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
};

export const colors: { [key: string]: { [key: string]: string } } = {
  "Menu-Item": { color: "#1565c0", bgColor: "#1565c033" },
  Ingredient: { color: "#7b1fa2", bgColor: "#7b1fa233" },
  And: { color: "#df661f", bgColor: "#df661f38" },
};

const Reciept = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 2.5em;
`;

const BoldP = styled.p`
  font-weight: bold;
`;

interface MainOptionChipProps {
  type: string;
  bg: string;
}

export const MainOptionChip = styled(Chip)<MainOptionChipProps>`
  color: ${(props) => props.type} !important;
  background-color: ${(props) => props.bg} !important;
  border-radius: 5px !important;
  border: 1px solid ${(props) => props.type} !important;
  cursor: pointer !important;
`;

const Options = (props: OptionsProps) => {
  const {
    data,
    searchValue,
    selectedOptions,
    setSelectedOptions,
    selectedType,
    setSelectedType,
  } = props;

  const [ingredients, setIngredients] = useState<string[]>([]);

  const handleMainOptionClick = (itemKey: string) => {
    switch (itemKey) {
      case "Menu-Item":
        setSelectedOptions([
          ...selectedOptions,
          { type: "Menu-Item", name: "", price: 0, menuItem: "" },
        ]);
        setSelectedType(itemKey);
        break;
      case "Ingredient":
        const allMenuItems = selectedOptions.filter(
          (opt) => opt.type === "Menu-Item"
        );

        if (allMenuItems.length > 0) {
          const lastSelectedMenuItem = allMenuItems[allMenuItems.length - 1];
          setIngredients(data["Ingredient"][lastSelectedMenuItem.name]);
          setSelectedOptions([
            ...selectedOptions,
            {
              type: "Ingredient",
              name: "",
              price: 0,
              menuItem: lastSelectedMenuItem.name,
            },
          ]);
        } else {
          return;
        }
        setSelectedType(itemKey);
        break;
      case "And":
        setSelectedOptions([
          ...selectedOptions,
          { type: "And", name: "", price: 0, menuItem: "" },
        ]);
        setSelectedType("");
        break;
      default:
        break;
    }
  };

  const handleMenuItemClick = (itemKey: string) => {
    const updatedSelectedOptions = [...selectedOptions];
    const menuItemPrice = data["Menu-Item"][itemKey] || 0;
    const menuItemSelected =
      updatedSelectedOptions[updatedSelectedOptions.length - 1];
    menuItemSelected.name = itemKey;
    menuItemSelected.price = menuItemPrice;
    setSelectedOptions(updatedSelectedOptions);
    setSelectedType("");
  };

  const handleIngredientClick = (itemKey: string) => {
    const updatedSelectedOptions = [...selectedOptions];
    const IngredientSelected =
      updatedSelectedOptions[updatedSelectedOptions.length - 1];
    IngredientSelected.name = itemKey;
    setSelectedOptions(updatedSelectedOptions);
    setSelectedType("");
  };

  const renderList = () => {
    switch (selectedType) {
      case "":
        return Object.keys(data).map((itemKey, index) => (
          <MenuItem
            key={itemKey + index}
            onClick={() => handleMainOptionClick(itemKey)}
          >
            <MainOptionChip
              type={colors[itemKey].color || ""}
              bg={colors[itemKey].bgColor || ""}
              label={<>{itemKey === "And" ? "AND" : itemKey}</>}
            />
          </MenuItem>
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
            <MenuItem
              key={itemKey + index}
              onClick={() => handleMenuItemClick(itemKey)}
            >
              <p>{itemKey}</p>
            </MenuItem>
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
            <MenuItem
              key={itemKey + index}
              onClick={() => handleIngredientClick(itemKey)}
            >
              <p>{itemKey}</p>
            </MenuItem>
          ));
        }
        break;
      case "Reciept":
        if (selectedOptions.length > 0) {
          const listItems = selectedOptions.filter(
            (item) => item.type === "Menu-Item"
          );
          const getRecieptTotal = () => {
            return listItems.reduce(
              (accumulator, currentValue) => accumulator + currentValue.price,
              0
            );
          };
          return (
            <Reciept>
              <BoldP>Order:</BoldP>
              {listItems.map((opt, index) => (
                <span key={opt.name + index}>
                  <p
                    key={opt.name + index}
                  >{`${opt.name} - ${opt.price}NIS`}</p>
                  {selectedOptions
                    .filter((option) => option.menuItem === opt.name)
                    .map((ingredient, index) => (
                      <p
                        key={ingredient.name + index}
                      >{`- ${ingredient.name}`}</p>
                    ))}
                </span>
              ))}
              <BoldP>{`Total - ${getRecieptTotal()}NIS`}</BoldP>
            </Reciept>
          );
        }
        break;

      default:
        break;
    }
  };

  return <Wrapper>{renderList()}</Wrapper>;
};

export default Options;
