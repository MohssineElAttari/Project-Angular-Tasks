import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiURL = "http://localhost:5000/tasks";
  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Task[]>(this.apiURL);
  }

  delete(id: any) {
    return this.http.delete(`${this.apiURL}/${id}`)
  }

  persist(task: Task) {
    return this.http.post<Task>(this.apiURL, task);
  }
  completed(task: Task) {
    return this.http.patch(`${this.apiURL}/${task.id}`, { completed: !task.completed });
  }

  update(task: Task) {
    return this.http.put(`${this.apiURL}/${task.id}`, task);
  }

  
}
