import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Task } from '../../model/Task';
import {DataHandlerService} from '../../service/data-handler.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {EditTaskDialogComponent} from '../../dialog/edit-task-dialog/edit-task-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
///////  export class TasksComponent implements OnInit, AfterViewInit {
export class TasksComponent implements OnInit, AfterViewInit  {

  // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
 // private displayedColumns: string[] = ['color', 'id', 'name', 'date', 'priority', 'category'];
  private displayedColumns: string[] = ['color', 'id', 'name', 'date', 'priority', 'category', 'operations', 'select'];
  private dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы

  // ссылки на компоненты таблицы
  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;



  // поиск
  private searchTaskText: string; // текущее значение для поиска задач
  private selectedStatusFilter: boolean = null;   // по-умолчанию будут показываться задачи по всем статусам (решенные и нерешенные)

  private tasks: Task[];

  // текущие задачи для отображения на странице
  @Input('tasks')
  private set setTasks(tasks: Task[]) { // напрямую не присваиваем значения в переменную, только через @Input
    this.tasks = tasks;
    this.refreshTable();
  }

  @Output()
  updateTask = new EventEmitter<Task>();

  @Output()
  deleteTask = new EventEmitter<Task>();

  @Output()
  filterByTitle = new EventEmitter<string>();

  @Output()
  filterByStatus = new EventEmitter<boolean>();

  constructor(private dataHandler: DataHandlerService,
              private dialog: MatDialog) {}

  ngOnInit() {
    //   this.dataHandler.taskSubject.subscribe(tasks => this.tasks = tasks);
    //  this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)
  this.dataSource = new MatTableDataSource();
  this.refreshTable();
  }

  // в этом методе уже все проинциализировано, поэтому можно присваивать объекты (иначе может быть ошибка undefined)

  ngAfterViewInit(): void {
    this.addTableObjects();
  }



  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
  }

  // в зависимости от статуса задачи - вернуть цвет названия
  private getPriorityColor(task: Task) {

    // цвет завершенной задачи
    if (task.completed) {
      return '#F8F9FA'; // TODO вынести цвета в константы (magic strings, magic numbers)
    }

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return '#fff'; // TODO вынести цвета в константы (magic strings, magic numbers)

  }

  // показывает задачи с применением всех текущий условий (категория, поиск, фильтры и пр.)
  private refreshTable() {

    if (!this.dataSource) {
      return;
    }

    this.dataSource.data = this.tasks; // обновить источник данных (т.к. данные массива tasks обновились)

    this.addTableObjects();


    // когда получаем новые данные..
    // чтобы можно было сортировать по столбцам "категория" и "приоритет", т.к. там не примитивные типы, а объекты
    // @ts-ignore - показывает ошибку для типа даты, но так работает, т.к. можно возвращать любой тип
    this.dataSource.sortingDataAccessor = (task, colName) => {

      // по каким полям выполнять сортировку для каждого столбца
      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority.id : null;
        }
        case 'category': {
          return task.category ? task.category.name : null;
        }
        case 'date': {
          return task.date ? task.date : null;
        }

        case 'name': {
          return task.name;
        }
      }
    };

  }

  private addTableObjects() {
    this.dataSource.sort = this.sort; // компонент для сортировки данных (если необходимо)
    this.dataSource.paginator = this.paginator; // обновить компонент постраничности (кол-во записей, страниц)
  }

  // диалоговое редактирования для добавления задачи
  private openEditTaskDialog(task: Task): void {

    // открытие диалогового окна
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'Редактирование задачи'],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      // обработка результатов

      if (result === 'complete') {
        task.completed = true; // ставим статус задачи как выполненная
        this.updateTask.emit(task);
      }

      if (result === 'activate') {
        task.completed = false; // возвращаем статус задачи как невыполненная
        this.updateTask.emit(task);
        return;
      }

      if (result === 'delete') {
        this.deleteTask.emit(task);
        return;
      }

      if (result as Task) { // если нажали ОК и есть результат
        this.updateTask.emit(task);
        return;
      }

    });
  }

  onClickTask(task: Task) {
    this.updateTask.emit(task);
  }

  // диалоговое окно подтверждения удаления
  private openDeleteDialog(task: Task) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {dialogTitle: 'Подтвердите действие', message: `Вы действительно хотите удалить задачу: "${task.name}"?`},
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // если нажали ОК
        this.deleteTask.emit(task);
      }
    });
  }

  private onToggleStatus(task: Task) {
    task.completed = !task.completed;
    this.updateTask.emit(task);
  }

  // фильтрация по названию
  private onFilterByTitle() {
    this.filterByTitle.emit(this.searchTaskText);
  }

  // фильтрация по статусу
  private onFilterByStatus(value: boolean) {

    // на всякий случай проверяем изменилось ли значение (хотя сам гуишный компонент должен это делать)
    if (value !== this.selectedStatusFilter) {
      this.selectedStatusFilter = value;
      this.filterByStatus.emit(this.selectedStatusFilter);
    }


}
}
