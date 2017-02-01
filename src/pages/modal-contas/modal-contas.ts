import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-modal-contas',
  templateUrl: 'modal-contas.html'
})
export class ModalContasPage {

  view: any;
  conta: any;

  constructor(viewCtrl: ViewController, params: NavParams) {
    this.view = viewCtrl;
    this.conta = params.get("parametro") || { descricao: ""};
  }

  cancel() {
    this.view.dismiss();
  }

  salvar() {
    this.view.dismiss(this.conta);
  }

}
