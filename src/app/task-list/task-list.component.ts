import { Component, OnInit } from '@angular/core';
import { Plantation, Task, TaskFull, TaskProxyService } from '../services/proxy/task-proxy.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent extends BaseComponent implements OnInit  {
  selectedTask: TaskFull | undefined;
  constructor() {

    super();
  }

  ngOnInit(): void {

  }


  filterTasks() {

  }


  selectTask(taskID: number) {

  }
}
