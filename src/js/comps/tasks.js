import $ from 'jquery';
import tmpl from 'blueimp-tmpl';

import { ENTER_KEY } from '../utils/keys';
import Storage from '../utils/storage';

class Tasks {
  constructor() {
    this.$root = $('[data-wt]');
    this.$taskList = this.$root.find('.task-list');
    this.$newTaskInput = this.$root.find('.js-new-task-input');

    this.taskListItemTpl = $('#taskListItemTpl').html();

    this.storage = new Storage('wt');

    this.tasks = this.storage.get('tasks') || [];

    // this.tasks = [
    //   {
    //     content: 'Buy clothes',
    //     completed: false
    //   }
    // ];

    this.events();
    this.renderTasks();
    this.$newTaskInput.focus();
  }

  events() {
    this.$newTaskInput.on('keypress.wt', e => {
      if (e.which == ENTER_KEY || e.keyCode == ENTER_KEY) {
        this.addTask();
      }
    });

    this.$taskList
      .on('click.wt', '.js-remove-task', e => this.removeTask(e))
      .on('click.wt', '.js-complete-task', e => this.toggleCompleteTask(e))
      .on('blur.wt', '.js-task-item-input', e => this.updateTask(e));
  }

  renderTasks() {
    let $tasks = $('<div></div>');

    this.tasks.forEach((task, key) => {
      const _task = tmpl('taskListItemTpl', {...task, key});
      $tasks.append(_task);
    });

    this.$taskList.html($tasks.html());
  }

  updateTasksState(tasks) {
    this.tasks = [...tasks];
    this.renderTasks();
    setTimeout(() => this.storage.set('tasks', this.tasks), 0);
  }

  addTask() {
    const newTaskValue = this.$newTaskInput.val().trim();
    if (newTaskValue) {
      const tasks = [
        ...this.tasks,
        { completed: false, content: newTaskValue }
      ];
      this.updateTasksState(tasks);
      this.$newTaskInput.val('');
    }
  }

  getTaskNode(node) {
    return $(node).closest('.task-list-item');
  }
  getNodeKey(node) {
    return this.getTaskNode(node).attr('key');
  }

  removeTask(e) {
    const key = this.getNodeKey(e.target);
    let tasks = [...this.tasks];
    tasks.splice(+key, 1);
    this.updateTasksState(tasks);
  }

  toggleCompleteTask(e) {
    const key = this.getNodeKey(e.target);
    let tasks = [...this.tasks];
    tasks[+key].completed = !tasks[+key].completed;
    this.updateTasksState(tasks);
  }

  updateTask(e) {
    const key = this.getNodeKey(e.target);
    const newValue = this.getTaskNode(e.target).find('.js-task-item-input').val();
    let tasks = [...this.tasks];

    const curValue = tasks[+key].content;
    if (curValue != newValue) {
      tasks[+key].content = newValue
    }
    this.updateTasksState(tasks);
  }
}

export default Tasks;
