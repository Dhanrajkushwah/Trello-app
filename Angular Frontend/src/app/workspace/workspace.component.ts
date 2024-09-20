import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

export interface Member {
  name: string;
  email: string;
  lastActive: Date;
}

export interface Workspace {
  name: string;
  members: Member[];
  maxMembers: number;
  inviteLink?: string;
}

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {
 
  // Workspace object
  workspace: Workspace | null = null;

  // Placeholder for new invite email
  inviteEmail: string = '';

  constructor() { }

  ngOnInit(): void {
    // Simulate fetching workspace data from a service or API
    this.workspace = {
      name: 'Development Team',
      members: [
        { name: 'John Doe', email: 'john@example.com', lastActive: new Date('2024-09-15') },
        { name: 'Jane Smith', email: 'jane@example.com', lastActive: new Date('2024-09-10') }
      ],
      maxMembers: 10,
      inviteLink: 'https://example.com/invite/abc123' // This can be dynamically generated later
    };
  }

  // Function to handle member invitation
  inviteMember(): void {
    if (this.inviteEmail) {
      console.log(`Inviting ${this.inviteEmail} to workspace`);
      // Implement actual invite logic, like calling a service
      this.inviteEmail = ''; // Clear input after invite
    } else {
      alert('Please enter an email address to invite.');
    }
  }

  // Function to generate a new invite link
  generateNewInviteLink(): void {
    this.workspace!.inviteLink = `https://example.com/invite/${Math.random().toString(36).substr(2, 9)}`;
  }
}