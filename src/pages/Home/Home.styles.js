import styled from 'styled-components';

const HomeWrapper = styled.div`
    display:flex;
    flex-direction: row;
    height:100%;
    .left {
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin-top: ${({ theme }) => theme.sizes.size_64};

        flex:2;

        .body-bienvenue {
            color: ${({ theme }) => theme.palette.primary.main};
        }

        .body-horairets {
            margin-top: ${({ theme }) => theme.sizes.size_32};
            font-size: 12vw;
            height: auto;
            display:flex;
            flex-direction:column;
            align-items: center;
            text-align: center;

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

            .description {
                color: ${({ theme }) => theme.palette.primary.dark};
                margin-top: -4vw;
                font-size: 2vw;
                text-align: justify;
                width:100%;
            }

        }

        .btn-wrapper {
            width:100%;
            display:flex;
            flex-direction: row;
            align-items: flex-start;
            margin-top: ${({ theme }) => theme.sizes.size_16};

            .btn-rejoins-discord {
                margin-left: ${({ theme }) => theme.sizes.size_16};
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
            margin-top: ${({ theme }) => theme.sizes.size_64}
        }

    }

`;

export default HomeWrapper;
