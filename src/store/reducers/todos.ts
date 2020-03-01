import { TodoState } from "../../Models/todoState.model";
import { ActionType } from '../types/actionTypes';
import { TodosActions } from "../types/actions";
import { TodoModel } from "../../Models/todo.model";
import { Reducer } from "redux";
import { getActionType, getSelectedTodos, replaceAt } from "../../helpers/functions";

export const todosIntialState: TodoState = {
    activeTodosCounter: 0,
    todos: [],
    selectedTodos: [],
    showingNow: ActionType.ShowAllTodos,
    error: false,
    errorMessage: ''
};

export const todosReducer: Reducer<TodoState, TodosActions> = (state: TodoState = todosIntialState, action: TodosActions): TodoState => {
    let todoList: TodoModel[];
    let itemIndex: number;
    switch (action.type) {
        case ActionType.FetchTodos:
            let actionType = getActionType(action.payload.nowShowing);
            return {
                ...state,
                activeTodosCounter: getSelectedTodos(action.payload.todos, ActionType.ShowActiveTodos).length,
                todos: action.payload.todos,
                selectedTodos: getSelectedTodos(action.payload.todos, actionType),
                showingNow: actionType,
                error: false,
                errorMessage: ''
            };

        case ActionType.AddTodo:
            todoList = state.todos.concat(action.payload.todo);
            return {
                ...state,
                todos: todoList,
                selectedTodos: todoList,
                showingNow: ActionType.ShowAllTodos,
                activeTodosCounter: getSelectedTodos(todoList, ActionType.ShowActiveTodos).length,
                error: false,
                errorMessage: ''
            };

        case ActionType.ShowAllTodos:
            return {
                ...state,
                selectedTodos: state.todos,
                showingNow: action.type,
                activeTodosCounter: getSelectedTodos(state.todos, ActionType.ShowActiveTodos).length,
                error: false,
                errorMessage: ''
            };

        case ActionType.ShowActiveTodos:
            todoList = getSelectedTodos(state.todos, action.type);
            return {
                ...state,
                selectedTodos: todoList,
                showingNow: action.type,
                activeTodosCounter: todoList.length,
                error: false,
                errorMessage: ''
            };

        case ActionType.ShowCompletedTodos:
            return {
                ...state,
                selectedTodos: getSelectedTodos(state.todos, action.type),
                showingNow: action.type,
                activeTodosCounter: getSelectedTodos(state.todos, ActionType.ShowActiveTodos).length,
                error: false,
                errorMessage: ''
            };

        case ActionType.ToggleTodo:
            itemIndex = state.todos.findIndex(t => t.id === action.payload.id);
            todoList = replaceAt(state.todos, itemIndex, { ...state.todos[itemIndex], isCompleted: action.payload.isCompleted });
            return {
                ...state,
                todos: todoList,
                selectedTodos: getSelectedTodos(todoList, state.showingNow),
                activeTodosCounter: getSelectedTodos(todoList, ActionType.ShowActiveTodos).length,
                error: false,
                errorMessage: ''
            };

        case ActionType.ToggleAllTodos:
            todoList = state.todos.map((todo, index) => {
                return {
                    ...todo,
                    isCompleted: action.payload.isCompleted,
                    error: false,
                    errorMessage: ''
                }
            });
            return {
                ...state,
                todos: todoList,
                selectedTodos: getSelectedTodos(todoList, state.showingNow),
                activeTodosCounter: getSelectedTodos(todoList, ActionType.ShowActiveTodos).length,
                error: false,
                errorMessage: ''
            };

        case ActionType.RemoveTodo:
            todoList = state.todos.filter(t => t.id !== action.payload.id);
            return {
                ...state,
                todos: todoList,
                selectedTodos: getSelectedTodos(todoList, state.showingNow),
                showingNow: action.type,
                activeTodosCounter: getSelectedTodos(todoList, ActionType.ShowActiveTodos).length,
                error: false,
                errorMessage: ''
            };

        case ActionType.ClearCompletedTodos:
            todoList = state.todos.filter(t => !t.isCompleted);
            return {
                ...state,
                todos: todoList,
                selectedTodos: getSelectedTodos(todoList, state.showingNow),
                showingNow: action.type,
                error: false,
                errorMessage: ''
            };

        case ActionType.Error:
            return {
                ...state,
                error: action.payload.error,
                errorMessage: action.payload.errorMessage
            }

        default:
            return state;
    }
};

