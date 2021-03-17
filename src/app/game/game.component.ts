import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;
  name: string;
  gameId: string;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.newGame();

    this.route.params.subscribe((params) => {
      console.log(params.id);
      this.gameId = params.id;
    });

    this.openDialog();
    this.firestore
      .collection('games')
      .doc(this.gameId)
      .valueChanges()
      .subscribe((game: any) => {
        console.log('Game update', game);
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
      });
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (this.game.players.length > 1) {
      if (!this.pickCardAnimation) {
        this.currentCard = this.game.stack.pop();
        this.pickCardAnimation = true;

        console.log('New Card:', this.currentCard);
        console.log('Game is:', this.game);

        this.game.currentPlayer++;

        this.game.currentPlayer =
          this.game.currentPlayer % this.game.players.length;

        setTimeout(() => {
          this.game.playedCards.push(this.currentCard);
          this.pickCardAnimation = false;
        }, 1500);
      }
    } else {
      alert('Add 2 players');
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerDialogComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  saveGame() {
    this.firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson());
  }
}
