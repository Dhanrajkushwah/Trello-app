import { Component, OnInit } from '@angular/core';
interface CalendarEvent {
  date: Date;
  title: string;
  description?: string;
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentDate: Date;
  days: number[];
  currentMonth: string;
  currentYear: number;
  events: CalendarEvent[];

  constructor() {
    this.currentDate = new Date();
    this.days = [];
    this.currentMonth = '';
    this.currentYear = 0;

    // Sample events data (you can pull this dynamically from a service/API)
    this.events = [
      { date: new Date(this.currentYear, 8, 25), title: 'Festival Day', description: 'A local festival.' },
      { date: new Date(this.currentYear, 8, 10), title: 'Conference', description: 'Tech conference.' },
      { date: new Date(this.currentYear, 8, 15), title: 'Birthday Party', description: 'Friend’s birthday.' },
    ];
  }

  ngOnInit(): void {
    this.loadCalendar(this.currentDate);
  }

  loadCalendar(date: Date): void {
    this.currentMonth = date.toLocaleString('default', { month: 'long' });
    this.currentYear = date.getFullYear();

    const firstDayOfMonth = new Date(this.currentYear, date.getMonth(), 1);
    const lastDayOfMonth = new Date(this.currentYear, date.getMonth() + 1, 0);

    const totalDays = lastDayOfMonth.getDate();
    const startDay = firstDayOfMonth.getDay(); // Day index (0 = Sunday, 6 = Saturday)

    this.days = Array(startDay).fill(0).concat([...Array(totalDays).keys()].map(i => i + 1));
  }

  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.loadCalendar(this.currentDate);
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.loadCalendar(this.currentDate);
  }

  // Check if a day has an event
  hasEvent(day: number): CalendarEvent | undefined {
    const eventDate = new Date(this.currentYear, this.currentDate.getMonth(), day);
    return this.events.find(event => event.date.toDateString() === eventDate.toDateString());
  }
}