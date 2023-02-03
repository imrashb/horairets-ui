import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import { useEffect, useRef } from 'react';

const useSelectionScroll = (mainContentRef, selectionRef) => {
  const theme = useTheme();
  const isLargeViewport = useMediaQuery(theme.breakpoints.up('lg'));
  const isLargeViewportRef = useRef(isLargeViewport);

  const handleScroll = () => {
    if (mainContentRef?.current) {
      const { y } = mainContentRef.current.getBoundingClientRect();
      const navbar = document.getElementById('navbar');
      const navbarHeight = navbar.clientHeight;
      const spacing = 8;

      if (selectionRef?.current) {
        const element = selectionRef.current;
        // Scrolling above appbar
        if (isLargeViewportRef.current && y < navbarHeight - spacing) {
          const mainElement = document.getElementById('main-container');
          const margin = (mainElement.scrollTop - 150) / 8;
          element.style.marginTop = `${margin}rem`;
        } else {
          element.style.marginTop = 0;
        }
      }
    }
  };

  useEffect(() => {
    const element = document.getElementById('main-container');
    element.addEventListener('scroll', handleScroll);

    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    isLargeViewportRef.current = isLargeViewport;
    handleScroll();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLargeViewport]);
};

export default useSelectionScroll;
