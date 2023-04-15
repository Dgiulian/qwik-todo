import type { Signal } from "@builder.io/qwik";
import { createContextId } from "@builder.io/qwik";
import type { Todo } from "~/types";

export const todosContextId = createContextId<Signal<Todo[]>>("todos");
