// This is the jQuery method for rendering this.
// However this code does not handle diffing and will re-render the entire template

$(document).ready(function(){
  var studentModule = {
    students: ['john', 'jack', 'mary', 'joy'],
    init: function(){
      this.cacheDom();
      this.render();
      this.bindEvents();
    },
    cacheDom: function(){
      this.app = $('#app');
      this.button = $('button');
    },
    bindEvents: function(){
      this.button.on('click', () => {
        this.removeStudent();
      })
    },
    template: function(students){
      var studentList = students.map(student => `<li>Student: ${student}</li>`).join('');
      return `<ul>${studentList}</ul>`;
    },
    removeStudent: function(){
      this.students.pop();
      this.render();
      // trigger API of listenerModule to update
      listenerModule.render(this.students.length);
    },    
    render: function(){
      var content = this.template(this.students);
      this.app.html(content);
    }
  }

  var listenerModule = {
    init: function(){
      this.cacheDom();
      this.render(studentModule.students.length);
    },
    cacheDom: function(){
      this.listener = $('#listener');
    },
    template: function(length){
      return `<p>Students length: ${length}</p>`
    },
    render: function(length){
      var content = this.template(length);
      this.listener.html(content);
    }
  }

  // Initialize
  studentModule.init();
  listenerModule.init();

});