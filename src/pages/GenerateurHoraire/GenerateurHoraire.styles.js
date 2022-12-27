import styled from 'styled-components';

const GenerateurHoraireWrapper = styled.div`

    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;

    padding: ${({ theme }) => theme.sizes.size_8} ${({ theme }) => theme.sizes.size_24};

    .title-wrapper {
        font-size: ${({ theme }) => theme.sizes.size_64};
        font-weight: 600;

        .text-shadow {
            position: absolute;
            z-index: -1;
            background: transparent;
            color: transparent;
            text-shadow: ${({ theme }) => theme.shadows.main};
        }
        border-bottom: ${({ theme }) => theme.sizes.size_2} solid ${({ theme }) => theme.palette.grey[300]};
    }
 
    .main-content-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 100%;


        .left {
            flex: 1;

            height: 100%;

            display:flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;

        }

        .right {
            flex: 2;
        }

    }


`;

export default GenerateurHoraireWrapper;
