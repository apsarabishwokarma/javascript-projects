const dateElement = document.querySelector(".date");
const greetingElement = document.querySelector(".greeting h2");
const addElement = document.querySelector(".addbtn");
const tasksContainer = document.getElementById("tasks");

// Flag to determine whether to use the server or not
const useServer = false;

// API URL for server communication
const apiURL = "http://localhost:3000";


let todos = [];
// Get the current date and time information
const currentDate = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthIndex = currentDate.getMonth();
const month = months[monthIndex].substring(0, 3);
const day = currentDate.getDate();

// Display current date in the UI
dateElement.innerHTML = `${month}<br>${day}`;

const currentHour = new Date().getHours();

let greeting;

// 12:00AM - 12:00PM - Good Morning!
// 12:00PM - 6:00PM - Good Afternoon!
// 6:00PM - 12:00AM - Good Evening!

// Determine the current time of day for a greeting message
if (currentHour >= 0 && currentHour < 12) {
  greeting = "Good Morning!";
} else if (currentHour >= 12 && currentHour < 18) {
  greeting = "Good Afternoon!";
} else {
  greeting = "Good Evening!";
}

greetingElement.innerHTML = greeting;

// Form submission event listener

const todoForm = document.querySelector("form");

todoForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const title = document.getElementById("todoInput").value;

  if (title.length === 0) {
    alert("Enter the task name!!!");
    return;
  }

  const _currentDate = new Date();
  const date = _currentDate.toDateString();

  const newTodo = {
    title: title,
    completed: false,
    date: date,
    id: `todotask${todos.length + 1}${_currentDate.toISOString()}`, //to get unique ids
  };

  if (useServer) {
    todos = await addTodoToServer(newTodo);
  } else {
    todos.push(newTodo);
  }

  document.getElementById("todoInput").value = "";
  renderTodos();
});

async function renderTodos() {
  tasksContainer.innerHTML = ""; // Clear the container

  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];

    tasksContainer.innerHTML += `
      <div class="todoDetails">
        <input type="checkbox" id="${todo.id}" ${
      todo?.completed ? "checked" : ""
    } onchange="toggleComplete(this)"/>

        <label for="${todo.id}" >
          <div class="todoDate">${todo.date}</div>
          <p class="task">${todo.title}</p>
        </label>

        <i class="fa-solid fa-trash" onclick="remove('${todo.id}')"></i>
    </div>
    `;
  }

  if (!useServer) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

async function toggleComplete(target) {
  console.log(target);
  const id = target.id;

  if (useServer) {
    todos = await toggleTodoCompletionOnServer(id, target.checked);
  } else {
    todos = todos.map((t) => {
      if (id === t.id) {
        const newTodo = {
          ...t,
          completed: target.checked,
        };

        return newTodo;
      } else {
        return t;
      }
    });
  }

  renderTodos();
}

async function remove(idToRemove) {
  if (useServer) {
    todos = await removeTodoFromServer(idToRemove);
  } else {
    todos = todos.filter((t) => t.id !== idToRemove);
  }
  renderTodos();
}

addEventListener("DOMContentLoaded", (event) => {
  populateItems();
});

async function populateItems() {
  if (useServer) {
    const serverTodos = await fetchTodosFromServer();
    if (serverTodos) {
      todos = serverTodos;
      renderTodos();
    }
  } else {
    // Local Storage data
    const localTodos = localStorage.getItem("todos");
    if (localTodos) {
      //not equal to  undefined
      todos = JSON.parse(localTodos); //string to object
      renderTodos();
    }
  }
}

// Backend integration
async function addTodoToServer(todo) {
  try {
    const res = await fetch(`${apiURL}/todos`, {
      method: "POST",
      body: JSON.stringify({
        ...todo,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to add todo. Server returned ${res.status}`);
    }

    const updatedTodos = await res.json();
    return updatedTodos;
  } catch (error) {
    console.error("Error adding todo to server:", error.message);
  }
}

async function fetchTodosFromServer() {
  try {
    const res = await fetch(`${apiURL}/todos`);

    if (!res.ok) {
      throw new Error(`Failed to fetch todos. Server returned ${res.status}`);
    }

    const todos = await res.json();
    return todos;
  } catch (error) {
    console.error("Error fetching todos from server:", error.message);
  }
}

async function toggleTodoCompletionOnServer(todoId, isChecked) {
  try {
    const res = await fetch(`${apiURL}/todos/${todoId}`, {
      method: "POST",
      body: JSON.stringify({
        checked: isChecked,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to toggle todo completion. Server returned ${res.status}`
      );
    }

    const updatedTodos = await res.json();
    return updatedTodos;
  } catch (error) {
    console.error("Error toggling todo completion on server:", error.message);
  }
}

async function removeTodoFromServer(todoId) {
  try {
    const res = await fetch(`${apiURL}/todos/${todoId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to remove todo. Server returned ${res.status}`);
    }

    const updatedTodos = await res.json();
    return updatedTodos;
  } catch (error) {
    console.error("Error removing todo from server:", error.message);
  }
}
