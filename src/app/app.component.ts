import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-angular';
  
  ngOnInit() {
    this.getTasksFromStorage();
  }

  tasks: Array<{description: string, done: boolean}> = []

  taskDescription = new FormControl('', Validators.required)
  
  error: boolean = false;
  addTask(description: string) {
    if (this.taskDescription.valid) {
    this.tasks.unshift({
      description,
      done: false
    });
    this.taskDescription.reset();
    this.setTasksToStorage();
    this.error = false;}
    else 
    this.error = true;
    return
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.setTasksToStorage();
  }

  completeTask(index: number) {
    this.tasks[index].done = !this.tasks[index].done;
    this.setTasksToStorage();
  }

  getTasksFromStorage(){
    let personalTasks = JSON.parse(localStorage.getItem('personalTasks')||'') || [];
    this.tasks = personalTasks;
};

  setTasksToStorage(){
  localStorage.setItem('personalTasks', JSON.stringify(this.tasks));
}
}

