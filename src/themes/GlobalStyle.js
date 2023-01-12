import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

    body {
        height: 100vh;
        min-height: 100vh;

        #root {
            height:100%;
            display:flex;
            flex-direction:column;
            overflow: hidden;
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
        background: linear-gradient(to right, ${({ theme }) => theme.palette.primary.light},${({ theme }) => theme.palette.primary.main}, ${({ theme }) => theme.palette.primary.light});
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        background-size: 200% auto;
        animation: shine 10s linear infinite;
    }

    .horairets-animated-background {


        &:hover {
            background: ${({ theme }) => theme.palette.primary.main} };


        background: linear-gradient(to right, ${({ theme }) => theme.palette.primary.light},${({ theme }) => theme.palette.primary.main}, ${({ theme }) => theme.palette.primary.light});
        background-size: 200% auto;
        animation: shine 10s linear infinite;
    }

    ::-webkit-scrollbar {
        width: ${({ theme }) => theme.sizes.size_10};
    }

    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 ${({ theme }) => theme.sizes.size_6} ${({ theme }) => theme.palette.grey[50]}; 
        border-radius: ${({ theme }) => theme.sizes.size_8};
        margin: ${({ theme }) => theme.sizes.size_8} ${({ theme }) => theme.sizes.size_0};
    }

    ::-webkit-scrollbar-thumb {
        border-radius: ${({ theme }) => theme.sizes.size_8};
        background: ${({ theme }) => theme.palette.primary.main};
        box-shadow: inset 0 0 ${({ theme }) => theme.sizes.size_4} ${({ theme }) => theme.palette.grey[50]}; 
    }

`;

export default GlobalStyle;
