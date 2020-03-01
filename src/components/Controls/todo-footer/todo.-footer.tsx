import React from 'react';
import { ActionType } from '../../../store/types/actionTypes';
import { ALL_LINK, ACTIVE_LINK, COMPLETED_LINK } from '../../../helpers/constants';

export const TodoFooter = (props: any) => {
    return (
        <>
            <footer className="footer">
                <span className="todo-count"><strong>{props.activeTodosCounter}</strong> item left</span>
                <ul className="filters">
                    <li>
                        <a href={ALL_LINK} onClick={e => props.clicked(ALL_LINK)}
                            className={props.showingNow === ActionType.ShowAllTodos ? "selected" : ""}>All</a>
                    </li>
                    <li>
                        <a href={ACTIVE_LINK} onClick={e => props.clicked(ACTIVE_LINK)}
                            className={props.showingNow === ActionType.ShowActiveTodos ? "selected" : ""}>Active</a>
                    </li>
                    <li>
                        <a href={COMPLETED_LINK} onClick={e =>  props.clicked(COMPLETED_LINK)}
                            className={props.showingNow === ActionType.ShowCompletedTodos ? "selected" : ""}>Completed</a>
                    </li> 
                </ul>

                {props.clearCompletedTodosButton}
            </footer>
        </>
    )
};