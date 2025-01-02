export interface ITask {
  id: number;
  display_name: string;
  due_by: string;
}

export interface ICreateTask {
  display_name: string;
}
