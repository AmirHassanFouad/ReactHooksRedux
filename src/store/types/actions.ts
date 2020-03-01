import { TodoModel } from "../../Models/todo.model";
import { ActionType } from "./actionTypes";

export interface LoadTodosAction {
    type: typeof ActionType.FetchTodos;
    payload: {
        todos: Array<TodoModel>,
        nowShowing: string
    }
}

export interface ShowAllTodosAction {
    type: typeof ActionType.ShowAllTodos;
}

export interface ShowCompleteTodosAction {
    type: typeof ActionType.ShowCompletedTodos;
}

export interface ShowActiveTodosAction {
    type: typeof ActionType.ShowActiveTodos;
}

export interface AddTodoAction {
    type: typeof ActionType.AddTodo;
    payload: {
        todo: TodoModel
    }
}

export interface DeleteTodoAction {
    type: typeof ActionType.RemoveTodo;
    payload: {
        id: string
    }
}

export interface ToggleTodoAction {
    type: typeof ActionType.ToggleTodo;
    payload: {
        id: string,
        isCompleted: boolean
    }
}

export interface ToggleAllTodosAction {
    type: typeof ActionType.ToggleAllTodos;
    payload: {
        isCompleted: boolean
    }
}


export interface ClearCompletedTodosAction {
    type: typeof ActionType.ClearCompletedTodos;
}

export interface ErrorAction {
    type: typeof ActionType.Error;
    payload: {
        error: boolean,
        errorMessage: string
    }
}

export type TodosActions =
    | LoadTodosAction
    | ShowAllTodosAction
    | ShowCompleteTodosAction
    | ShowActiveTodosAction
    | AddTodoAction
    | DeleteTodoAction
    | ToggleTodoAction
    | ToggleAllTodosAction
    | ClearCompletedTodosAction
    | ErrorAction


export type AppActions = TodosActions;