import { CircularProgress } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import HorairetsLogo from "../HorairetsLogo/HorairetsLogo";

const LoaderWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.background.default};
  z-index: 9999;
  gap: 32px;
`;

interface FullPageLoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
}

function FullPageLoader({ isLoading, children }: FullPageLoaderProps): JSX.Element {
  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoaderWrapper
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <HorairetsLogo fontSize="4rem" mobileFontSize="3rem" />
            <CircularProgress size={48} thickness={4} />
          </LoaderWrapper>
        )}
      </AnimatePresence>
      <div style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.5s ease" }}>
        {children}
      </div>
    </>
  );
}

export default FullPageLoader;

