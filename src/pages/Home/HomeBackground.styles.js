import styled from 'styled-components';

const HomeBackgroundWrapper = styled.div`

    width: 100%;
    height: 100%;

    position: fixed;
    z-index: -1;
    overflow: hidden;

    @keyframes move {

        0% {
            transform: translate(-80vw, 0px) rotate(-30deg);
        }

        100% {
            transform: translate(0px, -95vh) rotate(-30deg);
        }

    }
    
    .opacity-gradient {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 1;
        background:radial-gradient(circle at 100% 150%, rgba(0, 0, 0, 0) 0%, ${({ theme }) => theme.palette.grey[50]} 75%);
    }

    .wrapper-home-background {
        animation: move 300s linear infinite;

        filter: blur(${({ theme }) => theme.sizes.size_4});

        height: 200%;
        width: 200%;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        & > div {
        width: 20%;
        height: 20%;
        padding: 0.5%;
        }
    }


`;

export default HomeBackgroundWrapper;
