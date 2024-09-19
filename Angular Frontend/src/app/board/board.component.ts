import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  boards: any[] = [];
  newBoardTitle: string = '';
  listIds: string[] = []; 

  constructor(private boardService: LoginService) {}

  ngOnInit(): void {
    // Fetch boards when the component is initialized
    this.getBoards();
  }

  // Create a new board with validation
  createBoard(): void {
    if (!this.newBoardTitle.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a board title!'
      });
      return;
    }

    this.boardService.createBoard(this.newBoardTitle, this.listIds).subscribe(
      (board) => {
        this.boards.push(board);
        this.newBoardTitle = ''; 
        this.listIds = [];
        Swal.fire({
          icon: 'success',
          title: 'Board Created!',
          text: 'Your new board has been created successfully.'
        });
      },
      (error) => {
        console.error('Error creating board', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an issue creating the board. Please try again later.'
        });
      }
    );
  }

  // Fetch the boards from the backend for the user
  getBoards(): void {
    const userId = this.boardService.getUserId(); // Fetch userId from LoginService
    if (userId) {
      // If userId exists, fetch the boards
      this.boardService.getUserBoards(userId).subscribe(
        (boards: any) => {
          this.boards = boards;
          console.log('Board', this.boards);
        },
        (error) => {
          console.error('Error fetching boards:', error);
        }
      );
    } else {
      console.error('User ID is null.');
    }
  }
}
