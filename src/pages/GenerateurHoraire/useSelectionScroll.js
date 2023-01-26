import { useEffect } from 'react';

const useSelectionScroll = (mainContentRef, selectionRef) => {
  const handleScroll = () => {
    if (mainContentRef?.current) {
      const { y } = mainContentRef.current.getBoundingClientRect();
      const navbar = document.getElementById('navbar');
      const navbarHeight = navbar.clientHeight;
      const spacing = 8;

      if (selectionRef?.current) {
        const element = selectionRef.current;
        // Scrolling above appbar
        if (y < navbarHeight - spacing) {
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
};

export default useSelectionScroll;
