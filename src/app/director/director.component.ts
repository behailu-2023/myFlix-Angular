import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {
  public director: { Name?: string; Bio?: string; Birth?: string; Death?: string } | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { Name : string; Bio: string; Birth: string; Death: string }) {}

  ngOnInit(): void {
    if (this.data && this.data.Name) {
      this.director = this.data;
    } else {
      console.error('Director data is missing or incomplete:', this.data);
    }
  }
}
