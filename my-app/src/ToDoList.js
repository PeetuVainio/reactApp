import React from 'react';
import ToDo from './ToDo';

const ToDoList = ({toDoList, handleToggle, handleFilter}) => {
    return (
        <div>
            {toDoList.map(todo => {
                return (
                    <ToDo todo={todo} handleToggle={handleToggle} handleFilter={handleFilter}/>
                )
            })}
            <button className="poistaNappi" style={{margin: '20px'}} onClick={handleFilter}>Remove selected task</button>
        </div>
    );
};

export default ToDoList;