import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskProxyService {

  constructor() { }


   getTasks(filter?: TasksFilter): Observable<Task[]> {
    return from(this._getTasks(filter));
  }

   getPlantationList(): Observable<Plantation[]> {
    return from(this._getPlantationList());
  }

   getTaskByID(id: number): Observable<TaskFull> {
   return from(this._getTaskByID(id));
  }



  private async  _getTasks(filter?: TasksFilter): Promise<Task[]> {
   try {
    let allTasks = await this.getTasksObject();
    if(filter) {
      if(filter.name?.length) {
        allTasks = allTasks.filter((task: Task) => {
          return task.name.toLowerCase().includes(filter.name!.toLowerCase());
        });
      }
      if(filter.plantationIDs?.length) {
        allTasks = allTasks.filter((task: Task) => {
          return filter.plantationIDs!.includes(task.plantationID);
        });
      }

      if(filter.orderBy) {
        allTasks = allTasks.sort((a: Task, b: Task) => {
          if(a[filter.orderBy! as keyof Task] < b[filter.orderBy! as keyof Task]) return -1;
          if(a[filter.orderBy! as keyof Task] > b[filter.orderBy! as keyof Task]) return 1;
          return 0;
        });
        if(filter.orderDirection === 'desc') allTasks.reverse();
      }
      if(filter.paging) {
        allTasks = allTasks.slice(filter.paging.offset, filter.paging.offset + filter.paging.limit);
      }
    }

    return allTasks;
   } catch(e) {
    throw e;
   }
  }

  private async _getTaskByID(id: number): Promise<TaskFull> {
    let allTasks = await this.getTasksObject();

    return allTasks.find((task: TaskFull) => task.id === id);
  }

  private async _getPlantationList(): Promise<Plantation[]> {
    let allPlantations = await this.getPlantationsObject();
    return allPlantations;
  }

  private async getTasksObject() {
    let allTasksResponse = await fetch('../../assets/data/tasks.json');
    let allTasksJson = await allTasksResponse.text();
    console.log(allTasksJson);

    let allTasks = [];
    if (allTasksJson) {
      allTasks = JSON.parse(allTasksJson, SwaggerHelpers.jsonParseReviver);
    }
    return allTasks;
  }

  private async getPlantationsObject() {
    let allPlantationsResponse = await fetch('../../assets/data/plantations.json');
    let allPlantationsJson = await allPlantationsResponse.text();

    let allPlantations = [];
    if (allPlantationsJson) {
      allPlantations = JSON.parse(allPlantationsJson, SwaggerHelpers.jsonParseReviver);
    }
    return allPlantations;
  }


}


export type Plantation = {
  id: number;
  name: string;
}
export type TaskFull = {
  id: number;
  plantationID: number;
  name: string;
  description: string;
  status: string;
}

export type Task = Omit<TaskFull, 'description'>;

export type TasksFilter = {
  plantationIDs?: number[];
  name: string;
} & BaseFilter;

export type Paging = {
  limit: number;
  offset: number;

}
export type BaseFilter = {
  paging?: Paging;
  orderBy?: keyof Task;
  orderDirection?: 'asc' | 'desc';
}

export default class SwaggerHelpers {
  public static jsonParseReviver = function(key: any, value: any) {
    if (value && typeof value === 'object') {
      for (var k in value) {
        if (/^[A-Z]{2}/.test(k) && Object.hasOwnProperty.call(value, k)) {
          value[k.toLowerCase()] = value[k];
          delete value[k];
        }
        if (/^[A-Z]/.test(k) && Object.hasOwnProperty.call(value, k)) {
          value[k.charAt(0).toLowerCase() + k.substring(1)] = value[k];
          delete value[k];
        }
      }
    }
    return value;
  };

  public static mapPlainJsonObjectToNSwag(object: any) {
    if (!object) return null;
    let propNames = Object.getOwnPropertyNames(object);
    object.toJSON = toJSON;
    propNames.forEach(name => {
      let childObject = object[name];
      if (childObject && typeof childObject === 'object') {
        childObject.toJSON = toJSON;
        this.mapPlainJsonObjectToNSwag(childObject);
      }
    });
    return object;
  }
}

function toJSON(this: any, data?: any) {
  data = typeof data === 'object' ? data : {};

  function addArray(array: Array<any>): any[] {
    let returnValue: Array<any> = [];
    array.forEach(item => {
      if (typeof item === 'object' && !item.toJSON) item.toJSON = toJSON;
      if (Array.isArray(item)) {
        returnValue.push(addArray(item));
      } else if (typeof item === 'object') {
        returnValue.push(item.toJSON());
      } else {
        returnValue.push(item);
      }
    });
    return returnValue;
  }

  let objectProperties = Object.getOwnPropertyNames(this);
  objectProperties.forEach(prop => {
    if (Array.isArray(this[prop])) {
      data[prop] = addArray(this[prop]);
    } else if (data[prop] instanceof Date) {
      data[prop] = this[prop].toISOString();
    } else if (typeof data[prop] === 'object') {
      data[prop] = this[prop] ? this[prop].toJSON() : <any>undefined;
    } else {
      data[prop] = this[prop];
    }
  });
  return data;
}
