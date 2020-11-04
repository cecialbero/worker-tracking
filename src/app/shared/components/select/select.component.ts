import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() optionList: any;
  selectedOption = 'Active';

  constructor() { }

  ngOnInit(): void {
  }

  openSelectOptions() {
    const list = document.querySelector('.select-list');
    list.classList.toggle('open-menu');
  }

  selectOption(option: string) {
    this.selectedOption = option;
    const list = document.querySelector('.select-list');

    list.classList.remove('open-menu');
  }

}
