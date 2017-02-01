import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CommonModule } from '@angular/common';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ContasPage } from '../pages/contas/contas';
import { ModalContasPage } from '../pages/modal-contas/modal-contas';
import { LancamentosPage } from '../pages/lancamentos/lancamentos';
import { ModalLancamentoPage } from '../pages/modal-lancamento/modal-lancamento';
import { StatusPgto } from '../pipes/status-pgto';
import { DataFilterComponent} from '../components/data-filter/data-filter';
import { SaldoPage } from '../pages/saldo/saldo';
import { RelatorioPage } from '../pages/relatorio/relatorio';
import { LancamentoProvider } from '../providers/lancamento-provider';
import { ContaProvider } from '../providers/conta-provider'


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ContasPage,
    ModalContasPage,
    LancamentosPage,
    ModalLancamentoPage,
    StatusPgto,
    DataFilterComponent,
    SaldoPage,
    RelatorioPage
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ContasPage,
    ModalContasPage,
    LancamentosPage,
    ModalLancamentoPage,
    DataFilterComponent,
    SaldoPage,
    RelatorioPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: LancamentoProvider, useClass: LancamentoProvider},
    {provide: ContaProvider, useClass: ContaProvider},
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class AppModule {}
