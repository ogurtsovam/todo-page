const elements = {
  form: document.getElementById("todo-form"),
  input: document.getElementById("todo-input"),
  submit: document.querySelector('[type="submit"]'),
  todoList: document.getElementById("todo-list"),
};

const saveData = () => {
  localStorage.setItem('data', elements.todoList.innerHTML)
}

const renderData = () => {
  elements.todoList.innerHTML = localStorage.getItem('data')
}

elements.form.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = {
    text: elements.input.value,
    completed: false,
  }

  const li = document.createElement("li");
  li.classList.add("todo-item");
  let span = document.createElement("span");
  span.classList.add("todo-text")
  span.innerHTML = task.text
  li.append(span)
  let button = document.createElement("button");
  button.innerHTML = '✕'
  li.append(button)

  elements.todoList.appendChild(li);
  elements.input.value = "";
  saveData()
});

elements.todoList.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;

  if (e.target.tagName === 'LI' || e.target.tagName === 'SPAN') {
    li.classList.toggle('checked')
    saveData()
  } else if (e.target.tagName === 'BUTTON') {
    e.target.parentElement.remove()
    saveData()
  }
})

renderData()