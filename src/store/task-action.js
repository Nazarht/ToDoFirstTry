import { tasksActions } from "./task-state";
import { loadingActions } from "./loading";

function removeEmpty(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
  }


export const sendTasks = (taskList) => {
  return async () => {
    const fetchData = async() => {
        const response = await fetch('https://to-do-app-d54b2-default-rtdb.firebaseio.com/tasks.json', {
            method: 'PUT',
            body: JSON.stringify(taskList)
        })

        console.log('tasks that are being sent to database:')
        console.log(taskList)
        if (!response.ok) {
            throw new Error('Something went wrong!')
        }
    };

    try {
       await fetchData()
    } catch (er) {
        console.log('error');
    }
  };
};

export const fetchTasks = () => {
    return  async(dispatch) => {

        const fetchData = async() => {
            const response = await fetch('https://to-do-app-d54b2-default-rtdb.firebaseio.com/tasks.json');
            if (!response.ok) {
                throw new Error('Huston we have a problem');
            }
            const result = await response.json(); 

            const newRes = removeEmpty(result)

            return newRes;
        } 


        try {
            dispatch(loadingActions.toggleLoadingOn());
            const tasksLoaded  =  await fetchData();
            console.log('tasks that are loaded from database:')
            console.log(tasksLoaded)
            dispatch(tasksActions.replaceTasks(tasksLoaded))
            dispatch(loadingActions.toggleLoadingOff())
        } catch (error) {
            console.log(error);
        }   
     }
}


