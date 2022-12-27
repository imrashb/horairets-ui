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


`;

export default GlobalStyle;
