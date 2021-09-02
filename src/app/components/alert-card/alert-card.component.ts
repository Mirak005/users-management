import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { IAlert } from 'src/app/models/Alert';

@Component({
  selector: 'app-alert-card',
  templateUrl: './alert-card.component.html',
  styleUrls: ['./alert-card.component.css'],
})
export class AlertCardComponent {
  message: string = '';
  isError: boolean = false;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: IAlert) {}

  ngOnInit(): void {
    this.message = this.data.message;
    this.isError = this.data.isError;
  }
}
