import styled from 'styled-components';

const SelectionCoursWrapper = styled.div`

    flex: 1;
    padding-top: ${({ theme }) => theme.sizes.size_16};
    width: 100%;
    height: 100%;

    .MuiSvgIcon-root {
        margin-left: ${({ theme }) => theme.sizes.size_8};
    }

`;

export default SelectionCoursWrapper;
