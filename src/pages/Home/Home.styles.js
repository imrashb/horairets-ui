import styled from 'styled-components';

const HomeWrapper = styled.div`

    @keyframes slide {
        from {
            transform: translateY(-30vh);
        }

        to {
            transform: none;
        }
    }

    @keyframes opacity {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    .left, .right {
        animation: 0.5s slide ease, 1s opacity ease;
    }

    .home-background-wrapper {
        animation: 2s opacity ease;
    }

    display:flex;
    flex-direction: row;
    height:100%;
    overflow: hidden;
    .left {
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin-top: ${({ theme }) => theme.sizes.size_64};
        flex:2;

        ${({ theme }) => theme.breakpoints.down('md')} {
            margin-top: ${({ theme }) => theme.sizes.size_32} !important;
        }

        .body-bienvenue {
            color: ${({ theme }) => theme.palette.primary.main};
            text-shadow: ${({ theme }) => theme.textShadow.main};
        }

        .body-horairets {
            margin-top: ${({ theme }) => theme.sizes.size_32};
            font-size: 12vw;
            height: auto;
            display:flex;
            flex-direction:column;
            align-items: center;
            text-align: center;

            ${({ theme }) => theme.breakpoints.down('md')} {
                font-size:16vw;
                
                .description {
                    font-size: 4vw !important;
                }
            }

            .horairets-wrapper {
                width: fit-content;
            }

            .horairets-animated-text {
                font-family: "Fugaz One"
            }
            .ets {
                font-family: "Fugaz One";
                color: ${({ theme }) => theme.palette.primary.ets};
            }

            .text-shadow {
                position:absolute;
                font-family: "Fugaz One";
                text-shadow: black 0.5vw 1.5vw 1vw;
                color: transparent;
                z-index: -1;
            }

            .description {
                color: ${({ theme }) => theme.palette.primary.dark};
                margin-top: -4vw;
                font-size: 2vw;
                text-align: justify;
                width:100%;
                text-shadow: black 0.25vw 0.25vw 0.5vw;
            }

        }

        .btn-wrapper {
            width:100%;
            display:flex;
            flex-direction: row;
            align-items: flex-start;
            margin-top: ${({ theme }) => theme.sizes.size_16};

            .horairets-animated-background {
                font-family: "Fugaz One";
            }

            .btn-rejoins-discord {
                margin-left: ${({ theme }) => theme.sizes.size_16};
            }

            ${({ theme }) => theme.breakpoints.down('md')} {
                flex-direction: column !important;

                .btn-rejoins-discord {
                    margin-left: 0;
                    margin-top: ${({ theme }) => theme.sizes.size_8};
                }

            }

        }

    }

    .right {
        flex:1;
        display:flex;
        flex-direction:column;
        align-items: center;
        justify-content:flex-start;
        .logo-horairets {
            margin-top: 25%;
            width: 80%;
        }

    }

`;

export default HomeWrapper;
