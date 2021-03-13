import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-add-player-dialog',
  templateUrl: './add-player-dialog.component.html',
  styleUrls: ['./add-player-dialog.component.scss'],
})
export class AddPlayerDialogComponent implements OnInit {
  name: string = '';


  ngOnInit(): void {}
  onNoClick() {
    
  }

}
