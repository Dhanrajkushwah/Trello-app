import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() listId: string = '';
  cards: any[] = [];
  newCardTitle: string = '';
  selectedColor: string = '#ffffff'; // Default color

  constructor(private cardService: LoginService) {}

  ngOnInit(): void {
    this.getCards();
  }

  createCard(): void {
    if (!this.newCardTitle.trim()) {
      // SweetAlert2 notification for empty card title
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Card title cannot be empty!',
      });
      return;
    }

    this.cardService.createCard(this.newCardTitle, this.listId).subscribe(
      (card) => {
        this.cards.push(card);
        this.newCardTitle = '';

        // SweetAlert2 notification for successful card creation
        Swal.fire({
          icon: 'success',
          title: 'Card Created!',
          text: `The card "${card.title}" has been created successfully.`,
          timer: 1500,
          showConfirmButton: false
        });
      },
      (error) => {
        // SweetAlert2 notification for error during card creation
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error creating the card. Please try again later.',
        });
        console.error('Error creating card', error);
      }
    );
  }

  getCards(): void {
    this.cardService.getCardsByList(this.listId).subscribe(
      (cards) => this.cards = cards,
      (error) => console.error('Error fetching cards', error)
    );
  }

  dropCard(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  }

  // Parent component class
  handleColorChange(color: string): void {
    this.selectedColor = color;
  }
}
