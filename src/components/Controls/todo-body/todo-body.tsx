import React from 'react';

export const TodoBody = (props: any) => {
    return (
        <>
            <li className={props.itemClass}>
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={props.isChecked}
                        onChange={props.checked} />
                    <label>{props.title}</label>
                    <button className="destroy" onClick={props.deleteItem}></button>
                </div>
            </li>
        </>
    )
};