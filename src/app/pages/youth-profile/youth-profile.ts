import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Youth {
  id: number;
  firstName: string;
  lastName: string;
  createdAt: string;
}

interface YouthNote {
  id: number;
  youthId: number;
  note: string;
  createdAt: string;
  createdBy: string;
}

@Component({
  selector: 'app-youth-profile',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './youth-profile.html',
  styleUrl: './youth-profile.scss'
})
export class YouthProfile implements OnInit {

  youthId = 0;

  youth: Youth | null = null;
  notes: YouthNote[] = [];

  newNote = '';

  isLoading = true;
  isSavingNote = false;

  message = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    this.youthId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!this.youthId) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.loadYouth();
    this.loadNotes();
  }

  loadYouth(): void {

    this.http
      .get<Youth>(`/api/Youth/${this.youthId}`)
      .subscribe({
        next: (youth) => {
          this.youth = youth;
          this.isLoading = false;
        },

        error: () => {
          this.message =
            'Unable to load participant.';

          this.isLoading = false;
        }
      });
  }

  loadNotes(): void {

    this.http
      .get<YouthNote[]>(
        `/api/YouthNotes/youth/${this.youthId}`
      )
      .subscribe({
        next: (notes) => {
          this.notes = notes;
        },

        error: (error) => {
          console.error(
            'Unable to load notes:',
            error
          );
        }
      });
  }

  addNote(): void {

    const note = this.newNote.trim();

    if (!note) {
      this.message = 'Please enter a note.';
      return;
    }

    this.isSavingNote = true;
    this.message = '';

    this.http
      .post('/api/YouthNotes', {
        youthId: this.youthId,
        note: note
      })
      .subscribe({
        next: () => {

          this.newNote = '';
          this.isSavingNote = false;

          this.message =
            'Note saved successfully.';

          this.loadNotes();
        },

        error: (error) => {

          console.error(
            'Unable to save note:',
            error
          );

          this.message =
            'Unable to save note.';

          this.isSavingNote = false;
        }
      });
  }
}