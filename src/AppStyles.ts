import styled from "styled-components";
import background from "./bg.jpg";
import {
    FormControl,
    IconButton,
} from "@mui/material";

export const Wrapper = styled.div`
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

export const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 2fr;
`;

export const Space = styled.div`
  display: block;
`;

export const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7em;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
  width: 100%;
  justify-content: center;
`;

export const FormWrapper = styled(FormControl)`
  min-width: 38em !important;
  .MuiInputBase-root {
    background-color: white !important;
    border-radius: 0 !important;
    height: 2.5em;
    &.Mui-focused {
      border: 0.5px solid #ff4377cc;
    }
    &.MuiInput-root {
      &:before {
        border: none !important;
      }
      &:after {
        border: none !important;
      }
    }
  }
  position: relative;
`;

export const RecieptTitle = styled.span`
  padding-left: 1.5em;
`;

export const CompleteButton = styled(IconButton)`
  position: absolute !important;
  right: 11em;
  top: 13.3em;
  color: #099d09 !important;
`;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      borderRadius: 0,
      marginTop: ".5em",
    },
  },
};