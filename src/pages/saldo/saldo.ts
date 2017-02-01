import { Component, OnInit} from '@angular/core';
import { Events } from 'ionic-angular';
import { LancamentoProvider } from '../../providers/lancamento-provider';

@Component({
  selector: 'page-saldo',
  templateUrl: 'saldo.html'
})
export class SaldoPage implements OnInit{

  saldo: number;

  constructor(
    public events: Events,
    private dao: LancamentoProvider
  ) {
      //this.events = events;
  }

    ngOnInit() {
      this.dao.getSaldo((saldo) => {
        this.saldo = saldo;
      });
      this.events.subscribe("saldo:updated", (saldo) => {
        this.saldo = parseFloat(saldo);
      });
    }
}
