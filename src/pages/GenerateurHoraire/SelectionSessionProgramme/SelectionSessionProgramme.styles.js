import styled from 'styled-components';

const SelectionSessionProgrammeWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & > * {
        flex: 1;
        margin: ${({ theme }) => theme.sizes.size_0} ${({ theme }) => theme.sizes.size_8} !important;
    }

`;

export default SelectionSessionProgrammeWrapper;
