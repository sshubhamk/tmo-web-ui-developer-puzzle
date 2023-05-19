import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { createReadingListItem, SharedTestingModule } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';

describe('ReadingListComponent', () => {
  let store: MockStore;
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule, BrowserAnimationsModule, MatSnackBarModule],
      providers: [provideMockStore({ initialState: { books: { entities: [] } } }),]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    store.overrideSelector(getReadingList, []);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove book from reading', () => {
    const book: ReadingListItem = createReadingListItem('A');
    component.removeFromReadingList(book);
    expect(store.dispatch).toHaveBeenCalledWith(removeFromReadingList({ item: book }));
  });
});