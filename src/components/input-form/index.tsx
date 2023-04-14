import { component$, useSignal } from "@builder.io/qwik";
import { Form, routeAction$ } from "@builder.io/qwik-city";

export const useAddTodoAction = routeAction$((props) => {
  console.log("Todo", props);
});

export const InputForm = component$(() => {
  const todoAction = useAddTodoAction();
  const todoText = useSignal("");
  return (
    <Form action={todoAction}>
      <input type="text" bind:value={todoText} />
      <button type="submit">Add</button>
    </Form>
  );
});
