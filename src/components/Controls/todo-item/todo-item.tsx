import React from 'react';

export const TodoItem = React.memo((props: any) => {
    return (
        <>
            <li className={props.itemClass}>
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={props.isChecked}
                        onChange={(event: any) => props.checked(props.itemId, event.target.checked)} />
                    <label>{props.title}</label>
                    <button className="destroy" onClick={() => props.deleteItem(props.itemId)}></button>
                </div>
            </li>
        </>
    )
});