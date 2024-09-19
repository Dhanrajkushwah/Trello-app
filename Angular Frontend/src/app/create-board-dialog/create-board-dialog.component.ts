import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.css']
})
export class CreateBoardDialogComponent implements OnInit {

  boardTitle: string = '';
  boardColor: string = '#ffffff';

  constructor(private dialogRef: MatDialogRef<CreateBoardDialogComponent>) {}

  createBoard(): void {
    this.dialogRef.close({ title: this.boardTitle, color: this.boardColor });
  }
  ngOnInit(): void {
  }

}
