import styled from "styled-components";

export const AboutWrapper = styled.div`
  min-height: calc(100vh - 64px);
  padding: 32px 16px;
  background: linear-gradient(180deg, rgba(25, 118, 210, 0.05) 0%, transparent 50%);
`;

export const AboutContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  padding: 32px 0;

  .logo-row {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .logo {
    width: 80px;
    height: 80px;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }

  .subtitle {
    max-width: 500px;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const LinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
`;

export const LinkCard = styled.a`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: 12px;
  background: ${({ theme }) => theme.palette.background.paper};
  border: 1px solid ${({ theme }) => theme.palette.divider};
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    border-color: ${({ theme }) => theme.palette.primary.main};
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    min-width: 48px;
    min-height: 48px;
    flex-shrink: 0;
    border-radius: 12px;
    font-size: 24px;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

export const ContributorsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const ContributorChip = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  background: ${({ theme }) => theme.palette.background.paper};
  border: 1px solid ${({ theme }) => theme.palette.divider};
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.palette.primary.main};
    background: ${({ theme }) => theme.palette.action.hover};
  }

  .avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
`;
