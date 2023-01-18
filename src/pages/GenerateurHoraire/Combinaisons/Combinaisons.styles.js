import styled from 'styled-components';

const CombinaisonsWrapper = styled.div`
    width: 100%;
    height: 100%;

    .combinaisons-grid {
        width: 100%;
        padding: ${({ theme }) => theme.sizes.size_24};

        & > .MuiGrid-item {
            & > div {
                height: 50vh;
            }
        }

    }

`;

export default CombinaisonsWrapper;
