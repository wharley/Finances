import { Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'statusPgto'
})
@Injectable()
export class StatusPgto implements PipeTransform{

  transform(value: any, args?: any): any {
    return value == 'true' ? "Pago" : "Não pago"
  }
}
