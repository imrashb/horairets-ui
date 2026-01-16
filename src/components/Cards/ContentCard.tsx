import { Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface ContentCardProps {
  icon: ReactNode;
  title: string;
  titleActions?: ReactNode;
  children: ReactNode;
}

function ContentCard({
  icon,
  title,
  titleActions,
  children,
}: ContentCardProps): JSX.Element {
  return (
    <>
      <Header>
        <Typography
          variant="h6"
          className="card-title"
          sx={{
            mb: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          {icon}
          {title}
        </Typography>
        {titleActions}
      </Header>
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </>
  );
}

export default ContentCard;
