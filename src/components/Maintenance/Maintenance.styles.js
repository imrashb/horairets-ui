import styled from 'styled-components';

const MaintenanceWrapper = styled.div`

    @keyframes backgroundOpacity {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000000000;
    background: rgba(0,0,0,0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: backgroundOpacity 1s ease-in-out;

    & > * {
        margin-bottom: ${({ theme }) => theme.sizes.size_32};
        text-align: center;
        
    }


`;

export default MaintenanceWrapper;
