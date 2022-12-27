import styled from 'styled-components';

const NavBarWrapper = styled.div`


    .MuiToolbar-root {
        justify-content: space-between;


        & > div {

            display:flex;
            align-items: center;

            &.navbar-left {
                flex: 2;
            }

            &.navbar-right {
                flex: 2;
                flex-direction: row-reverse;
            }

            &.navbar-center {
                flex:5;
                justify-content: center;

                .MuiTabs-flexContainer {
                    justify-content: center;

                    .MuiTab-root {
                        flex-direction: row;
                        align-items: center;
                    }

                }

            }

            .logo-horairets {
                width: ${({ theme }) => theme.sizes.size_32};
                height: ${({ theme }) => theme.sizes.size_32};
                margin-right: ${({ theme }) => theme.sizes.size_16};
            }
        }

    }


`;

export default NavBarWrapper;
