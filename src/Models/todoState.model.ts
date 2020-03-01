import { TodoModel } from "./todo.model";
import { ActionType } from "../store/types/actionTypes";

export interface TodoState {
    activeTodosCounter: number;
    todos: Array<TodoModel>;
    selectedTodos: Array<TodoModel>;
    showingNow: ActionType;
    error: boolean;
    errorMessage: string
}