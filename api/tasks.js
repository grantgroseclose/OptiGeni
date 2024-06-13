import client from "./client";

const endpoint = "/tasks";
const deleteEndpoint = "/tasks/delete";

const getTasks = () => client.get(endpoint);

const addTask = ({title, deadline, priority, executionTime}) => {
    let data = new FormData();
    data.append('title', title);
    data.append('deadline', deadline);
    data.append('priority', priority);
    data.append('executionTime', executionTime);

    return client.post(endpoint, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }
    });
}

const deleteTask = ({ _id }) => {
    return client.delete(deleteEndpoint, {
        id: _id
    });
}

export default {
  getTasks,
  addTask,
  deleteTask
};
