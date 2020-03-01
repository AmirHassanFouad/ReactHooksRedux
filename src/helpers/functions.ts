import { TodoModel } from "../Models/todo.model";
import { ActionType } from "../store/types/actionTypes";
import { ACTIVE_LINK, COMPLETED_LINK } from "./constants";

export const replaceAt = (array: TodoModel[], index: number, value: TodoModel) => {
    const newArray = array.slice(0);
    newArray[index] = value;
    return newArray;
}

export const getSelectedTodos = (todos: TodoModel[], showingNow: ActionType) => {
    switch (showingNow) {
        case ActionType.ShowCompletedTodos:
            return todos.filter(t => t.isCompleted);

        case ActionType.ShowActiveTodos:
            return todos.filter(t => !t.isCompleted);

        default:
            return todos;
    }
}

export const getActionType = (nowShowing: string): ActionType => {
    switch (nowShowing) {
        case ACTIVE_LINK:
            return ActionType.ShowActiveTodos;
        case COMPLETED_LINK:
            return ActionType.ShowCompletedTodos;
        default:
            return ActionType.ShowAllTodos;
    }
}
