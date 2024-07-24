class TaskManager {
  tasks: Task[];

  constructor() {
    this.tasks = [];
  }

  addTask(task: string, priority: string, dueDate: string): void {
    this.tasks.push(new Task(task, "incomplete", priority, dueDate));
  }

  listTasks(): void {
    console.log(this.tasks);
  }

  completeTask(index: number): void {
    this.tasks[index].status = "completed";
  }

  deleteTask(index: number): void {
    this.tasks.splice(index);
  }

  deleteAllTasks(): void {
    this.tasks.splice(0, this.tasks.length);
  }

  filterTasks(status: string): Task[] {
    return this.tasks.filter((x) => x.status === status);
  }
}

class Task {
  name: string;
  status: string;
  priority: string;
  dueDate: string;

  constructor(name: string, status: string, priority: string, dueDate: string) {
    this.name = name;
    this.status = status;
    this.priority = priority;
    this.dueDate = dueDate;
  }
}

export default TaskManager;
