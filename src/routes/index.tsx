import { component$, useContextProvider } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { z, zod$ } from "@builder.io/qwik-city";
import { Form, routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { TodoList } from "~/components/todo-list";
import { todosContextId } from "~/context/todos.context";
import { supabase } from "~/db";
import type { Todo } from "~/types";

export const todos: Todo[] = [];

export const useAddToListAction = routeAction$(
  async (data) => {
    const { data: todo } = await supabase
      .from("todo")
      .insert({
        title: data.title,
      })
      .select("*");
    console.log({ todo, data });
    if (todo?.length) {
      todos.push(todo[0] as Todo);
    }
    return {
      success: true,
      todo: todo?.length ? todo[0] : null,
    };
  },
  zod$({
    title: z.string().trim().min(1),
  })
);

export const useTodosLoader = routeLoader$(async () => {
  const { data: todos } = await supabase
    .from("todo")
    .select("*")
    .order("created_at", { ascending: false });

  return todos as Todo[];
});

export default component$(() => {
  const action = useAddToListAction();

  const todos = useTodosLoader();
  useContextProvider(todosContextId, todos);

  return (
    <div class="max-w-md mx-auto mt-4 px-2 pt-4">
      <h1 class="text-4xl mb-4 text-center">Todo App</h1>

      <Form action={action} spaReset>
        <div class="flex gap-2 w-full">
          <input
            type="text"
            name="title"
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
