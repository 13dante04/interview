import { Injectable } from '@angular/core';
import { Plantation } from './proxy/task-proxy.service';

@Injectable()
export class TaskService {

  tasks: Task[] = [];
  plantations: Plantation[] = [];
  constructor() { }


  getTasksFiltered() {
    throw new Error('Method not implemented.');
  }


  getTaskSingle(id: number) {
    throw new Error('Method not implemented.');
  }

  getAllPlantions() {
    throw new Error('Method not implemented.');
  }
}
