export type Company = {
  name: string;
  description: string;
  image: string;
};

export type Todo = {
  id: number;
  title: string;
  contents: string;
  isDone: boolean;
};

export type NewTodo = {
  title: string;
  contents: string;
};
