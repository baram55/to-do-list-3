export type CompanyInfo = {
  name: string;
  description: string;
};

export type Todo = {
  id: string;
  title: string;
  contents: string;
  isDone: false;
};

export type NewTodo = {
  title: string;
  contents: string;
};
