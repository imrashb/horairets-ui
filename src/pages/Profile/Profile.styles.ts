import styled from "styled-components";

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 64px);

  .profile-banner {
    position: relative;
    height: 200px;
    overflow: hidden;

    @media (max-width: 600px) {
      height: 150px;
    }

    .banner-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60%;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
      pointer-events: none;
      z-index: 1;
    }
  }

  .profile-header {
    position: relative;
    padding: 0 24px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media (max-width: 600px) {
      padding: 0 16px 16px;
    }

    .avatar-container {
      margin-top: -60px;
      z-index: 10;

      @media (max-width: 600px) {
        margin-top: -40px;
      }

      .profile-avatar {
        width: 120px;
        height: 120px;
        border: 4px solid ${({ theme }) => theme.palette.background.default};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

        @media (max-width: 600px) {
          width: 80px;
          height: 80px;
          border-width: 3px;
        }
      }
    }

    .user-info {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .display-name {
        font-weight: 600;
      }

      .email {
        opacity: 0.7;
      }
    }
  }

  .profile-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 24px;
    padding: 0 24px 24px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }

    @media (max-width: 600px) {
      padding: 0 16px 16px;
      gap: 16px;
    }
  }

  .profile-section {
    background: ${({ theme }) => theme.palette.background.paper};
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .section-title {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
      font-weight: 600;
    }

    .section-content {
      color: ${({ theme }) => theme.palette.text.secondary};
    }

    .semester-item {
      padding: 12px;
      margin-bottom: 8px;
      background: ${({ theme }) => theme.palette.action.hover};
      border-radius: 8px;

      &:last-child {
        margin-bottom: 0;
      }

      .semester-name {
        font-weight: 500;
        margin-bottom: 4px;
      }

      .semester-courses {
        font-size: 0.875rem;
        opacity: 0.8;
      }
    }
  }

  .mobile-edit-notice {
    display: none;
    padding: 16px;
    margin: 0 16px 16px;
    background: ${({ theme }) => theme.palette.warning.main}20;
    border: 1px solid ${({ theme }) => theme.palette.warning.main};
    border-radius: 8px;
    text-align: center;
    color: ${({ theme }) => theme.palette.warning.main};

    @media (max-width: 600px) {
      display: block;
    }
  }
`;

export default ProfileWrapper;
