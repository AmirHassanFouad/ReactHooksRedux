import React, { useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { TodoState } from '../../../Models/todoState.model';
import { TodoModel } from '../../../Models/todo.model';
import { TodoBody } from '../todo-body/todo-body';
import { v4 as uuidv4 } from 'uuid';
import { TodoFooter } from '../todo-footer/todo.-footer';
import { SnackBar } from '../../UI/snackbar/snackBar';
import { TodoHeader } from '../todo-header/todo-header';
import { AppState } from '../../../store/configureStore';
import {
  loadTodos, ChangeErrorState, ShowActiveTodos, RemoveCompletedTodos, addTodo,
  toggleAllTodos, ShowAllTodos, ShowCompleteTodos
} from '../../../store/actions/todos';
import { ACTIVE_LINK, COMPLETED_LINK } from '../../../helpers/constants';

interface Props {
  location: Location;
}

export const TodosComponent: React.FC<Props> = (props: Props) => {
  const ENTER_KEY = 13;
  const dispatch = useDispatch();
  const { activeTodosCounter, error, errorMessage, selectedTodos, showingNow, todos } = useSelector<AppState, TodoState>((state: AppState) => {
    return {
      todos: state.todosState.todos,
      selectedTodos: state.todosState.selectedTodos,
      activeTodosCounter: state.todosState.activeTodosCounter,
      error: state.todosState.error,
      errorMessage: state.todosState.errorMessage,
      showingNow: state.todosState.showingNow,
    }
  });


  //instead of ComponentDidMount life hook
  useEffect(() => {
    dispatch(loadTodos(props.location.hash)); // eslint-disable-next-line
  }, []);

  const getTodosList = (location: string = '') => {
    switch (location) {
      case ACTIVE_LINK:
        dispatch(ShowActiveTodos());
        break;
      case COMPLETED_LINK:
        dispatch(ShowCompleteTodos());
        break;
      default:
        dispatch(ShowAllTodos());
    }
  }

  const handleNewTodoKeyDown = (event: any) => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    dispatch(addTodo({ id: uuidv4(), title: event.target.value, isCompleted: false }));
    event.target.value = "";
  }

  const onClearCompletedTodos = () => {
    let ids: string[] = todos.reduce((itemsId: string[], currentItem: TodoModel) => {
      if (currentItem.isCompleted)
        itemsId.push(currentItem.id);

      return itemsId;
    }, []);

    dispatch(RemoveCompletedTodos(ids));
  }

  // let todoItems: any;
  let clearCompletedTodosButton: any;
  let snackbar;
  let todosFooter;
  let todoHeader = <TodoHeader
    placeholder="What needs to be done?"
    handleNewTodoKeyDown={(e: any) => handleNewTodoKeyDown(e)}
    autoFocus={true} />;

  if (error) {
    snackbar = <SnackBar
      show={error}
      autoHideDuration={5000}
      severity="error"
      handleClose={() => dispatch(ChangeErrorState(false))}
      message={errorMessage} />
  } else {
    snackbar = "";
  }

  if (todos.filter(t => t.isCompleted).length > 0) {
    clearCompletedTodosButton = (
      <button
        className="clear-completed"
        onClick={onClearCompletedTodos}>
        Clear completed
        </button>
    );
  }

  if (todos.length > 0) {
    todosFooter = <TodoFooter
      activeTodosCounter={activeTodosCounter}
      showingNow={showingNow}
      clearCompletedTodosButton={clearCompletedTodosButton}
      clicked={(e: string) => getTodosList(e)} />
  }

  const toggleAllItems = useCallback((isCompleted: boolean) => {
    let itemIds: string[] = todos.map(t => t.id);
    dispatch(toggleAllTodos(itemIds, isCompleted));  // eslint-disable-next-line
  }, [dispatch]);

  let todoBody = <TodoBody key="todobody"
    todoItems={selectedTodos}
    areAllTodosCompleted={todos.filter(t => t.isCompleted).length === todos.length}
    toggleItems={toggleAllItems} />;

  return (
    <>
      {snackbar}
      <section className="todoapp">
        {todoHeader}
        {todoBody}
        {todosFooter}
      </section>
    </>
  );
};