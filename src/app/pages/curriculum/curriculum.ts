import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface CurriculumLesson {
  number: number;
  title: string;
  description: string;
  topics: string[];
  route: string;
  worksheetFile?: string;
}

@Component({
  selector: 'app-curriculum',
  imports: [CommonModule, RouterLink],
  templateUrl: './curriculum.html',
  styleUrl: './curriculum.scss'
})
export class Curriculum {

lessons: CurriculumLesson[] = [
  {
    number: 1,
    title: 'Where Money Comes From',
    description:
      'Understand how money is created through lending and why credit matters.',
    topics: [
      'Money Creation',
      'Lending',
      'Interest',
      'Credit Scores'
    ],
    route: '/curriculum/lesson/1'
  },

  {
    number: 2,
    title: 'The Time Value of Money & Investing',
    description:
      'Learn how money grows over time and how investing, risk, and diversification work.',
    topics: [
      'Compounding',
      'Inflation',
      'Investing',
      'Risk & Reward',
      'Diversification'
    ],
    route: '/curriculum/lesson/2',
    worksheetFile:
      '/curriculum/class-2-student-worksheet.docx'
  },

  {
    number: 3,
    title: 'Asset Management & Wealth Building',
    description:
      'Understand how ownership, financial habits, assets, and debt affect wealth.',
    topics: [
      'Assets',
      'Liabilities',
      'Debt',
      'Ownership',
      'Wealth Building'
    ],
    route: '/curriculum/lesson/3'
  }
];
}