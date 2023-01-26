import styled from 'styled-components';

const GenerateurHoraireWrapper = styled.div`

    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;

    padding: ${({ theme }) => theme.sizes.size_8} ${({ theme }) => theme.sizes.size_24};

    .title {

        text-shadow: ${({ theme }) => theme.textShadow.main};

    }
 
    .main-content-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        position: relative;

        .left {
            position:relative;
            flex: 1;
            height: 100%;
            max-width: 33.3333333vw;
            display:flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;

            .expand-btn {
                position: absolute;
                top: ${({ theme }) => theme.sizes.size_16};
                right: -${({ theme }) => theme.sizes.size_40};
                opacity: 1;
                border-radius: 0;
            }

            @keyframes slide {
                0% {
                    margin-left: 0;
                }

                100% {
                    margin-left: -33.3333333vw;
                }
            }

            @keyframes inverseSlide {
                0% {
                    margin-left: -33.3333333vw;
                }
                100% {
                    margin-left: 0;
                }
            }

            & > div {
                transition: opacity 0.3s ease-in-out;
            }

            &.closed {
                animation: 0.3s slide ease-in-out forwards; 
                & > div {
                    opacity: 0;
                }
            }

            &.open {
                animation: 0.3s inverseSlide ease-in-out forwards;
                & > div {
                    opacity: 1;
                }
            }

        }

        .right {
            flex: 2;
            height: 100%;
        }

    }


`;

export default GenerateurHoraireWrapper;
