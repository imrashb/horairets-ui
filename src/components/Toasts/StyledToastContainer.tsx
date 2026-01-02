import { ToastContainer } from "react-toastify";
import styled from "styled-components";

const StyledToastContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
    width: 32rem;
    max-width: 100%;
  }
  .Toastify__toast {
  }
  .Toastify__toast-body {
    font-family: Titillium Web, sans-serif !important;
  }
  .Toastify__progress-bar {
  }
`;

export default StyledToastContainer;
