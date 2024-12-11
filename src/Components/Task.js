import React from "react";
import { useTask } from "../Contexts/TasksContext";
import { useSnackBar } from "../Contexts/SnackbarContext";

//=== card ===//
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
//=== card ===//

//=== Icons ===//
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TodayIcon from "@mui/icons-material/Today";
//=== Icons ===//

export default function Task({ task, openDeleteTask, openEditTask }) {
  const { tasks, dispatch } = useTask();
  const snackbarAlert = useSnackBar();

  //=== HANDLERS ===//
  const handleClickOpen = () => {
    openDeleteTask(task);
  };

  function openModal() {
    openEditTask(task);
  }

  function handleCheckBtn() {
    dispatch({ type: "check", payload: task });
    snackbarAlert(task.isComplete ? "Task not completed" : " Task Completed");
  }
  //=== HANDLERS ===//

  return (
    <>
      <div>
        <Card className="taskCard">
          <CardContent
            style={{
              padding: "0 16px 16px 0",
              borderBottom: "1px solid #fca311",
              width: "100%",
            }}
          >
            <Typography
              variant="h4"
              style={{
                fontSize: "22px",
                fontWeight: "700",
                color: "#fca311",
                margin: "5px 0",
                wordBreak: "break-all",
              }}
            >
              {task.title}
            </Typography>
            <Typography
              variant="h6"
              style={{
                fontSize: "12px",
                fontWeight: "100",
                marginBottom: "15px",
                wordBreak: "break-all",
              }}
            >
              {task.description}
            </Typography>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#d1d2d3",
                  letterSpacing: "4px",
                }}
              >
                {task.date}
              </span>
              <TodayIcon
                fontSize="small"
                style={{
                  color: "d1d2d3",
                  fontSize: "17px",
                }}
              />
            </div>
            <Typography
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#d1d2d3",
                letterSpacing: "4px",
              }}
            >
              {task.time}
            </Typography>
          </CardContent>
          <CardActions
            style={{ borderLeft: "1px solid #fca311", padding: "0" }}
          >
            <Stack direction={"column"} spacing={5}>
              {/* Check Icon Btn */}
              <IconButton
                onClick={handleCheckBtn}
                className="checkBtn"
                style={{
                  backgroundColor: task.isComplete ? "#16d508" : "transparent",
                  color: "white",
                  border: "2px solid #16d508",
                  margin: "8px 0 8px 10px",
                  borderRadius: "10px",
                }}
              >
                <CheckIcon fontSize="small" />
              </IconButton>
              {/* Check Icon Btn */}

              {/* Edit Icon Btn */}
              <IconButton
                onClick={openModal}
                className="editBtn"
                style={{
                  backgroundColor: "#2196f3",
                  color: "white",
                  margin: "8px 0 8px 10px",
                  borderRadius: "10px",
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              {/* Edit Icon Btn */}

              {/* Delete Icon Btn */}
              <IconButton
                onClick={handleClickOpen}
                className="deleteBtn"
                style={{
                  backgroundColor: "#f44336",
                  color: "white",
                  margin: "8px 0 8px 10px",
                  borderRadius: "10px",
                }}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
              {/* DeleteDelete Icon Btn */}
            </Stack>
          </CardActions>
        </Card>
      </div>
    </>
  );
}
