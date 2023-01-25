import styled from 'styled-components';

const SelectionCoursWrapper = styled.div`

    flex: 1;
    padding-top: ${({ theme }) => theme.sizes.size_16};
    width: 100%;
    height: 100%;

    .MuiAccordionActions-root {

        justify-content: space-between;

    }

`;

export default SelectionCoursWrapper;
