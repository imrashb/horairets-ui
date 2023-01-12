import styled from 'styled-components';

const GenerateurHoraireFiltersWrapper = styled.div`

    display: flex;
    flex-direction: row-reverse;
    align-items: center;

    background:${({ theme }) => theme.palette.grey[100]};

    min-height: ${({ theme }) => theme.sizes.size_64};
    height: ${({ theme }) => theme.sizes.size_64};
    margin-top: ${({ theme }) => theme.sizes.size_16};

    .views-wrapper {

        display: flex;
        flex-direction: row;
        align-items: center;

        padding-right: ${({ theme }) => theme.sizes.size_16};

        & > button {

            background:  ${({ theme }) => theme.palette.background.light};
                path {
                    fill: ${({ theme }) => theme.palette.primary.main};
                }

            &.Mui-selected {
                background: ${({ theme }) => theme.palette.primary.main};
                path {
                    fill: ${({ theme }) => theme.palette.background.light};
                }
            }

        }
    }

    .sort-wrapper {
        display:flex;
        flex-direction: row;
        align-items: center;

        .sort-dropdown {
            width: ${({ theme }) => theme.sizes.size_256};
            margin-right: ${({ theme }) => theme.sizes.size_16};
        }

        .sort-text {
            margin-right: ${({ theme }) => theme.sizes.size_16};
        }

    }

`;

export default GenerateurHoraireFiltersWrapper;
