import { Component, OnInit } from '@angular/core';
interface Card {
  title: string;
  listName: string;
  labels: string[];
  members: string[];
  dueDate: Date;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  cards: Card[] = [
    {
      title: 'Task 1',
      listName: 'To Do',
      labels: ['Urgent', 'Feature'],
      members: ['Dhanraj', 'Akash'],
      dueDate: new Date('2024-09-15')
    },
    {
      title: 'Task 2',
      listName: 'Doing',
      labels: ['Bug'],
      members: ['Vikram'],
      dueDate: new Date('2024-09-18')
    },
    {
      title: 'Task 3',
      listName: 'Done',
      labels: ['Enhancement'],
      members: ['Dhanraj'],
      dueDate: new Date('2024-09-20')
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

