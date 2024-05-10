const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUl = document.getElementById('todo-list');

let allTodos = getTodos(); // alle Todos werden in einem Array gesammelt
updateTodoList(); // Funktion:

// Die Form erhält einen Eventlistener und fängt das das Ereignis ab und verhindert das Standardverhalten
// Anschließend wird die die Funktion "addTodo" aufgerufen
todoForm.addEventListener('submit', function (e) {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const todoText = todoInput.value.trim(); //erstellt eine Konstante, welche den Inhalt aus dem HTML-Input-Feld nimmt
  if (todoText.length > 0) {
    // eine If-Anfrage, welche verhindert, das leere Eingaben angenommen werden
    const todoObject = {
      // jeder eintrag wird zum Objekt mit den inhalten Text und ob dieser erledigt wurde (standardmäßig nicht erledigt)
      text: todoText,
      completed: false,
    };
    allTodos.push(todoObject); //in das array allTodos wird das erstelle Objekt hinzugefügt
    updateTodoList(); // die Liste wird geupdatet
    saveTodos(); // und gespeichert
    todoInput.value = ''; //cleart das eingabefeld
  }
}

function updateTodoList() {
  //updated die liste
  todoListUl.innerHTML = ''; //die Todoliste wird gecleart
  allTodos.forEach((todo, todoIndex) => {
    //iteriert über alle Items und führt eine Callback funktion aus, welche für jedes item das todo und einen index in das array mitgibt
    todoItem = createTodoItem(todo, todoIndex);
    todoListUl.append(todoItem); //fügt das Item als letztes dem array zu (append)
  });
}

function createTodoItem(todo, todoIndex) {
  const todoId = 'todo-' + todoIndex;
  const todoLI = document.createElement('li');
  const todoText = todo.text;
  todoLI.className = 'todo';
  todoLI.innerHTML = `<input type="checkbox" id="${todoId}" />
  <label class="custom-checkbox" for="${todoId}">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="transparent"
    >
      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
    </svg>
  </label>
  <label for="${todoId}" class="todo-text"
    >${todoText}</label
  >
  <button class="delete-button">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="var(--secondary-color)"
    >
      <path
        d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
      />
    </svg>
  </button>`;

  const deleteButton = todoLI.querySelector('.delete-button');
  deleteButton.addEventListener('click', () => {
    deleteTodoItem(todoIndex);
  });
  const checkbox = todoLI.querySelector('input');
  checkbox.addEventListener('change', () => {
    allTodos[todoIndex].completed = checkbox.checked;
    saveTodos();
  });
  checkbox.checked = todo.completed;
  return todoLI;
}

function deleteTodoItem(todoIndex) {
  allTodos = allTodos.filter((_, i) => i !== todoIndex);
  saveTodos();
  updateTodoList();
}

function saveTodos() {
  const todoJson = JSON.stringify(allTodos);
  localStorage.setItem('todos', todoJson);
}

function getTodos() {
  const todos = localStorage.getItem('todos') || '[]';
  return JSON.parse(todos);
}
