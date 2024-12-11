import { createContext, useContext, useReducer } from "react";
import TasksReducer from "../Reducers/TasksReducer";

const TaskContext = createContext([]);

export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(TasksReducer, []);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  return useContext(TaskContext);
};
