// This is the jQuery method for rendering this.
// However this code does not handle diffing and will re-render the entire template

$(document).ready(function(){
  // JavaScript publish subscribe pattern. Central object to store all pub and sub events
  // Other modules can publish and add events and functions to the events object which will be stored in the events object
  // Other modules can then subscribe to the events
  // Summary: the events module is responsible for storing eventName properties and an array of functions to be triggered
  // It is the responsibility of the publisher and subscribers to agree on what events they want to sure
  // Example: the listenerModule here says to the studentModule I want access to your students array any time it changes, I want you to call 'studentsChanged' and pass in the students array everytime you render to the DOM
  // The listenerModule will pass in a custom function (it can change anytime and the studentsModule doesn't need knowledge of what he is going to do with it other than he wants the students array)
  // Whenever the studentsModule emits the eventName and passes in the data. This will trigger the pre-prepared function that the listenerModule subscribed to and will trigger it
  // Step 1: the listener creates the event by subscribing to the events module passing in the eventName it wants and passing in the function it wants triggered
  // Step 2: the publisher (studentModule), emits the event by calling the eventName and passing in the params data. It has no knowledge of what the listener will do with that data
  var events = {
    events: {},
    on: function(eventName, fn){
      // If event does not exist create a new property with the eventName and an empty array
      this.events[eventName] = this.events[eventName] || [];
      // If event does not exist push the function into the array. An event can have multple listeners
      this.events[eventName].push(fn);
    },
    emit: function(eventName, param){
      // If eventName exists trigger all functions within the array with the data passed in
      if (this.events[eventName]){
        this.events[eventName].forEach(function(fn){
          fn(param);
        });
      }
    }
  }

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
      var content = this.template(this.students);
      this.app.html(content);
      // // trigger API of listenerModule to update
      // listenerModule.render(this.students.length);
      // Step 2: Instead of using API above, the studentModule will emit to the events and pass in the data to the eventName
      // The studentModule here is the pub and doesn't care about the function that is being triggered, it's only job is to pass through the data param to the events to the corressponding eventName      
      events.emit('studentsChanged', this.students);
    }
  }

  var listenerModule = {
    init: function(){
      this.listener = $('#listener');
      events.on('studentsChanged', this.render.bind(this));
    },
    template: function(length){
      return `<p>Students length: ${length}`
    },
    render: function(students){
      var content = this.template(students.length);
      this.listener.html(content);
    }
  }

  // Initialize
  listenerModule.init();
  studentModule.init();
});