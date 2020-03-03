import React, { useCallback } from 'react';
import { TodoModel } from '../../../Models/todo.model';
import { TodoItem } from '../todo-item/todo-item';
import { useDispatch } from 'react-redux';
import { removeTodo, toggleTodo } from '../../../store/actions/todos';

export const TodoBody = React.memo((props: any) => {
    const dispatch = useDispatch();
    const toggleFunc = useCallback((id, isCompleted) => dispatch(toggleTodo(id, isCompleted)), [dispatch]);
    const deleteFunc = useCallback((id) => dispatch(removeTodo(id)), [dispatch]);
    
    return (
        <section className="main">
            <input
                id="toggle-all"
                className="toggle-all"
                type="checkbox"
                checked={props.areAllTodosCompleted}
                onChange={(event: any) => props.toggleItems(event.target.checked)} />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <ul className="todo-list">
                {props.todoItems.map((item: TodoModel) => {
                    return <TodoItem
                        key={item.id}
                        itemId={item.id}
                        title={item.title}
                        itemClass={item.isCompleted ? "completed" : ""}
                        inputClass="toggle"
                        isChecked={item.isCompleted}
                        checked={toggleFunc}
                        deleteItem={deleteFunc} />
                })}
            </ul>

        </section>
    )
});