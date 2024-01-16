import styled from 'styled-components';

const NewBadgeWrapper = styled.div`
   background-color: ${({ theme }) => theme.palette.badgeNew.main}; 
   border-radius: ${({ theme }) => theme.sizes.size_16};
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   text-align: center;
   width: min-content;
   color: ${({ theme }) => theme.palette.background.light};
   padding: ${({ theme }) => theme.sizes.size_2} ${({ theme }) => theme.sizes.size_8};
   margin: ${({ theme }) => theme.sizes.size_8};
`;

export default NewBadgeWrapper;
