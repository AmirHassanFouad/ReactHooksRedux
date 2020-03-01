import React from 'react';

export const TodoHeader = (props: any) => {
    return (
        <header className="header">
            <h1>todos</h1>
            <input
                className="new-todo"
                placeholder={props.placeholder}
                onKeyDown={props.handleNewTodoKeyDown}
                autoFocus={true} />
        </header>
    )
};