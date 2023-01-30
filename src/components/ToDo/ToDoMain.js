import classes from "./ToDoMain.module.css";
import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import { tasksActions } from "../../store/task-state";
import React ,{ useEffect, useState } from "react";

function ToDoMain() {
  const [taskText, setTaskText] = useState("");
  const [error] = useState("Task should be non-empty");
  const [isTouched, setIsTouched] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isTouched) {
      const timer = setTimeout(() => {
        setIsTouched(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
       }
    }

   
  }, [isTouched]);

  const tasksList = useSelector((state) => state.main.tasks);

  const changeHandler = ({ target }) => {
    setTaskText(target.value);
  };

  const blurHandler = () => {
    setIsTouched(true);
  };

  const taskAddHandler = (e) => {
    setIsTouched(true);
    e.preventDefault();
    if (isInvalid) {
      return;
    }

    dispatch(tasksActions.addTask(taskText));
    setIsTouched(false);
    setTaskText("");
  };

  const isInvalid = taskText.trim() === "";
  const hasError = isInvalid && isTouched;

  const loadedTasks = [];

  for (const task in tasksList) {
    loadedTasks.push(
      <Task title={tasksList[task].title} id={task} key={task} />
    );
  }


  return (
    <section className={classes["todo-form"]}>
      <form onSubmit={taskAddHandler}>
        <input
          type="text"
          onChange={changeHandler}
          onBlur={blurHandler}
          value={taskText}
        />
        <button type="submit">Add</button>
      </form>
      <p
        className={
          hasError
            ? classes["error-text"] + " " + classes.active
            : classes["error-text"]
        }
      >
        {error}
      </p>
      <div className={classes["task-holder"]}>{loadedTasks.length === 0 ? <p className="tasks-empty">There are no tasks, but you can always add one!</p> : loadedTasks}</div>
    </section>
  );
}

export default React.memo(ToDoMain);
