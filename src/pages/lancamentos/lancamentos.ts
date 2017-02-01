import { Component, OnInit} from '@angular/core';
import { Toast } from 'ionic-native';
import { ModalController, AlertController, NavController, Events} from 'ionic-angular';

import { ModalLancamentoPage } from '../modal-lancamento/modal-lancamento';
import { LancamentoProvider } from '../../providers/lancamento-provider';
import { RelatorioPage } from '../relatorio/relatorio';
import { DataUtil } from '../../util/data-util';

@Component({
  selector: 'page-lancamentos',
  templateUrl: 'lancamentos.html',
})
export class LancamentosPage implements OnInit{

  listLancamentos: any;
  dataFiltro: Date;

  constructor(
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public events: Events,
    public dao: LancamentoProvider
  ) {

  }

  ngOnInit() {
    this.dataFiltro = new Date();
    this.getListaLancamentos();
  }

  onClickMoth() {
    this.navCtrl.push(RelatorioPage, {parametro: this.dataFiltro});
  }

  getListaLancamentos() {
    let dataUtil = new DataUtil();
    let dataInicio = dataUtil.getFirstDay(this.dataFiltro);
    let dataFim = dataUtil.getLastDay(this.dataFiltro);

    this.dao.getLancamentos(dataInicio, dataFim, (lista) => {
      this.listLancamentos = lista;
    });
  }

  changePaymentStatus(lancamento) {
    lancamento.pago = lancamento.pago == 'true' ? 'false' : 'true';
    this.dao.edit(lancamento, (lancamento) => {
      this.updateMonth(new Date(lancamento.data));
    })
  }

  paymentButtonText(lancamento) {
    return lancamento.pago == 'true' ? "Reabrir" : "Pagar";
  }

  updateMonth(data) {
    this.listLancamentos = [];
    this.dataFiltro = data;
    this.getListaLancamentos();
    this.updateSaldo();
  }

  updateSaldo() {
    this.dao.getSaldo((saldo) => {
      this.events.publish("saldo:updated", saldo);
    })
  }

  insert() {
    let modal = this.modalCtrl.create(ModalLancamentoPage);
    modal.onDidDismiss( (data) => {
      if (data) {
        this.dao.insert(data, (lancamento) => {
          this.updateMonth(new Date(lancamento.data));
          Toast.showShortBottom("Lançamento Inserido Com Sucesso !").subscribe(
            toast => {
              console.log(toast);
            });
        });
      }
    });
    modal.present();
  }

  edit(lancamento) {
    let modal = this.modalCtrl.create(ModalLancamentoPage, {parametro: lancamento});
    modal.onDidDismiss( (data) => {

      if (data) {
        this.dao.edit(lancamento, (lancamento) => {

          this.updateMonth(new Date(lancamento.data));
          Toast.showShortBottom("Lançamento Alterado Com Sucesso !").subscribe(
            toast => {
              console.log(toast);
            });
        });
      } else {
        this.getListaLancamentos();
      }
    });
    modal.present();
  }

  delete(lancamento) {
    let confirm = this.alertCtrl.create({
      title: 'Excluir Conta',
      message: "Gostaria realmente de excluir o Lançamento: " + lancamento.descricao + "?",
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.dao.delete(lancamento, (lancamento) => {
              this.updateMonth(new Date(lancamento.data));
              Toast.showShortBottom("Lançamento Excluído Com Sucesso !").subscribe(
                toast => {
                  console.log(toast);
                });
            });
          }
        },
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('Exclusão Cancelada');
          }
        },
      ]
    });
    this.navCtrl.push(confirm);
  }

  lancamentoEntrada(lancamento) {
    return lancamento.entradaSaida == "entrada";
  }
}
