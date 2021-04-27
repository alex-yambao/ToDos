let allTodos = [
    {title:'Clean Engine', dueDate: '04-22-2021', description: 'Oil Change, Wash Engine', isComplete: true},
    {title:'Wash Car', dueDate: '04-25-2021', description: 'Wash, Wax', isComplete: false},
    {title:'Mow Lawn', dueDate: '04-24-2021', description: 'Front Yard Only', isComplete: true},
    {title:'Clean Kitchen', dueDate: '04-28-2021', description: 'Sweep/Mop Floors, Clean Counters', isComplete: false},
    {title:'Clean Engine', dueDate: '04-22-2021', description: 'Oil Change, Wash Engine', isComplete: true},
    {title:'Wash Car', dueDate: '04-25-2021', description: 'Wash, Wax', isComplete: false},
    {title:'Mow Lawn', dueDate: '04-24-2021', description: 'Front Yard Only', isComplete: true},
    {title:'Clean Kitchen', dueDate: '04-28-2021', description: 'Sweep/Mop Floors, Clean Counters', isComplete: false},
  ];



  const DEFAULT_TODOS = [
    {title:'How To', dueDate: '04-01-2050', description: 'Welcome to the ToDo App! This App is designed to help you get things done. To the left is a three button menu. The first button with the plus sign enables you to add a new Todo item to your list. The second button with a check mark allows you to remove all completed items. The third button with the trash can will allow you to remove all expired items. ', isComplete: false},
    {title:'Wash Car', dueDate: '04-25-2021', description: 'Wash, Wax', isComplete: false},
    {title:'Mow Lawn', dueDate: '04-24-2021', description: 'Front Yard Only', isComplete: true},
  ];



let pendingTodos;
let completedTodos;
let expiredTodos;



function isCurrent(todo) {
  const todoDueDate = new Date(todo.dueDate);
  const now = new Date();
  return now < todoDueDate;
}



function isComplete(todo) {
  const todoIsComplete = todo.isComplete;
  return todoIsComplete === true;
}



function isExpired(todo) {
  const todoDueDate = new Date(todo.dueDate);
  const now = new Date();
  return now > todoDueDate && todo.isComplete === false;
}



function splitTodos(todo) {
  pendingTodos = todo.filter(isCurrent);
  completedTodos = todo.filter(isComplete);
  expiredTodos = todo.filter(isExpired);
}


$('.left-drawer').on('click', function(e){
    if ($(e.target).hasClass('.left-drawer')) {
      $('#app').toggle('.drawer-open');
    }
})


$('.add-todo').on('click', function(e){
  $('.modal').addClass('open');
});


$('.create-todo').on('click', function(e){
  e.preventDefault();
  createToDoFromForm();
  allTodos.unshift(newToDo);
  $('.todo-form').trigger('reset');
  $('.modal').removeClass('open');
  storeSplitRender(allTodos); 
});


$('.cancel-create-todo').on('click', function(e){
  $('.modal').removeClass('open');
});


let newToDo;


function createToDoFromForm() {
  const form = $('.todo-form');
   newToDo = 
    {title: $('#todo-title').val(),
    dueDate: $('#todo-due-date').val(),
    description:$('#todo-description').val(),
    isComplete: false
    };
    return newToDo;
}


function createElementFromTodoComplete(todo) {
  const newEl = $(`<div class="todo"><h3><span class="title">${todo.title}</span><span class="due-date">${todo.dueDate}</span></h3><pre>${todo.description}</pre><footer class="actions"><button class="action delete">Delete</button></footer></div>`);
  newEl.data("todo", todo);
  return newEl;
}


function createElementFromTodoPending(todo) {
const newEl = $(`<div class="todo"><h3><span class="title">${todo.title}</span><span class="due-date">${todo.dueDate}</span></h3><pre>${todo.description}</pre><footer class="actions"><button class="action complete">Complete</button><button class="action delete">Delete</button></footer></div>`);
newEl.data("todo", todo);
return newEl;
}



function renderTodos(todo) {
  $('main .content').empty();
  completedTodos.forEach(element => {
      $('.completed-todos').append(createElementFromTodoComplete(element));
    });
  pendingTodos.forEach(element => {
    $('.pending-todos').append(createElementFromTodoPending(element));
  });  
  expiredTodos.forEach(element => {
    $('.expired-todos').append(createElementFromTodoPending(element));
  }); 
}



$('main').on('click', '.action.complete', function () {
  const toDoEl= $(this).closest('.todo');
  const toDoData = toDoEl.data();
  toDoData.todo.isComplete = true;
  toDoEl.slideUp(function () {
  storeSplitRender();  
});
});


function storeData(todo) {
  localStorage.setItem("allTodos", JSON.stringify(allTodos));
}


function retrieveData(todo) {
  allTodos = JSON.parse(localStorage.getItem("allTodos")) || fetchDefaultTodos();
  }


function fetchDefaultTodos(todo) {
  allTodos = DEFAULT_TODOS;
} 

function storeSplitRender(todo) {
  storeData(todo);
  splitTodos(todo);
  renderTodos(todo);
}


$('main').on('click', '.action.delete', '.toDo', function(e) {
  let toDoEl= $(e.target).closest('div')
  let toDo = $(e.target).closest('div').data("todo");
  let toDoIndex = allTodos.indexOf(toDo);
  toDoEl.remove();
  allTodos.splice(toDoIndex, 1);
  storeData(allTodos);
})


$('.remove-completed').on('click', function(e) {
  allTodos = allTodos.filter(isComplete);
  storeSplitRender(allTodos);
})

$('.remove-expired').on('click', function(e) {
  allTodos = allTodos.filter(isCurrent);
  storeSplitRender(allTodos);
})

storeSplitRender(DEFAULT_TODOS);