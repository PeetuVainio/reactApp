import React from "react";
import "./App.css";

const App = () => { //muuttujia
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

  function handleSubmit(e) { //functio uusien todojen lisäämiselle
    e.preventDefault();

    const newTodo = { //Kun tekee uuden todon, siihen tulee id, text joka on määritetty todoksi ja checkbox on itsestään poissa päältä
      id: new Date().getTime(),
      text: todo,
      completed: false, //checkbox on itsestään "not checked"
    };

    var x = document.forms["errMsg"]["name1"].value; //error message jos tietoa ei ole lisätty
    if (x === "" || x === null) { // estää enterin spämmäämisen todojen lisäämiseksi.
      alert("Lisää Tieto!!!!");
      return false;
    } else {
      setTodos([...todos].concat(newTodo)); //jos tieto on lisätty, se tulee sivustolle
      setTodo("");
    }
  }

  function deleteTodo(id) { //functio poistamiselle
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) { //functio checkboxille
    let updatedTodos = [...todos].map((todo) => { // jos checkbox on checkattu, teksti yliviivautuu
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdits(id) { //functio edittaukselle
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
      <form onSubmit={handleSubmit}
      name="errMsg">
        <input
          type="text"
          className="teksti"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          name="name1"
        />
        <button type="submit">Lisää Tehtävä</button>
      </form>
        <form>
          <button type="submit">Poista Kaikki</button>
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
      </div>
  );
};

export default App;