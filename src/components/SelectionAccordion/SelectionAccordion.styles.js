import styled from 'styled-components';

const SelectionAccordionWrapper = styled.div`

    flex: 1;
    padding-top: ${({ theme }) => theme.sizes.size_16};

    ${({ theme }) => theme.breakpoints.down('lg')} {
        margin-top: 0;
    }

    width: 100%;
    height: 100%;

    .MuiAccordionActions-root {

        justify-content: space-between;

    }
`;

export default SelectionAccordionWrapper;
