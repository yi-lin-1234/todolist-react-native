import axios from "axios";

// Create an instance of Axios with default configuration options, including a base URL for all requests

//production
const instance = axios.create({
  baseURL: "http://yilin321.com/api/v1",
});

//local development
// const instance = axios.create({
//   baseURL: "http://localhost:8080/api/v1",
// });

// POST request to create a new task
export const createTask = async (body) => {
  try {
    await instance.post("/task", body);
  } catch (err) {
    console.log(err);
  }
};

// GET request to retrieve a task by ID
export const getTaskById = async (id) => {
  try {
    const response = await instance.get(`/task/id/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// GET request to retrieve all finished tasks
export const getAllfinishedTasks = async () => {
  try {
    const response = await instance.get("/task/finished");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// GET request to retrieve all unfinished tasks
export const getAllUnfinishedTasks = async () => {
  try {
    const response = await instance.get("/task/unfinished");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// GET request to retrieve sorted task data based on a specified sorting order
export const getSortedData = async (sortBy, order) => {
  try {
    const response = await instance.get(`/task/sort_by_${sortBy}_${order}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// PUT request to update the status of a task to "finished"
export const updateStatusToFinished = async (id) => {
  try {
    await instance.put(`/task/update_to_finished/${id}`, {});
  } catch (err) {
    console.log(err);
  }
};

// PUT request to update the content of a task
export const updateTask = async (id, body) => {
  try {
    await instance.put(`/task/update_task_content/${id}`, body);
  } catch (err) {
    console.log(err);
  }
};

// DELETE request to delete a task by ID
export const deleteTask = async (id) => {
  try {
    await instance.delete(`task/${id}`);
  } catch (err) {
    console.log(err);
  }
};

// DELETE request to delete all tasks
export const deleteAllTask = async () => {
  try {
    await instance.delete("/task/deleteAll");
  } catch (err) {
    console.log(err);
  }
};
