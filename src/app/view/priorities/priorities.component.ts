import {Component, Input, OnInit} from '@angular/core';
import {Priority} from '../../model/Priority';
import {MatDialog} from '@angular/material';

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

  constructor( private dialog: MatDialog // для открытия нового диалогового окна (из текущего))
  ) {
  }

  ngOnInit(): void {
  }

}
