import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

const StyledToastContainer = styled(ToastContainer)`
  // https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
  &&&.Toastify__toast-container {
    width: 32rem;
    max-width: 100%;
  }
  .Toastify__toast {
  }
  .Toastify__toast-body {
  }
  .Toastify__progress-bar {
  }
`;

export default StyledToastContainer;
