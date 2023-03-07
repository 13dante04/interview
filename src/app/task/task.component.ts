import { Component, OnInit } from '@angular/core';
import { Plantation, TaskProxyService } from '../services/proxy/task-proxy.service';
import { BaseComponent } from '../base/base.component';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent extends BaseComponent implements OnInit {

  constructor(private _tsp: TaskProxyService) {
    super();
   }
  private plantationList$: Observable<Plantation[]> =  this._tsp.getPlantationList();
  plantationListFiltered$: Observable<Plantation[]> =  this.plantationList$;



  ngOnInit(): void {
    this.plantationListFiltered$ = this.plantationList$.pipe(
      map(plantationList => plantationList.filter(plantation => plantation.name.toLowerCase().startsWith('c')))
    );
  }
}
