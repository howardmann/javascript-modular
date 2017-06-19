// This is the jQuery method for rendering this.
// However this code does not handle diffing and will re-render the entire template

$(document).ready(function(){
  console.log('ready');
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
    },    
    render: function(){
      var students = this.template(this.students);
      this.app.html(students);
    }
  }
  studentModule.init();
});