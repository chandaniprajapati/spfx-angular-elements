import { Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ToDo } from '../models/todo.model';
import { AppService } from '../services/app.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-angular-elements-web-part',
  templateUrl: './angular-elements-web-part.component.html',
  styleUrls: ['./angular-elements-web-part.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})

export class AngularElementsWebPartComponent implements OnInit {
  @Input() title: string;

  @Input()
  public set siteurl(url: string) {
    this.appService.setAPIUrl(url);
  }

  todos: ToDo[];
  editToDo: ToDo = undefined;
  submitted = false;

  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.appService.getToDos().then(todos => this.todos = todos);
  }

  delete(todo: ToDo, index: number) {
    const confirmation = confirm(`⚠ Are you sure ? Do you want to delete ${todo.Title} ?`);
    if (confirmation) {
      this.appService.deleteToDo(todo).then(result => {
        this.todos.splice(index, 1);
        alert(`⚠ ${todo.Title} is deleted...`);
      });
    }
  }

  submit(todoForm: NgForm) {
    const todo = todoForm.value;
    this.appService.addToDo(todo).then(result => {
      if (result.Id) {
        alert(`✅ Task: ${todo.Title} is added...`);
        this.todos.push(result);
        todoForm.resetForm();
      }
    });
  }

  update(todo: ToDo) {
    this.appService.updateToDo(todo).then(response => {
      this.editToDo = undefined;
      alert(`✔ ToDo Updated...`);
    });
  }

  edit(todo: ToDo) {
    this.editToDo = { ...todo };
  }

}
