import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Priority} from '../../model/Priority';
import {MatDialog} from '@angular/material';
import {EditCategoryDialogComponent} from '../../dialog/edit-category-dialog/edit-category-dialog.component';
import {OperType} from '../../dialog/oper-type.enum';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {EditPriorityDialogComponent} from '../../dialog/edit-priority-dialog/edit-priority-dialog.component';

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.css']
})
export class PrioritiesComponent implements OnInit {
  static defaultColor = '#fff';

  // ----------------------- входящие параметры ----------------------------


  @Input()
  private priorities: [Priority];


  // ----------------------- исходящие действия----------------------------
  // изменили
  @Output()
  updatePriority = new EventEmitter<Priority>();
  // добавили
  @Output()
  addPriority = new EventEmitter<Priority>();
  // удалили
  @Output()
  deletePriority = new EventEmitter<Priority>();

  // -------------------------------------------------------------------------

  constructor( private dialog: MatDialog // для открытия нового диалогового окна (из текущего))
  ) {
  }

  ngOnInit(): void {
  }
  delete(priority: Priority): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить категорию: "${priority.name}"? (задачам проставится значение 'Без приоритета')`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePriority.emit(priority);
      }
    });
  }

  private onAddPriority(): void {


    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: ['', 'Добавление приоритета', OperType.ADD],
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newPriority = new Priority(null, result as string, PrioritiesComponent.defaultColor);
        this.addPriority.emit(newPriority);
      }
    });


  }

  private onEditPriority(priority: Priority): void {


    const dialogRef = this.dialog.open(EditPriorityDialogComponent, {data: [priority.name, 'Редактирование приоритета', OperType.EDIT]});

    dialogRef.afterClosed().subscribe(result => {

      if (result === 'delete') {
        this.deletePriority.emit(priority);
        return;
      }


      if (result) {
        priority.name = result as string;
        this.updatePriority.emit(priority);
        return;
      }
    });


  }
}
