import { Chip } from "@mui/material";
import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Reciept = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 2.5em;
`;

export const BoldP = styled.p`
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