import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {

  name: string;
}


@Component({
  selector: 'app-add-player-dialog',
  templateUrl: './add-player-dialog.component.html',
  styleUrls: ['./add-player-dialog.component.scss'],
})
export class AddPlayerDialogComponent implements OnInit {

  name: string = '';

  constructor( public dialog: MatDialog, public dialogRef: MatDialogRef<AddPlayerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  ngOnInit(): void {}
  onNoClick() : void {
    
    this.dialogRef.close();

  }

}
