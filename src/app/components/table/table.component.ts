import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ApiService, User } from '../../services/api.service';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
  users: User[] = [];
  destroy$ = new Subject();

  constructor(
    private apiService: ApiService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.apiService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users) => {
        this.users = users;
      });
  }

  deleteUser(id: number): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  addUser(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      hasBackdrop: false,
      disableClose: false,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        let lastElem = this.users.slice(-1);

        result.id = lastElem[0].id + 1;

        this.users.push(result);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
