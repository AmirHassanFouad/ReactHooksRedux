import axios from 'axios';
import { TodoModel } from '../../Models/todo.model';
import { ActionType } from '../types/actionTypes';
import { Dispatch } from 'redux';
import { TodosActions } from '../types/actions';

const url = 'http://localhost:3000/todos';

export const loadTodos = (nowShowing: string) => {
    return (dispatch: Dispatch<TodosActions>) => {
        axios.get(url)
            .then(response => {
                dispatch(SetTodos(response.data, nowShowing));
            }).catch(error => {
                dispatch(ChangeErrorState(true, 'Something went wrong while retrieving todos list'))
            });
    }
};

export const addTodo = (todo: TodoModel) => {
    return (dispatch: Dispatch<TodosActions>) => {
        axios.post(url, todo)
            .then(response => {
                dispatch(AddTodo(todo));
            }).catch(error => {
                dispatch(ChangeErrorState(true, `Something went wrong while adding "${todo.title}" todo item`));
            });
    }
};

export const removeTodo = (id: string) => {
    return (dispatch: Dispatch<TodosActions>) => {
        axios.delete(`${url}/${id}`)
            .then(response => {
                dispatch(RemoveTodo(id));
            }).catch(error => {
                dispatch(ChangeErrorState(true, `Something went wrong while delete todo item with id ${id}`));
            });
    }
};

export function RemoveCompletedTodos(ids: string[]) {
    return (dispatch: Dispatch<TodosActions>) => {
        for (let id of ids) {
            axios.delete(`${url}/${id}`)
                .then(response => {
                    dispatch(RemoveTodo(id));
                }).catch(error => {
                    dispatch(ChangeErrorState(true, `Something went wrong while delete todo item with id ${id}`));
                });
        }
    }
};

export const toggleTodo = (id: string, isCompleted: boolean) => {
    return async (dispatch: Dispatch<TodosActions>) => {
        await axios.patch(`${url}/${id}`, { isCompleted: isCompleted })
            .then(response => {
                dispatch(ToggleTodo(id, isCompleted));
            }).catch(error => {
                dispatch(ChangeErrorState(true, `Something went wrong while changing the state of todo item with id ${id} to ${isCompleted ? "Completed" : "Active"}`));
            });
    }
};

export const toggleAllTodos = (ids: string[], state: boolean) => {
    return async (dispatch: Dispatch<TodosActions>) => {
        await Promise.all(ids.map(id =>
            axios.patch(`${url}/${id}`, { isCompleted: state })
        )).then(response => {
            dispatch(ToggleAllTodos(state));
        }).catch(error => {
            dispatch(ChangeErrorState(true, `Something went wrong while changing the state of todo items to ${state ? "Completed" : "Active"}`));
        });
    }
};

export const SetTodos = (todos: Array<TodoModel>, nowShowing: string): TodosActions => {
    return {
        type: ActionType.FetchTodos,
        payload: {
            todos: todos,
            nowShowing: nowShowing
        }
    };
}

export const AddTodo = (todoItem: TodoModel): TodosActions => {
    return {
        type: ActionType.AddTodo,
        payload: {
            todo: todoItem
        }
    };
};

export const RemoveTodo = (selectedId: string): TodosActions => {
    return {
        type: ActionType.RemoveTodo,
        payload: {
            id: selectedId
        }
    };
};

export const ShowAllTodos = (): TodosActions => {
    return {
        type: ActionType.ShowAllTodos,

    };
};

export const ShowCompleteTodos = (): TodosActions => {
    return {
        type: ActionType.ShowCompletedTodos
    };
};

export const ShowActiveTodos = (): TodosActions => {
    return {
        type: ActionType.ShowActiveTodos
    };
};

export const ToggleTodo = (selectedId: string, isCompleted: boolean): TodosActions => {
    return {
        type: ActionType.ToggleTodo,
        payload: {
            id: selectedId,
            isCompleted: isCompleted
        }
    };
};

export const ToggleAllTodos = (isCompleted: boolean): TodosActions => {
    return {
        type: ActionType.ToggleAllTodos,
        payload: {
            isCompleted: isCompleted
        }
    }
};

export const clearCompletedTodos = (): TodosActions => {
    return {
        type: ActionType.ClearCompletedTodos,
    }
};

export const ChangeErrorState = (error: boolean, message: string = ''): TodosActions => {
    return {
        type: ActionType.Error,
        payload: {
            error: error,
            errorMessage: message
        }
    }
};