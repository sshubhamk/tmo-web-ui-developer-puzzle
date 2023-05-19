import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { getAllBooks, getBooksError, clearSearch, searchBooks } from '@tmo/books/data-access';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('ProductsListComponent', () => {
  let store: MockStore;
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule],
      providers: [provideMockStore({ initialState: { books: { entities: [] } } }),]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    store.overrideSelector(getAllBooks, []);
    store.overrideSelector(getBooksError, null);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should call ngonint method', () => {
    component.ngOnInit();
    expect(component.books).toEqual([]);
  });

  it('should return formatted date', () => {
    const formattedDate = component.formatDate('2023/04/30');
    expect(formattedDate).toEqual('4/30/2023');
  });

  it('should return undefined when args not passed', () => {
    expect(component.formatDate()).toBeUndefined();
  });

  it('should clear store if search input value is empty', fakeAsync(() => {
    component.searchForm.controls.term.setValue('');
    component.searchBooks();
    store.refreshState();
    tick(500);
    expect(store.dispatch).toHaveBeenCalledWith(clearSearch());
    flush();
  }));

  it('should return value from store based on search input value', fakeAsync(() => {
    component.searchForm.controls.term.setValue('javascript');
    component.searchBooks();
    store.refreshState();
    tick(500);
    expect(store.dispatch).toHaveBeenCalledWith(searchBooks({ term: component.searchTerm }));
    flush();
  }));
});