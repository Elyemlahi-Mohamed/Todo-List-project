import { v4 as uniqueId } from "uuid";

let date = new Date();
let todayDate = date.toLocaleDateString();
let current_time = date.getHours() + ":" + date.getMinutes();

export default function Reducer(currentTasks, action) {
  switch (action.type) {
    case "add": {
      let newTask = {
        id: uniqueId(),
        title: action.payload.title,
        description: action.payload.description,
        date: todayDate,
        time: current_time,
        isComplete: false,
      };

      const newTasks = [...currentTasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    }

    case "delete": {
      const deleteTasks = currentTasks.filter((t) => {
        return t.id !== action.payload.taskIdDelete.id;
      });
      localStorage.setItem("tasks", JSON.stringify(deleteTasks));
      return deleteTasks;
    }

    case "edit": {
      const updateTasks = currentTasks.map((t) => {
        if (t.id === action.payload.taskIdEdit.id) {
          return {
            ...t,
            title: action.payload.editTitle,
            description: action.payload.editDescription,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("tasks", JSON.stringify(updateTasks));
      return updateTasks;
    }

    case "getTasks": {
      const localStorageTasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
      return localStorageTasks;
    }

    case "check": {
      const checkTasks = currentTasks.map((t) => {
        console.log(t)
        if (t.id == action.payload.id) {
          return { ...t, isComplete: !t.isComplete };
        }
        return t;
      });
      localStorage.setItem("tasks", JSON.stringify(checkTasks));
      return checkTasks;
    }

    default: {
      throw Error("Unknown action" + action.type);
    }
  }
}
