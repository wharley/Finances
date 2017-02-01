import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { ContaProvider } from '../../providers/conta-provider';

@Component({
  selector: 'page-modal-lancamento',
  templateUrl: 'modal-lancamento.html'
})
export class ModalLancamentoPage {

  lancamento: any;
  contas: any;

  constructor(
    public viewCtrl: ViewController,
    public dao: ContaProvider,
    params: NavParams
  ) {
    this.viewCtrl = viewCtrl;
    this.lancamento = params.get("parametro") || {};
    this.dao.getList((lista) => {
      this.contas = lista;
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  salvar() {
    this.viewCtrl.dismiss(this.lancamento);
  }

}
