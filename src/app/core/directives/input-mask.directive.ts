import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appInputMask]',
  standalone: true
})
export class InputMaskDirective {

  @Input('appInputMask') inputType: any = '';
  pattern!: RegExp;

  private regexMap: any = {
    integer: /^[0-9]*$/g,
    words: /^[a-zA-ZÀ-ÿ\s]*$/g, //Nombres
    alphaNumeric: /^[a-zA-Z\d]*$/g, //Letras y números
    email: /^[a-zA-Z0-9!#$%&.@'*+/=?^_`{|}~-]*$/,
    url: /^[a-zA-ZÀ-ÿ0-9!#$%&.:@'*+/=?^_`{|}~-]*$/,
  };

  constructor() { }

  @HostListener('keypress', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.pattern = this.regexMap[this.inputType];
    this.pattern.lastIndex = 0;
    if (!this.pattern.test(event.key)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  paste(event: ClipboardEvent) {
    let pasteText = event.clipboardData?.getData('text');
    this.pattern = this.regexMap[this.inputType];
    this.pattern.lastIndex = 0;
    if (pasteText !== undefined) {
      if (!this.pattern.test(pasteText)) {
        event.preventDefault();
      }
    }
  }

}
