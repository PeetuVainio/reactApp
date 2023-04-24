import React from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  return (
    <div id="todo-list">
      <h1>To Do Lista</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="teksti"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit">Lisää Tehtävä</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todoTeksti"
          style={{textDecoration: todo.completed ? "line-through" : ""}}>
            <input
              type="checkbox"
              id="completed"
              className="yliViivaus"
              checked={todo.completed} 
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.id === todoEditing ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todoActions">
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo.id)}>Valmis</button>
            ) : (
              <button onClick={() => setTodoEditing(todo.id)}>Muokkaa</button>
            )}

            <button onClick={() => deleteTodo(todo.id)}>Poista</button>
          </div>
        </div>
      ))}
      <div class="d-flex flex-column justify-content-center w-100 h-100">
      <div class="d-flex flex-column justify-content-center align-items-center">
      </div>
      </div>
    </div>
  );
};

export default App;