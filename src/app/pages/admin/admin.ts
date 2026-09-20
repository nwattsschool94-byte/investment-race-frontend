import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface PendingUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin implements OnInit {

  pendingUsers: PendingUser[] = [];
  isLoading = true;
  message = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPendingUsers();
  }

  loadPendingUsers(): void {
    this.isLoading = true;

    this.http
      .get<PendingUser[]>('/api/admin/pending')
      .subscribe({
        next: (users) => {
          this.pendingUsers = users;
          this.isLoading = false;
        },
        error: () => {
          this.message = 'Unable to load pending accounts.';
          this.isLoading = false;
        }
      });
  }

  approveUser(user: PendingUser): void {
    this.http
      .put(`/api/admin/approve/${user.id}`, {})
      .subscribe({
        next: () => {
          this.message =
            `${user.firstName} ${user.lastName} has been approved.`;

          this.pendingUsers =
            this.pendingUsers.filter(x => x.id !== user.id);
        },
        error: () => {
          this.message = 'Unable to approve this account.';
        }
      });
  }
}