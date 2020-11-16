import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[rotate]'
})
export class RotateDirective {
  constructor(private elr: ElementRef){
    elr.nativeElement.classList.add('rotate');
  }

  @HostListener('click')
  public onClick() {
    this.elr.nativeElement.classList.toggle('rotate-animation');
  }
}
