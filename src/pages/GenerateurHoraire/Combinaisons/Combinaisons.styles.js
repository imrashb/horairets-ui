import styled from 'styled-components';

const CombinaisonsWrapper = styled.div`
    width: 100%;
    height: 100%;

    display:flex;
    flex-direction:column;
    align-items: center;

    .combinaisons-grid {
        width: 100%;
        padding: 0 ${({ theme }) => theme.sizes.size_24};
        & > .MuiGrid-item {

            &:not(:first-child) {
                .numero-horaire {
                    margin-top: ${({ theme }) => theme.sizes.size_24};
                }
            }

           .numero-horaire {


                white-space: nowrap;
                width: 16rem;
                margin-bottom: ${({ theme }) => theme.sizes.size_16};
                border-bottom: ${({ theme }) => theme.sizes.size_2} solid ${({ theme }) => theme.palette.grey[900]};
           }

            & > div {
                height: 75vh;
            }
        }

    }

    .MuiTablePagination-root {
        min-height: 4rem;
        display:flex;
    }

`;

export default CombinaisonsWrapper;
