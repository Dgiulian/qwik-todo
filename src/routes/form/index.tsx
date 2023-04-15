import { component$ } from "@builder.io/qwik";
import { routeAction$, Form } from "@builder.io/qwik-city";

export const useAddUser = routeAction$(async () => {
  // This will only run on the server when the user submits the form (or when the action is called programatically)
  const userID = 8;
  return {
    success: true,
    userID,
  };
});

export default component$(() => {
  const action = useAddUser();

  return (
    <>
      <Form action={action}>
        <input name="firstName" />
        <input name="lastName" />
        <button type="submit">Add user</button>
      </Form>
      {action.value?.success && (
        // When the action is done successfully, the `action.value` property will contain the return value of the action
        <div>User {action.value.userID} added successfully</div>
      )}
    </>
  );
});
