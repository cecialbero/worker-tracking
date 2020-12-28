import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss']
})
export class SearchComponentComponent implements OnInit, OnDestroy {

  @Output() typing = new EventEmitter<string>();

  debounce: Subject<string> = new Subject<string>();

  constructor() { }

  ngOnInit(): void {
    this.debounce
      .pipe(debounceTime(500))
      .subscribe(filter => {
        this.typing.emit(filter);
      });
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

}
