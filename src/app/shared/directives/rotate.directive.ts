import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[rotate]'
})
export class RotateDirective {
  constructor(private elr: ElementRef){
    elr.nativeElement.classList.add('rotate');
  }

  @HostListener('click')
  public onClick(): void {
    this.elr.nativeElement.classList.toggle('rotate-animation');
  }
}
