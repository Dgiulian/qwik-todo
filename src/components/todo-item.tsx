import { component$, useContext, useSignal, useTask$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { supabase } from "~/db";
import type { Todo } from "~/types";
import { CloseIcon } from "~/components/icons";
import { todosContextId } from "~/context/todos.context";

export const updateTodo = server$(
  ({ id, completed }: { id: string; completed: boolean }) =>
    supabase.from("todo").update({ completed: completed }).eq("id", id)
);

const deleteTodo = server$(async (id: string) => {
  console.log(id);
  const result = await supabase.from("todo").delete().eq("id", id);
  console.log(result);
});
export const TodoItem = component$(({ todo }: { todo: Todo }) => {
  const todoCompleted = useSignal(todo.completed);
  useTask$(({ track }) => {
    track(() => todoCompleted.value);
  });

  const todos = useContext(todosContextId);

  return (
    <div class="border rounded-md p-2 w-full flex align-center ">
      <span class="px-2 ">
        <input
          id={`todo-${todo.id}`}
          type="checkbox"
          class=""
          onChange$={() => {
            todoCompleted.value = !todoCompleted.value;
            updateTodo({ id: todo.id, completed: todoCompleted.value });
          }}
          checked={todoCompleted.value}
        />
      </span>
      <label
        for={`todo-${todo.id}`}
        class={{
          "justify-between pr-4": true,
          "text-slate-400": todoCompleted.value,
        }}
      >
        {todo.title}
      </label>
      <button
        onClick$={async () => {
          await deleteTodo(todo.id);
          todos.value = todos.value.filter((t) => t.id !== todo.id);
        }}
        class="text-slate-200 bg-red-600 p-1 rounded-sm ml-auto"
      >
        <CloseIcon />
      </button>
    </div>
  );
});
