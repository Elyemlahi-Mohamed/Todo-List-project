import { createContext, useContext, useState } from "react";
import AppSnackBar from "../Components/AppSnackBar";

const SnackbarContext = createContext("");

export const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showAlert(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }

  return (
    <SnackbarContext.Provider value={showAlert}>
      <AppSnackBar open={open} alertMessage={message} />
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackBar = () => {
  return useContext(SnackbarContext);
};
