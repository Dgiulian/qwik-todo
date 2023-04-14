import { component$ } from "@builder.io/qwik";
import type { Todo } from "~/types";

type TodoListProps = {
  todos: Todo[];
};

export const TodoList = component$(({ todos }: TodoListProps) => {
  return (
    <ul class="flexflex-col space-y-2">
      {todos.map((todo) => (
        <li key={todo.id}>
          <label
            for={`todo-${todo.id}`}
            class={{
              "border rounded-md p-2 w-full flex justify-between": true,
              "text-slate-400": todo.completed,
            }}
          >
            {todo.title}
            <input
              id={`todo-${todo.id}`}
              type="checkbox"
              checked={todo.completed}
            />
          </label>
        </li>
      ))}
    </ul>
  );
});
