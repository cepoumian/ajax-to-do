$(document).ready(function () {

// Get and display all tasks
  
var getAndDislayAllTasks = function () {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=176',
    dataType: 'json',
    success: function (response, textStatus) {
      $('#todo-list').empty();
      response.tasks.forEach(function (task) {
        $('#todo-list').append('<div class="row" data-completed="' + task.completed + '"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '></div>');
      });
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });  
};

// Create tasks

  var createTask = function () {
    $.ajax({
      type: 'POST',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=176',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#new-task-content').val()
        }
      }),
      success: function (response, textStatus) {
        $('#new-task-content').val('');
        getAndDislayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }      
    });
  };

  $('#create-task').on('submit', function(e) {
    e.preventDefault();
    createTask();
  });

 // Delete tasks
  
  var deleteTask = function (id) {
    $.ajax({
      type: 'DELETE',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=176',
      success: function (response, textStatus) {
        getAndDislayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });    
  };

  $(document).on('click', '.delete', function() {
    deleteTask($(this).data('id'));
  });

// Mark tasks either completed or active based on user selection

  var markTaskComplete = function (id) {
    $.ajax({
      type: 'PUT',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=176',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDislayAllTasks();
      },
      error: function (response, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });    
  };

  var markTaskActive = function (id) {
    $.ajax({
      type: 'PUT',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=176',
      success: function (response, textStatus) {
        getAndDislayAllTasks();
      },
      error: function (response, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  $(document).on('change', '.mark-complete', function () {
    if (this.checked) {
      markTaskComplete($(this).data('id'));
    } else {
      markTaskActive($(this).data('id'));
    }
  });

// filter displayed tasks based on data-completed attribute
  
  $(document).on('click', '#btnComp', function () {    
    $('[data-completed="false"]').hide();
    $('[data-completed="true"]').show();
  });

  $(document).on('click', '#btnAct', function () {
    $('[data-completed="true"]').hide();
    $('[data-completed="false"]').show();
  });
  
  $(document).on('click', '#btnAll', function () {
    $('[data-completed="true"]').show();
    $('[data-completed="false"]').show();
  });  

getAndDislayAllTasks();  

});