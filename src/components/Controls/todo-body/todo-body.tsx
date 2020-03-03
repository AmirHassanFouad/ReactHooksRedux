import React from 'react';

export const TodoBody = (props: any) => {
    return (
        <section className="main">
            <input
                id="toggle-all"
                className="toggle-all"
                type="checkbox"
                checked={props.todosCount}
                onChange={props.toggleItems} />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <ul className="todo-list">
                {props.todoItems}
            </ul>

        </section>
    )
};