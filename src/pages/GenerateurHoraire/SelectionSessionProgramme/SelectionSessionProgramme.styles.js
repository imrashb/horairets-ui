import styled from 'styled-components';

const SelectionSessionProgrammeWrapper = styled.div`
    width: 100%;
    padding-top: ${({ theme }) => theme.sizes.size_16};
    .selection-wrapper {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .MuiSelect-select {
            display:flex;
            flex-direction: row;
            align-items: center;
        }

        & > * {
            flex: 1;
            margin: ${({ theme }) => theme.sizes.size_0} ${({ theme }) => theme.sizes.size_8} !important;
        }
    }

    .MuiSvgIcon-root {
        margin-left: ${({ theme }) => theme.sizes.size_8};
    }

`;

export default SelectionSessionProgrammeWrapper;
