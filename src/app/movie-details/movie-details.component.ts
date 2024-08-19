import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: { movie: any }) {}


  ngOnInit(): void {
    this.movie = this.data.movie; // Assign the movie data
  }
}