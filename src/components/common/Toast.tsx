import { ToastContainer, toast } from "react-toastify";

export const ToastMsg = ({ closeToast, toastProps }) => (
  <div>
    Lorem ipsum dolor {toastProps.position}
    <button>Retry</button>
    <button onClick={closeToast}>Close</button>
  </div>
);

export function Toastmessage() {
  const displayMsg = () => {
    toast(Msg);
  };

  return (
    <div>
      <button onClick={displayMsg}>Click me</button>
      <ToastContainer />
    </div>
  );
}