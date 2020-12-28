import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss']
})
export class LoadMoreComponent implements OnInit {

  @Input() hasMore = false;
  constructor() { }

  ngOnInit(): void {
  }

}
