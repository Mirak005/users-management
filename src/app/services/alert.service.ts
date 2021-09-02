import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertCardComponent } from '../components/alert-card/alert-card.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, isError: boolean) {
    return this._snackBar.openFromComponent(AlertCardComponent, {
      data: { message, isError },
    });
  }
}
