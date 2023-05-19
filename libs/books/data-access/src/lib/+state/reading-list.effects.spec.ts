import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import { SharedTestingModule, createReadingListItem } from '@tmo/shared/testing';
import { ReadingListEffects } from './reading-list.effects';
import * as ReadingListActions from './reading-list.actions';

describe('ToReadEffects', () => {
  let actions: ReplaySubject<any>;
  let effects: ReadingListEffects;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [
        ReadingListEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(ReadingListEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('loadReadingList$', () => {
    it('should work', done => {
      actions = new ReplaySubject();
      actions.next(ReadingListActions.init());

      effects.loadReadingList$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.loadReadingListSuccess({ list: [] })
        );
        done();
      });

      httpMock.expectOne('/api/reading-list').flush([]);
    });
  });

  describe('updateReadingBookAsFinished$', () => {
    it('should confirmedUpdateBookFromReadingList', fakeAsync(() => {
      const item = createReadingListItem('B');
      actions = new ReplaySubject();
      actions.next(ReadingListActions.updateBookFromReadingList({ item }));

      effects.addBook$.subscribe((action) => {
        tick();
        expect(action).toEqual(
          ReadingListActions.confirmedUpdateBookFromReadingList({ item })
        );
        flush();
      });
    }));

    it('should fail on failedUpdateBookFromReadingList', fakeAsync(() => {
      const item = createReadingListItem('');
      actions = new ReplaySubject();
      actions.next(ReadingListActions.updateBookFromReadingList({ item }));

      effects.addBook$.subscribe((action) => {
        tick();
        expect(action).toEqual(
          ReadingListActions.failedUpdateBookFromReadingList({ item })
        );
        flush();
      });
    }));
  });
});