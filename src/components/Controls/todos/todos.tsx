import React, { useEffect } from 'react';

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
  toggleAllTodos, toggleTodo, ShowAllTodos, ShowCompleteTodos, removeTodo
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

  const deleteTodo = (itemId: string) => {
    dispatch(removeTodo(itemId));
  }

  const toggleItemActivation = (itemId: string, isChecked: boolean) => {
    dispatch(toggleTodo(itemId, isChecked))
  }

  const toggleAllItemsActivation = (isChecked: boolean) => {
    let itemIds: string[] = todos.map(t => t.id);
    dispatch(toggleAllTodos(itemIds, isChecked))
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

    // another way
    //this.props.todosState.todos.filter(t => t.isCompleted).map(t => t.id)

    dispatch(RemoveCompletedTodos(ids));
  }

  let todoItems: any;
  let clearCompletedTodosButton: any;
  let snackbar;
  let todosFooter;

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

  if (todos && todos.filter(t => t.isCompleted).length > 0) {
    clearCompletedTodosButton = (
      <button
        className="clear-completed"
        onClick={onClearCompletedTodos}>
        Clear completed
        </button>
    );
  }

  if (todos && todos.length > 0) {
    todoItems = selectedTodos.map((item) => {
      return <TodoBody
        key={item.id}
        title={item.title}
        itemClass={item.isCompleted ? "completed" : ""}
        inputClass="toggle"
        isChecked={item.isCompleted}
        checked={(event: any) => toggleItemActivation(item.id, event.target.checked)}
        deleteItem={() => deleteTodo(item.id)} />
    });

    todosFooter = <TodoFooter
      activeTodosCounter={activeTodosCounter}
      showingNow={showingNow}
      clearCompletedTodosButton={clearCompletedTodosButton}
      clicked={(e: string) => getTodosList(e)} />
  }

  return (
    <>
      {snackbar}
      <section className="todoapp">
        <TodoHeader
          placeholder="What needs to be done?"
          handleNewTodoKeyDown={(e: any) => handleNewTodoKeyDown(e)}
          autoFocus={true} />

        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={todos.filter(t => t.isCompleted).length === todos.length}
            onChange={(event) => toggleAllItemsActivation(event.target.checked)} />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {todoItems}
          </ul>

        </section>

        {todosFooter}
      </section>
    </>
  );
}