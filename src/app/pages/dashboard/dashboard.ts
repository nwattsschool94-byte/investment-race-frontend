import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Youth {
  id: number;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  firstName = 'Social Worker';
  fullName = 'Social Worker';

  youths: Youth[] = [];
  isLoadingYouth = true;
  showAddYouth = false;

newYouth = {
  firstName: '',
  lastName: ''
};

searchName = '';
searchResults: Youth[] = [];
isSearching = false;
searchMessage = '';
isAddingYouth = false;
addYouthMessage = '';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    const storedUser =
      localStorage.getItem('levelUpUser');

    if (storedUser) {
      const user = JSON.parse(storedUser);

      this.firstName = user.firstName;
      this.fullName =
        `${user.firstName} ${user.lastName}`;
    }

    this.loadYouths();
  }

  loadYouths(): void {

    this.http
      .get<Youth[]>('/api/Youth')
      .subscribe({
        next: (youths) => {
          this.youths = youths;
          this.isLoadingYouth = false;
        },

        error: (error) => {
          console.error(
            'Unable to load youth:',
            error
          );

          this.isLoadingYouth = false;
        }
      });
  }

  logout(): void {
    localStorage.removeItem('levelUpUser');
    localStorage.removeItem('levelUpToken');

    this.router.navigate(['/login']);
  }

  openAddYouth(): void {
  this.showAddYouth = true;
  this.addYouthMessage = '';
}

closeAddYouth(): void {

  this.showAddYouth = false;

  this.newYouth = {
    firstName: '',
    lastName: ''
  };

  this.searchName = '';
  this.searchResults = [];
  this.searchMessage = '';
  this.addYouthMessage = '';
}

addYouth(): void {

  if (
    !this.newYouth.firstName.trim() ||
    !this.newYouth.lastName.trim()
  ) {
    this.addYouthMessage =
      'Please enter a first and last name.';

    return;
  }

  this.isAddingYouth = true;
  this.addYouthMessage = '';

  this.http
    .post('/api/Youth', this.newYouth)
    .subscribe({
      next: () => {

        this.isAddingYouth = false;

        this.newYouth = {
          firstName: '',
          lastName: ''
        };

        this.showAddYouth = false;

        // Refresh the youth list
        this.loadYouths();
      },

      error: (error) => {

        console.error(
          'Unable to add youth:',
          error
        );

        this.addYouthMessage =
          error.error?.message ??
          'Unable to add youth.';

        this.isAddingYouth = false;
      }
    });
}

searchYouth(): void {

  const name = this.searchName.trim();

  if (!name) {
    this.searchMessage = 'Enter a name to search.';
    return;
  }

  this.isSearching = true;
  this.searchMessage = '';
  this.searchResults = [];

  this.http
    .get<Youth[]>(
      `/api/Youth/search?name=${encodeURIComponent(name)}`
    )
    .subscribe({
      next: (results) => {

        this.searchResults = results;
        this.isSearching = false;

        if (results.length === 0) {
          this.searchMessage =
            'No existing youth found. You can create a new participant below.';
        }
      },

      error: () => {
        this.searchMessage =
          'Unable to search participants.';

        this.isSearching = false;
      }
    });
}


addExistingYouth(youth: Youth): void {

  this.http
    .post(`/api/Youth/${youth.id}/add`, {})
    .subscribe({
      next: () => {

        this.searchMessage =
          `${youth.firstName} ${youth.lastName} added to your list.`;

        this.searchResults =
          this.searchResults.filter(
            result => result.id !== youth.id
          );

        this.loadYouths();
      },

      error: (error) => {

        this.searchMessage =
          error.error?.message ??
          'Unable to add participant.';
      }
    });
}
}