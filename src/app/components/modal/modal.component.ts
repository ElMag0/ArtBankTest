import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  name: string = '';
  username: string = '';
  email: string = '';
  phone: string = '';
  dialogTitle = 'Add user';

  constructor(private dialogRef: MatDialogRef<ModalComponent>) {}

  ngOnInit(): void {}

  onConfirm() {
    this.dialogRef.close({
      name: this.name,
      username: this.username,
      email: this.email,
      phone: this.phone,
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
