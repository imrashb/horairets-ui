import styled from 'styled-components';

const ProfileWrapper = styled.div`

    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height:100%;
    overflow: hidden;

    .background {
        width: 100%;
        height: 10rem;
        overflow: hidden;
        position: relative;

        .home-background-wrapper {
            transform: translateY(-32rem)
        }

    }       
    
   
   .profile-content {
         display:flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
         width:100%;
         border-top: ${({ theme }) => theme.sizes.size_8} solid ${({ theme }) => theme.palette.grey[800]};
        
        .profile-header {
            align-self: flex-start;
            display:flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            width: 20rem;
            padding-left: ${({ theme }) => theme.sizes.size_32};
            transform: translateY(-4rem);

            .display-name {
                margin-top: ${({ theme }) => theme.sizes.size_8};
            }

            .edit-profile-btn {
                margin-top: ${({ theme }) => theme.sizes.size_16};
            }
        }

   }

`;

export default ProfileWrapper;
