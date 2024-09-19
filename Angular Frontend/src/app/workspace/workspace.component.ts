import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Workspace } from '../Models/workspace.model';
import { Member } from '../Models/member.model';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {
  workspace: Workspace = {
    id: '',
    name: '',
    members: [],
    inviteLink: '',
    maxMembers: 0
  };
  inviteEmail: string = '';

  constructor(private workspaceService: LoginService) {}

  ngOnInit() {
    this.workspaceService.getWorkspaceById('1').subscribe({
      next: (data: Workspace) => {
        this.workspace = data;
        console.log('Workspace loaded:', this.workspace); // Check workspace details
      },
      error: (err) => console.error('Error fetching workspace data', err)
    });
  }

  // Invite a new member by email
  inviteMember() {
    if (this.inviteEmail) {
      console.log('Workspace ID:', this.workspace.id); // Check if the ID is available
      const newMember = {
        id: (this.workspace.members.length + 1).toString(),
        name: this.inviteEmail.split('@')[0],
        email: this.inviteEmail,
        role: 'Member',
        lastActive: new Date()
      };
      this.workspaceService.addMember(this.workspace.id, newMember).subscribe({
        next: () => this.inviteEmail = '',
        error: (err) => console.error('Error inviting member', err)
      });
    }
  }
  

  // Generate a new invite link
  generateNewInviteLink() {
    this.workspaceService.generateInviteLink(this.workspace.id).subscribe({
      next: (response: { inviteLink: string }) => {
        this.workspace.inviteLink = response.inviteLink;
        alert(`New invite link generated: ${this.workspace.inviteLink}`);
      },
      error: (err) => console.error('Error generating invite link', err)
    });
  }
}