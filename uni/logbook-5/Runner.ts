import TaskManager from "./TaskManager";

//Create new task manager
const taskManager = new TaskManager();
//Add tasks
taskManager.addTask("Buy groceries", "high", "2021-12-31");
taskManager.addTask("Read a book", "low", "2021-12-31");
taskManager.addTask("Write code", "medium", "2021-12-31");

//List tasks
taskManager.listTasks();

//Mark tasks as completed
taskManager.completeTask(1);

//Delete a task
taskManager.deleteTask(2);

//Filter completed tasks
const completedTasks = taskManager.filterTasks("completed");
console.log(completedTasks);
