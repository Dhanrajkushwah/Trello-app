import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Workspace } from './Models/workspace.model';
import { Member } from './Models/member.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private workspaces: Workspace[] = [
    new Workspace('1', 'Trello Workspace', [
      new Member('1', 'Dhanraj Kushwah', 'dhanraj@example.com', 'Admin', new Date('2024-09-01'))
    ], 'https://example.com/invite/1')
  ];
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private _http: HttpClient) { 
    const token = localStorage.getItem('token');
    this.isAuthenticatedSubject.next(!!token);
  }
    // Register User
  signup(obj: any): Observable<any> {
    return this._http.post<any>(`${environment._api}/api/user/signup`, obj);
  }

  // Log in user
  login(obj: any): Observable<any> {
    return this._http.post<any>(`${environment._api}/api/user/login`, obj).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          // Update the authentication state
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

 // Log out user
 logout(): void {
  localStorage.removeItem('token');
  this.isAuthenticatedSubject.next(false);
}

// Get current authentication state
isLoggedIn(): boolean {
  return this.isAuthenticatedSubject.getValue();
}

// Get authorization headers
getAuthHeaders(): HttpHeaders {
  const token = localStorage.getItem('token');
  return new HttpHeaders().set('Authorization', `Bearer ${token}`);
}

// Get token from local storage
getToken(): string | null {
  return localStorage.getItem('token');
}

// Fetch workspace data
getWorkspaceById(id: string): Observable<Workspace> {
  return this._http.get<Workspace>(`${environment._api}/api/user/workspaces/${id}`);
}

// Add a new member
addMember(workspaceId: string, member: { name: string; email: string }): Observable<any> {
  return this._http.post<any>(`${environment._api}/api/user/workspaces/${workspaceId}/members`, member);
}


// Generate a new invite link
generateInviteLink(workspaceId: string): Observable<{ inviteLink: string }> {
  return this._http.post<{ inviteLink: string }>(`${environment._api}/api/user/workspaces/${workspaceId}invite-link`, {});
}


  // Common options for HTTP requests, e.g., headers
  private httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`  // Adjust the token retrieval logic as needed
      })
    };
  }
 // Get the current user ID from the token
 getUserId(): string | null {
  const token = this.getToken();

  if (token) {
    try {
      const decodedToken: any = jwtDecode(token); 
      return decodedToken.id;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  } else {
    console.error('No token found!');
    return null;
  }
}

createBoard(title: string, listIds: string[]): Observable<any> {
  return this._http.post<any>(`${environment._api}/api/user/boards/create`, { title, listIds }, {
    headers: new HttpHeaders({
       'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  });
}


getUserBoards(userId: string): Observable<any> {
  const headers = this.getAuthHeaders();
  return this._http.get(`${environment._api}/api/user/boards/user/${userId}`, { headers });  // Corrected URL
}
getBoardById(boardId: string): Observable<any> {
  return this._http.get<any>(`${environment._api}/api/user/boards/${boardId}`, {
    headers: new HttpHeaders({
       'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  });
}
createList(title: string, boardId: string): Observable<any> {
  return this._http.post<any>(`${environment._api}/api/user/lists/create`, { title, boardId }, {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Replace with actual token
    })
  });
}

getListsByBoard(boardId: string): Observable<any[]> {
  return this._http.get<any[]>(`${environment._api}/api/user/lists/board/${boardId}`, {
    headers: new HttpHeaders({
       'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  });
}
// Create a new card
createCard(title: string, listId: string): Observable<any> {
  return this._http.post<any>(`${environment._api}/api/user/cards/create`, { title, listId }, {
    headers: new HttpHeaders({
       'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  });
}

getCardsByList(listId: string): Observable<any[]> {
  return this._http.get<any[]>(`${environment._api}/api/user/cards/list/${listId}`, {
    headers: new HttpHeaders({
       'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  });
}
}
