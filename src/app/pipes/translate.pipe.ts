import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../services/translate/translate.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(private translateService: TranslateService) { }

  /**
   * Transforma el valor proporcionado mediante la traducción correspondiente.
   * @param value El valor que se desea traducir.
   * @returns El valor traducido o una cadena vacía si no se encuentra la traducción.
   */
  transform(value: any): any {
    const translation = this.translateService.getTranslate(value);
    return translation !== undefined ? translation : value;
  }
}
