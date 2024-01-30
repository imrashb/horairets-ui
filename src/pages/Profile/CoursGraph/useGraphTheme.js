import { darkTheme } from 'reagraph';

import { useTheme } from 'styled-components';

const useGraphTheme = () => {
  const theme = useTheme();
  return {
    ...darkTheme,
    node: {
      ...darkTheme.node,
      fill: theme.palette.grey[900],
      activeFill: theme.palette.primary.main,
      opacity: 1,
      selectedOpacity: 1,
      inactiveOpacity: 1,
      label: {
        ...darkTheme.node.label,
        color: theme.palette.grey[900],
        activeColor: theme.palette.primary.main,
      },
    },
    edge: {
      ...darkTheme.edge,
      opacity: 1,
      selectedOpacity: 1,
      inactiveOpacity: 1,
      label: {
        ...darkTheme.edge.label,
        color: theme.palette.grey[900],
        activeColor: theme.palette.primary.main,
      },
      activeFill: theme.palette.grey[900],
      fill: theme.palette.grey[900],
    },
    ring: {
      fill: theme.palette.primary.dark,
      activeFill: theme.palette.primary.main,
    },
    arrow: {
      fill: theme.palette.grey[900],
      activeFill: theme.palette.grey[900],
    },
    canvas: {
      ...darkTheme.canvas,
      background: theme.palette.grey[50],
    },
  };
};

export default useGraphTheme;
