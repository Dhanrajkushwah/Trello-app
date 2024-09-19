import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() boardId: string = '';
  lists: any[] = [];
  newListTitle: string = '';

  constructor(private listService: LoginService) {}

  ngOnInit(): void {
    this.getLists();
  }

  createList(): void {
    if (!this.newListTitle.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'List title cannot be empty!',
      });
      return;
    }

    this.listService.createList(this.newListTitle, this.boardId).subscribe(
      (list) => {
        this.lists.push(list);
        this.newListTitle = '';

        // Success Alert
        Swal.fire({
          icon: 'success',
          title: 'List Created!',
          text: `The list "${list.title}" has been created successfully.`,
          timer: 1500,
          showConfirmButton: false
        });
      },
      (error) => {
        // Error Alert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error creating the list. Please try again later.',
        });
        console.error('Error creating list', error);
      }
    );
  }

  getLists(): void {
    this.listService.getListsByBoard(this.boardId).subscribe(
      (lists) => this.lists = lists,
      (error) => console.error('Error fetching lists', error)
    );
  }

  dropList(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
  }

  // Drag-and-drop card functionality
  dropCard(event: CdkDragDrop<any[]>, listIndex: number): void {
    if (event.previousContainer === event.container) {
      // Reorder cards within the same list
      moveItemInArray(this.lists[listIndex].cards, event.previousIndex, event.currentIndex);
    } else {
      // Move card from one list to another
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
