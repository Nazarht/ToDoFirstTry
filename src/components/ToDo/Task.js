import classes from "./Task.module.css";
import { useDispatch } from "react-redux";
import { tasksActions } from "../../store/task-state";

function Task(props) {
  const dispatch = useDispatch();

  const { id } = props;

  const removeHandler = () => {
    dispatch(tasksActions.removeTask(id))
  };

  return (
    <div className={classes["task-box"]}>
        <h2>{props.title}</h2>
      <button onClick={removeHandler}>Remove</button>
    </div>
  );
}

export default Task;
