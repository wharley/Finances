import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LancamentosPage } from '../lancamentos/lancamentos';
import { SaldoPage } from '../saldo/saldo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lancamentos: any;
  saldo: any;

  constructor(public navCtrl: NavController) {
      this.lancamentos = LancamentosPage;
      this.saldo = SaldoPage;
  }

}
