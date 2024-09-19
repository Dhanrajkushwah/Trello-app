import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';
import { ListComponent } from './list/list.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { TableComponent } from './table/table.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ViewboardComponent } from './viewboard/viewboard.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signupform', component: RegisterComponent },
  { path: 'loginform', component: LoginComponent },
  //{ path: '', redirectTo: '/loginform', pathMatch: 'full' },
  { 
    path: '', 
    loadChildren: () => import('./landingpage/landingpage.module').then(m => m.LandingpageModule) 
  },
  // { path: 'board', component: BoardComponent },
  // { path: 'list', component: ListComponent },
  { path: 'board', component: BoardComponent },
  { path: 'viewboard/:id', component: ViewboardComponent },
  { path: 'list/:id', component: ListComponent },
  { path: 'card', component: CardComponent },
  { path: 'members', component: WorkspaceComponent },
  { path: 'table', component: TableComponent },
  { path: 'calendar', component: CalendarComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
