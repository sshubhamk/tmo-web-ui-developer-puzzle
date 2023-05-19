import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { createReadingListItem, SharedTestingModule } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { getReadingList, removeFromReadingList } from '@tmo/books/data-access';

describe('ReadingListComponent', () => {
  let dispatchSpy;
  let store: MockStore;
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule],
      providers: [provideMockStore()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    store.overrideSelector(getReadingList, []);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch action removeFromReadingList', () => {
    const book = createReadingListItem('A');
    component.removeFromReadingList(book);
    expect(dispatchSpy).toHaveBeenCalledWith(removeFromReadingList({ item: book }));
  });

  it('should mark book as finished reading', () => {
    const book = createReadingListItem('A');
    book.finished = true;
    component.markBookAsFinishedReading(book);
    expect(store.dispatch).toHaveBeenCalled();
  });
});