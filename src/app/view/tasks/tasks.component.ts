import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Task} from '../../model/Task';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы

  tasks: Task[];

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit() {
  //  this.tasks = this.dataHandler.getTasks();
    this.dataHandler.taskSubject.subscribe(tasks => this.tasks = tasks);

    this.dataSource = new MatTableDataSource();

    this.refreshTable();
  }

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
  }


  private getPriorityColor(task: Task) {

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return '#fff';

  }

  private refreshTable() {

    this.dataSource.data = this.tasks; // обновить источник данных (т.к. данные массива tasks обновились)


  }
}
