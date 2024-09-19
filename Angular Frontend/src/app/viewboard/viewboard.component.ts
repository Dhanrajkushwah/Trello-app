import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service'; // Adjust import based on your service location
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-viewboard',
  templateUrl: './viewboard.component.html',
  styleUrls: ['./viewboard.component.css']
})
export class ViewboardComponent implements OnInit {
  @Input() listId!: string;
  board: any; // Define the type according to your board model
  boardId: string | null = '';
  cards: any[] = [];
list: any;
  constructor(
    private route: ActivatedRoute,private router: Router,
    private loginService: LoginService // Use your service to fetch board data
  ) {}

  ngOnInit(): void {
    this.boardId = this.route.snapshot.paramMap.get('id'); // Get board ID from route
    if (this.boardId) {
      this.fetchBoardDetails(this.boardId);
    } 
    console.log('Received listId:', this.listId); // Log to check listId
    if (this.listId) {
      this.getCards();
    } else {
      console.error('List ID is missing in ngOnInit');
    }
  }

  fetchBoardDetails(boardId: string): void {
    this.loginService.getBoardById(boardId).subscribe(
      (board: any) => {
        this.board = board; // Store the board details
      },
      (error) => {
        console.error('Error fetching board details:', error);
      }
    );
  }
  getCards(): void {
    this.loginService.getCardsByList(this.listId).subscribe(cards => {
      this.cards = cards;
    });
  }
  // Handles the card addition
  addCard(list: any) {
    const newTaskTitle = prompt('Enter the task title:');
    if (newTaskTitle) {
      list.tasks.push({ title: newTaskTitle });
    }
  }

 // Handle list reordering
 dropList(event: CdkDragDrop<string[]>, listIndex: number) {
  moveItemInArray(this.board.lists, event.previousIndex, event.currentIndex);
  console.log('Reordered lists:', this.board.lists);
}

// Handle task (card) reordering within the same list or between lists
dropCard(event: CdkDragDrop<any[]>, list: any) {
  if (event.previousContainer === event.container) {
    // Move task within the same list
    moveItemInArray(list.tasks, event.previousIndex, event.currentIndex);
  } else {
    // Transfer task to a different list
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
  console.log('Updated tasks:', this.board.lists);
}
}