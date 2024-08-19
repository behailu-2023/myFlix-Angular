import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  public genre: { Name?: string; Description?: string } | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { Name?: string; Description?: string }) {}

  ngOnInit(): void {
    if (this.data && this.data.Name) {
      this.genre = this.data;
    } else {
      console.error('Genre data is missing or incomplete:', this.data);
    }
  }
}