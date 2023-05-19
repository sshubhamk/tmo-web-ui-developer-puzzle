import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { addToReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store, private matSnackBar: MatSnackBar) { }

  removeFromReadingList(item: ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));
    const matSnackBarRef = this.matSnackBar.open(`Removed ${item.title} from reading List`, 'Undo', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 1500
    });
    matSnackBarRef.onAction().subscribe(() => {
      this.store.dispatch(addToReadingList({
        book: {
          ...item,
          id: item.bookId,
        }
      }))
    });
  }
}