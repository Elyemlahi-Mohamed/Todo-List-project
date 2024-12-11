import "./App.css";
import TasksList from "./Components/TasksList";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { TaskProvider } from "./Contexts/TasksContext";
import { SnackbarProvider } from "./Contexts/SnackbarContext";

const theme = createTheme({
  typography: {
    fontFamily: ["montserrat"],
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TaskProvider>
        <SnackbarProvider>
          <div
            style={{
              color: "white",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TasksList />
          </div>
        </SnackbarProvider>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;
