import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import ToDoMain from "./components/ToDo/ToDoMain";
import Card from "./components/UI/Card";
import { sendTasks, fetchTasks } from "./store/task-action";

let isInit = true;

function App() {
  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.loading.isLoading)

  const tasksList = useSelector((state) => state.main.tasks);
  const changed = useSelector((state) => state.main.changed);

  useEffect(() => {
    console.log("loading tasks from server");
    dispatch(fetchTasks());
    isInit = true;
  }, [dispatch]);

  useEffect(() => {
    if (isInit) {
      console.log("isInit to false");
      isInit = false;
      return;
    }

    console.log(changed);

    if (changed) {
      console.log("Data were sent to database from app.js");
      dispatch(sendTasks(tasksList));
    }
  }, [dispatch, tasksList, changed]);

  return (
    <Fragment>
      <main>
        <Card>
          <h1>To Do List</h1>

          <ToDoMain /> 
          {isLoading &&  <p className="loading">Loading tasks</p>}
        </Card>
      </main>
    </Fragment>
  );
}

export default App;
