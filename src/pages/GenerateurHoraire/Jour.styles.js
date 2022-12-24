import styled from 'styled-components';

const JourWrapper = styled.div`
    height:100%;
    display:flex;
    flex-direction:column;

    .nom-jour {
        text-align: center;
        border-bottom: ${({ theme }) => theme.sizes.size_1} solid ${({ theme }) => theme.palette.grey[700]};
    }
    .activite {
        width:100%;
        background:blue;
    }

    .classes-wrapper {
        height: 100%;
        display:flex;
        flex-direction:column;
        .periode {
            flex: 1;
        }

        background-image:
        linear-gradient(to bottom, white ${({ theme }) => theme.sizes.size_1}, transparent ${({ theme }) => theme.sizes.size_1}),
        linear-gradient(to right, white ${({ theme }) => theme.sizes.size_2}, transparent ${({ theme }) => theme.sizes.size_1});
        background-size: 99% 3.33333%;
    }

`;

export default JourWrapper;
