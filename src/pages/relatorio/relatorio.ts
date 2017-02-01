import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LancamentoProvider } from '../../providers/lancamento-provider';
import { DataUtil } from '../../util/data-util';

@Component({
  selector: 'page-relatorio',
  templateUrl: 'relatorio.html'
})
export class RelatorioPage {

  dataFiltro: any;
  listaContas: any;
  entradaSaida: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dao: LancamentoProvider
  ) {
    this.entradaSaida = "entrada";
    this.dataFiltro = this.navParams.get("parametro");
    this._getList(this.entradaSaida);
  }

  private _getList(entradaSaida) {
    let dataUtil = new DataUtil()
    let dataInicio = dataUtil.getFirstDay(this.dataFiltro);
    let dataFim = dataUtil.getLastDay(this.dataFiltro);
    this.dao.getListGroupByConta(dataInicio, dataFim, entradaSaida, (listaContas) => {
        this.listaContas = listaContas;
        this._calcPercentual();
      });
  }

  private _calcTotal() {
    let total = 0;
    for (var i = 0; i < this.listaContas.length; i++) {
      total += this.listaContas[i].saldo;
    }
    return total;
  }

  private _calcPercentual() {
    let total = this._calcTotal();
    for (var i = 0; i < this.listaContas.length; i++) {
      this.listaContas[i].percentual = (this.listaContas[i].saldo / total) * 100;
    }
  }

  onSelect(entradaSaida) {
    this._getList(entradaSaida);
  }

}
