import React, { useState } from "react";
import { MenuItem } from "@mui/material";
import { BoldP, MainOptionChip, Reciept, Wrapper } from "./OptionsStyles";
const MENU_ITEM = "Menu-Item";
const INGREDIENT = "Ingredient";
const AND = "And";

type DataType = {
  [MENU_ITEM]: { [key: string]: number };
  [INGREDIENT]: { [key: string]: string[] };
  [AND]: string[];
};

export type SelectedOptionType = {
  type: string;
  name: string;
  price: number;
  menuItem: string;
};

type OptionsProps = {
  data: DataType;
  searchValue: string;
  selectedOptions: SelectedOptionType[];
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<SelectedOptionType[]>
  >;
  selectedType: string;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
};

type ColorsType = {
  [key: string]: { [key: string]: string };
};

export const colors: ColorsType = {
  [MENU_ITEM]: { color: "#1565c0", bgColor: "#1565c033" },
  [INGREDIENT]: { color: "#7b1fa2", bgColor: "#7b1fa233" },
  [AND]: { color: "#df661f", bgColor: "#df661f38" },
};

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
      case MENU_ITEM:
        setSelectedOptions([
          ...selectedOptions,
          { type: MENU_ITEM, name: "", price: 0, menuItem: "" },
        ]);
        setSelectedType(itemKey);
        break;
      case INGREDIENT:
        const allMenuItems = selectedOptions.filter(
          (opt) => opt.type === MENU_ITEM
        );

        if (allMenuItems.length > 0) {
          const lastSelectedMenuItem = allMenuItems[allMenuItems.length - 1];
          setIngredients(data[INGREDIENT][lastSelectedMenuItem.name]);
          setSelectedOptions([
            ...selectedOptions,
            {
              type: INGREDIENT,
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
      case AND:
        setSelectedOptions([
          ...selectedOptions,
          { type: AND, name: "", price: 0, menuItem: "" },
        ]);
        setSelectedType("");
        break;
      default:
        break;
    }
  };

  const handleMenuItemClick = (itemKey: string) => {
    const updatedSelectedOptions = [...selectedOptions];
    const menuItemPrice = data[MENU_ITEM][itemKey] || 0;
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
              label={<>{itemKey === AND ? "AND" : itemKey}</>}
            />
          </MenuItem>
        ));
      case MENU_ITEM:
        const filteredMenuItems = Object.keys(data[MENU_ITEM]).filter(
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
      case INGREDIENT:
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
            (item) => item.type === MENU_ITEM
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
