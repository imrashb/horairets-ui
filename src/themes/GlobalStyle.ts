import { Theme } from "@mui/material/styles";
import { createGlobalStyle } from "styled-components";

// Helper to access theme strongly typed if we wanted, but here styled-components inference works with module augmentation
const GlobalStyle = createGlobalStyle`

    body {

        #root {
            height:100%;
            display:flex;
            flex-direction:column;
        }

    }
    
    * {
        box-sizing: border-box
    }

    @keyframes shine {
        to {
        background-position: 200% center;
        }
    }

    .horairets-animated-text {
        background: linear-gradient(to right, ${({ theme }) =>
          (theme as Theme).palette.primary.light},${({ theme }) =>
  (theme as Theme).palette.primary.main}, ${({ theme }) =>
  (theme as Theme).palette.primary.light});
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        background-size: 200% auto;
        animation: shine 5s linear infinite;
    }

    .horairets-animated-background {


        &:hover {
            background: ${({ theme }) =>
              (theme as Theme).palette.primary.main} };


        background: linear-gradient(to right, ${({ theme }) =>
          (theme as Theme).palette.primary.light},${({ theme }) =>
  (theme as Theme).palette.primary.main}, ${({ theme }) =>
  (theme as Theme).palette.primary.light});
        background-size: 200% auto;
        animation: shine 5s linear infinite;
    }

    ::-webkit-scrollbar {
        width: ${({ theme }) => (theme as Theme).sizes?.size_10};
    }

    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 ${({ theme }) =>
          (theme as Theme).sizes?.size_6} ${({ theme }) =>
  (theme as Theme).palette.grey[50]}; 
        border-radius: ${({ theme }) => (theme as Theme).sizes?.size_8};
        margin: ${({ theme }) => (theme as Theme).sizes?.size_8} ${({
  theme,
}) => (theme as Theme).sizes?.size_0};
    }

    ::-webkit-scrollbar-thumb {
        border-radius: ${({ theme }) => (theme as Theme).sizes?.size_8};
        background: ${({ theme }) => (theme as Theme).palette.primary.main};
        box-shadow: inset 0 0 ${({ theme }) =>
          (theme as Theme).sizes?.size_4} ${({ theme }) =>
  (theme as Theme).palette.grey[50]}; 
    }

`;

export default GlobalStyle;
