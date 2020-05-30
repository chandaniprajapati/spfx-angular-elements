import { Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ToDo } from '../models/todo.model';
import { AppService } from '../services/app.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-angular-elements-web-part',
  templateUrl: './angular-elements-web-part.component.html',
  styleUrls: ['./angular-elements-web-part.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})

export class AngularElementsWebPartComponent implements OnInit, OnDestroy {
  @Input() title: string;

  @Input()
  public set siteUrl(url: string) {
    this.appService.setAPIUrl(url);
  }

  todos: ToDo[];
  editToDo: ToDo = undefined;

  submitted = false;
  subscription: Subscription;
  constructor(private appService: AppService) {
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.subscription.add(
      this.appService.getToDos().subscribe(todos => this.todos = todos)
    );
  }

  delete(todo: ToDo, index: number) {
    const confirmation = confirm(`⚠ Are you sure ? Do you want to delete ${todo.Title} ?`);
    if (confirmation) {
      this.appService.deleteToDo(todo).subscribe(result => {
        this.todos.splice(index, 1);
        alert(`⚠ ${todo.Title} is deleted...`);
      });
    }
  }

  submit(todoForm: NgForm) {
    const todo = todoForm.value;
    this.appService.addToDo(todo).subscribe(result => {
      alert(`✅ Task: ${todo.Title} is added...`);
      this.todos.push(result);
      todoForm.resetForm();
    });
  }

  update(todo: ToDo) {
    this.appService.updateToDo(todo).subscribe(response => {
      this.editToDo = undefined;
      alert(`✔ ToDo Updated...`);
    });
  }

  edit(todo: ToDo) {
    this.editToDo = {...todo};
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
