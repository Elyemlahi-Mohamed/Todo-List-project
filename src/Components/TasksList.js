import Container from "@mui/material/Container";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import { useState, useEffect, useMemo } from "react";
import { useSnackBar } from "../Contexts/SnackbarContext";

//=== CARD ===//
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Task from "./Task";
//=== CARD ===//

//=== MODAL ===//
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { useTask } from "../Contexts/TasksContext";
//=== MODAL ===//

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  background: "#233d4d",
  color: "white !important",
  padding: "20px 20px 15px 20px",
  border: "2px solid #1f7a8c",
  borderRadius: "3px",
};

export default function TasksList() {
  const { tasks, dispatch } = useTask();

  const [open, setOpen] = useState(false);
  const [alignment, setAlignment] = useState("all");
  const [inputTask, setInputTask] = useState({ title: "", description: "" });
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editTaskInput, setEditTaskInput] = useState({});
  const [taskIdEdit, setTaskIdEdit] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [taskIdDelete, setTaskIdDelete] = useState(null);
  const snackbarAlert = useSnackBar();

  //=== DELETE TASKS ===//
  const handleClickDeleteOpen = (task) => {
    setOpenDeleteModal(true);
    setTaskIdDelete(task);
  };

  const handleDeleteModalClose = () => {
    setOpenDeleteModal(false);
  };

  function handleDeleteTask() {
    dispatch({
      type: "delete",
      payload: {
        taskIdDelete: taskIdDelete,
      },
    });
    setOpenDeleteModal(false);
    snackbarAlert("The task was successfully deleted");
  }
  //=== DELETE TASKS ===//

  //=== EDIT TASKS ===//
  const handleClickEditOpen = (task) => {
    setOpenEditModal(true);
    setTaskIdEdit(task);
    setEditTaskInput({
      title: task.title,
      description: task.description,
    });
  };

  function closeModal() {
    setOpenEditModal(false);
  }

  function handleEditClick() {
    dispatch({
      type: "edit",
      payload: {
        taskIdEdit: taskIdEdit,
        editTitle: editTaskInput.title,
        editDescription: editTaskInput.description,
      },
    });
    setOpenEditModal(false);
    snackbarAlert("The task has been successfully edited");
  }

  //=== EDIT TASKS ===//

  //=== TOGGLE BTN TASKS ===//
  function handleChange(event) {
    setAlignment(event.target.value);
  }

  const unCompleteTasks = useMemo(() => {
    return tasks.filter((t) => {
      return !t.isComplete;
    });
  }, [tasks]);

  const completeTasks = useMemo(() => {
    return tasks.filter((t) => {
      return t.isComplete;
    });
  }, [tasks]);

  let reRenderTasks = tasks;
  if (alignment === "un-complete") {
    reRenderTasks = unCompleteTasks;
  } else if (alignment === "complete") {
    reRenderTasks = completeTasks;
  }

  //=== TOGGLE BTN TASKS ===//

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // handleAddFunction
  function handleAddNewTask() {
    dispatch({
      type: "add",
      payload: {
        title: inputTask.title,
        description: inputTask.description,
      },
    });
    handleClose();
    setInputTask({
      title: "",
      description: "",
    });
    snackbarAlert("The task was successfully added");
  }

  useEffect(() => {
    dispatch({ type: "getTasks" });
  }, []);

  return (
    <>
      {/*=== ADD TASK MODAL ===*/}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <IconButton
            onClick={handleClose}
            aria-label="delete"
            size="medium"
            style={{
              color: "white",
              position: "fixed",
              right: "0",
              top: "0",
              padding: "5px",
              borderRadius: "0",
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          <Typography
            variant="h5"
            style={{
              textAlign: "center",
              fontWeight: "600",
              color: "#fca311",
              letterSpacing: "2px",
            }}
          >
            ADD NEW TASK
          </Typography>
          <div
            style={{
              padding: "10px 0 0 0",
              margin: "0 10px 10px 0",
              textAlign: "center",
              borderRight: "2px solid #fca311",
              borderBottom: "2px solid #fca311",
            }}
          >
            <input
              placeholder="Title"
              className="input"
              value={inputTask.title}
              onChange={(e) => {
                setInputTask({ ...inputTask, title: e.target.value });
              }}
            ></input>
            <input
              placeholder="Description"
              className="input"
              value={inputTask.description}
              onChange={(e) => {
                setInputTask({ ...inputTask, description: e.target.value });
              }}
            ></input>
          </div>
          <div style={{ width: "100%", height: "50px" }}>
            <Button
              // disabled={!inputTask.title}
              onClick={handleAddNewTask}
              disabled={!inputTask.title}
              className="addTaskBtn"
              variant="contained"
              style={{
                display: "block",
                width: "30%",
                padding: "8px",
                margin: "15px auto 0",
                background: "#1f7a8c",
                boxShadow: "none",
              }}
            >
              Add
            </Button>
          </div>
        </Box>
      </Modal>
      {/*=== ADD TASK MODAL ===*/}

      {/*=== DELETE TASK MODAL  ===*/}
      <Modal
        open={openDeleteModal}
        onClose={handleDeleteModalClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openDeleteModal}>
          <Box sx={style}>
            <div
              style={{
                padding: "10px 0 0 15px",
                margin: "0 10px 10px 0",
                // textAlign: "center",
                borderLeft: "2px solid #fca311",
                borderBottom: "2px solid #fca311",
              }}
            >
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                style={{
                  padding: "0 8px 8px 0",
                  fontWeight: "900",
                }}
              >
                Do you sure you want to delete this task ?
              </Typography>
              <Typography
                id="transition-modal-description"
                variant="h6"
                sx={{
                  // paddingLeft: 1,
                  fontSize: 15,
                  marginBottom: 2,
                }}
              >
                You cannot undo the deletion after pressing the {}
                <span
                  style={{
                    color: "#fca311",
                  }}
                >
                  [delete]
                </span>{" "}
                button.
              </Typography>
            </div>
            <div
              style={{
                textAlign: "end",
                marginTop: "15px",
              }}
            >
              <Button
                onClick={handleDeleteModalClose}
                style={{
                  color: "white",
                }}
              >
                Back
              </Button>
              <Button
                className="confirmationBtn"
                onClick={handleDeleteTask}
                style={{
                  color: "#ffffff",
                  backgroundColor: "#011627",
                }}
              >
                Yes, Delete
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
      {/*=== DELETE TASK MODAL  ===*/}

      {/*=== EDIT MODAL ===*/}
      <Modal open={openEditModal} onClose={closeModal}>
        <Box sx={style}>
          <IconButton
            onClick={closeModal}
            aria-label="delete"
            size="medium"
            style={{
              color: "white",
              position: "fixed",
              right: "0",
              top: "0",
              padding: "5px",
              borderRadius: "0",
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          <Typography
            variant="h5"
            style={{
              textAlign: "center",
              fontWeight: "600",
              color: "#fca311",
              letterSpacing: "2px",
            }}
          >
            EDIT TASK
          </Typography>
          <div
            style={{
              padding: "10px 0 0 0",
              margin: "0 10px 10px 0",
              textAlign: "center",
              borderLeft: "2px solid #fca311",
              borderBottom: "2px solid #fca311",
            }}
          >
            <input
              placeholder="Title"
              className="input"
              value={editTaskInput.title}
              onChange={(e) => {
                setEditTaskInput({ ...editTaskInput, title: e.target.value });
              }}
            ></input>
            <input
              placeholder="Description"
              className="input"
              value={editTaskInput.description}
              onChange={(e) => {
                setEditTaskInput({
                  ...editTaskInput,
                  description: e.target.value,
                });
              }}
            ></input>
          </div>
          <div style={{ width: "100%", height: "50px" }}>
            <Button
              onClick={handleEditClick}
              className="addTaskBtn"
              variant="contained"
              style={{
                display: "block",
                width: "30%",
                padding: "8px",
                margin: "15px auto 0",
                background: "#1f7a8c",
                boxShadow: "none",
              }}
            >
              UPDATE
            </Button>
          </div>
        </Box>
      </Modal>
      {/*=== EDIT MODAL ===*/}

      <Container maxWidth="lg" style={{ margin: "60px 0 60px 0" }}>
        <h1
          className="appMainTitle"
          style={{
            fontSize: "50px",
            fontWeight: "900",
            marginBottom: "10px",
            padding: "15px",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Todo List Project ReactJs
        </h1>
        <Card sx={{ minWidth: 275, padding: 2 }} className="taskListCard">
          <CardContent sx={{ marginBottom: 3, padding: 0 }}>
            <Typography
              className="appSubTitle"
              variant="h1"
              sx={{
                fontSize: 14,
                padding: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <title
                style={{
                  fontSize: "30px",
                  textTransform: "uppercase",
                  fontWeight: "700",
                  margin: "0 auto",
                  color: "white",
                  display: "inline-block",
                }}
              >
                Daily Tasks
              </title>
              {/*=== add a new task btn ===*/}
              <Button
                onClick={handleClickOpen}
                className="newTaskBtn"
                variant="contained"
                startIcon={<ControlPointIcon />}
                style={{
                  marginRight: "10px",
                  background: "#011627",
                  padding: "8px 15px",
                }}
              >
                New Task
              </Button>
              {/*=== add a new task btn ===*/}
            </Typography>
          </CardContent>
          <div className="taskContainer">
            {reRenderTasks.map((task) => {
              return (
                <Task
                  key={task.id}
                  task={task}
                  openDeleteTask={handleClickDeleteOpen}
                  openEditTask={handleClickEditOpen}
                />
              );
            })}
          </div>
          <CardActions sx={{ justifyContent: "center", paddingTop: 3 }}>
            <ToggleButtonGroup
              color="warning"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton
                style={{
                  padding: "10px 15px",
                  color: "white",
                  border: "none",
                  borderRight: "1px solid",
                  borderColor: "white",
                  borderRadius: "0",
                }}
                value="all"
              >
                All
              </ToggleButton>
              <ToggleButton
                style={{
                  padding: "10px 15px",
                  color: "white",
                  border: "none",
                  borderRight: "1px solid",
                  borderColor: "white",
                  borderRadius: "0",
                }}
                value="un-complete"
              >
                UnComplete
              </ToggleButton>
              <ToggleButton
                style={{
                  padding: "10px 15px",
                  color: "white",
                  border: "none",
                  borderColor: "white",
                  borderRadius: "0",
                }}
                value="complete"
              >
                Complete
              </ToggleButton>
            </ToggleButtonGroup>
          </CardActions>
        </Card>
      </Container>
    </>
  );
}
