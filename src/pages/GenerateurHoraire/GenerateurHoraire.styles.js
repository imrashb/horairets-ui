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
            height: 100%;
        }

    }


`;

export default GenerateurHoraireWrapper;
