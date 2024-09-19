import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BoardComponent } from './board/board.component';
import { ListComponent } from './list/list.component';
import { CardComponent } from './card/card.component';
import {MatMenuModule} from '@angular/material/menu';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { WorkspaceComponent } from './workspace/workspace.component';
import { TableComponent } from './table/table.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CreateBoardDialogComponent } from './create-board-dialog/create-board-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ColorPanelComponent } from './color-panel/color-panel.component';
import { ViewboardComponent } from './viewboard/viewboard.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BoardComponent,
    ListComponent,
    CardComponent,
    WorkspaceComponent,
    TableComponent,
    CalendarComponent,
    CreateBoardDialogComponent,
    ColorPanelComponent,
    ViewboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatListModule,
    DragDropModule,
    MatMenuModule,
    MatDialogModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
