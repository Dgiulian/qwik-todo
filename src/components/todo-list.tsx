import { component$ } from "@builder.io/qwik";
import type { Todo } from "~/types";
import { TodoItem } from "./todo-item";

type TodoListProps = {
  todos: Todo[];
};

export const TodoList = component$(({ todos }: TodoListProps) => {
  return (
    <ul class="flexflex-col space-y-2">
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  );
});
