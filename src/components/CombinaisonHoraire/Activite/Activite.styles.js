import styled from 'styled-components';

const ActiviteWrapper = styled.div`

    flex: ${(props) => `${props.flex}`};

    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: flex-start;
    overflow:hidden;
    .wrapper {

        display:flex;
        flex-direction:column;

        width:99%;
        height:100%;

        border-radius: ${({ theme }) => theme.sizes.size_16};
        border: ${({ theme }) => theme.sizes.size_2} solid ${(props) => `${props.borderColor}`};
        border-bottom: ${({ theme }) => theme.sizes.size_8} solid ${(props) => `${props.borderColor}`};
        border-top: none;
        
        padding: 3%;
        background: ${(props) => `${props.color}`};
        margin: ${({ theme }) => theme.sizes.size_0} ${({ theme }) => theme.sizes.size_2} ${({ theme }) => theme.sizes.size_2} ${({ theme }) => theme.sizes.size_4};
        margin-top: 0;

        text-shadow: #000 0px 2px 2px;
        -webkit-font-smoothing: antialiased;
    }

`;

export default ActiviteWrapper;
