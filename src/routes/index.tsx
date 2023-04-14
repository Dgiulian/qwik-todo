import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Form, routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { TodoList } from "~/components/todo-list";
import { loadEnv } from "vite";

loadEnv(process.env.ENV_MODE!, "~/../", "VITE_");
import { supabase } from "~/db";
import type { Todo } from "~/types";
// import { InputForm } from "~/components/input-form";

export const useAddTodoAction = routeAction$((props) => {
  console.log("Todo", props);
});

export const useTodos = routeLoader$(async () => {
  const { data: todos } = await supabase.from("todo").select("*");

  return todos as Todo[];
});

export default component$(() => {
  const todoAction = useAddTodoAction();

  const todoText = useSignal("");

  const todos = useTodos();

  return (
    <div class="max-w-md mx-auto mt-4 px-2 pt-4">
      <h1 class="text-4xl mb-4 text-center">Todo App</h1>
      <Form action={todoAction}>
        <div class="flex gap-2 w-full">
          <input
            type="text"
            bind:value={todoText}
            class="border flex-1 py-1 px-2 rounded-md"
          />
          <button
            type="submit"
            class="bg-blue-500 py-1 px-2 rounded-md text-slate-100"
          >
            Add
          </button>
        </div>
      </Form>

      <div class="my-4">
        <TodoList todos={todos.value} />
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik Todo",
  meta: [
    {
      name: "description",
      content: "Yet another Todo App built with Qwik",
    },
  ],
};
