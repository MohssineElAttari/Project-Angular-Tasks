import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTask();
  }

  confirmBox(task: Task) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
        this.deleteTask(task.id!);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'error'
        )
      }
    })
  }

  myTask: Task = {
    'label': '',
    'completed': false
  }

  tasks: Task[] = [];

  resultTasks: Task[] = [];

  editForm: boolean = false;

  showForm: boolean = false;

  searchText: string = '';

  getTask() {
    this.taskService.findAll()
      .subscribe(tasks => this.resultTasks = this.tasks = tasks);
  }
  deleteTask(id: number) {
    this.taskService.delete(id).subscribe(() => {
      this.resultTasks = this.tasks = this.tasks.filter(task => task.id != id);
    })
  }

  persistTask() {
    this.taskService.persist(this.myTask).subscribe((task) => {
      this.resultTasks = this.tasks = [task, ...this.tasks];
      this.resteTask();
      this.showForm = false;
    })
  }

  resteTask() {
    this.myTask = {
      'label': '',
      'completed': false
    }
  }

  toggleCompleted(task: Task) {
    this.taskService.completed(task).subscribe(
      () => {
        task.completed = !task.completed;
      }
    )
  }

  editeTask(task: Task) {
    this.myTask = task;
    this.editForm = true;
    this.show();
    // console.log(this.myTask);

  }

  updateTask() {
    this.taskService.update(this.myTask)
      .subscribe(
        task => {
          this.resteTask();
          this.editForm = false;
        }
      );

  }

  show() {
    this.showForm = true;
  }

  searchTasks() {
    this.resultTasks = this.tasks.filter((task) => task.label.toLowerCase().includes(this.searchText.toLowerCase()));
  }
}
