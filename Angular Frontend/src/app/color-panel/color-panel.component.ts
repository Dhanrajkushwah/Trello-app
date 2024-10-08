import { Component, OnInit, Output, EventEmitter  } from '@angular/core';

enum colors {
  RED = "#e92c64",
  GREEN = "#009886",
  BLUE = "#208eed",
  VIOLET = "#912f84",
  YELLOW = "#b36619",
  PINK = "#6e1d96"
}


@Component({
  selector: 'app-color-panel',
  templateUrl: './color-panel.component.html',
  styleUrls: ['./color-panel.component.css']
})
export class ColorPanelComponent implements OnInit {
  @Output() emitColor: EventEmitter<string> = new EventEmitter();

  colorsData = ['#e92c64', '#009886', '#208eed', '#912f84', '#b36619', '#6e1d96'];

  onColorEmit(color: string) {
    this.emitColor.emit(color);
  }
  
  ngOnInit(): void {
  }
}
