import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';
import 'rxjs/add/operator/map';

/*
  Generated class for the LancamentoProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LancamentoProvider {

  database: any;

  constructor() {
    setTimeout(function() {
      this.database = new SQLite();
      let createSql = `
        CREATE TABLE IF NOT EXISTS lancamentos(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          descricao TEXT,
          valor REAL,
          data TEXT,
          conta TEXT,
          entradaSaida TEXT,
          pago TEXT)
      `;
      this.database.openDatabase({
        name: "data.db",
        location: "default"
      }).then(() => {
        this.database.executeSql(createSql, {}).then((data) => {
          console.log("Tabela lancamentos Criada: ", data);
        }, (error) => {
          console.error("Erro na criação da tabela lancamentos", error);
        })
      }, (error) => {
        console.error("Erro na abertura do banco de dados: lancamentos", error);
      });
    }, 600);
  }

  getLancamentos(dataInicio, dataFim, successCallback) {
    setTimeout(function() {
      let sqlQuery = "SELECT * FROM lancamentos WHERE data >= ? and data <= ?";
      let list = [];
      this.database.executeSql(sqlQuery, [dataInicio, dataFim]).then((data) => {
        console.log("Qtde de Lancamentos" + JSON.stringify(data.rows.length));
        if(data.rows.length > 0) {
          for(let i = 0; i < data.rows.length; i++) {
            let lancamento = {
            id: data.rows.item(i).id,
            descricao: data.rows.item(i).descricao,
            valor: data.rows.item(i).valor,
            data: data.rows.item(i).data,
            conta: data.rows.item(i).conta,
            entradaSaida: data.rows.item(i).entradaSaida,
            pago: data.rows.item(i).pago
            };
            list.push(lancamento);
          }
          //console.log(list);
          successCallback(list);
        }
      }, (error) => {
        console.log("getList() - ERRO na leitura da Tabela: " + JSON.stringify(error));
      });
    }, 100);
  }

  getListGroupByConta(dataInicio, dataFim, entradaSaida, successCallback) {
    setTimeout(function() {
      let sqlQuery = `
      SELECT conta, TOTAL(valor) as saldoConta FROM lancamentos
      where data >= ? and data <= ? and entradaSaida = ?
      and pago = 'true'
      GROUP BY conta`;
      let list = [];
      this.database.executeSql(sqlQuery, [
          dataInicio,
          dataFim,
          entradaSaida])
      .then((data) => {
        //console.log("Qtde Grupos de Contas" + JSON.stringify(data));
        if(data.rows.length > 0) {
          for(let i = 0; i < data.rows.length; i++) {
            let conta = {
            conta: data.rows.item(i).conta,
            saldo: data.rows.item(i).saldoConta,
            percentual: 0.0
            };
            list.push(conta);
          }
          //console.log(list);
          successCallback(list);
        }
      }, (error) => {
        console.log("getList() - ERRO na leitura da Tabela: " + JSON.stringify(error));
      });
    }, 100);
  }


  getSaldo(successCallback) {
    let sqlQuery = `
      SELECT TOTAL(valor) as saldo, entradaSaida
      FROM lancamentos
      WHERE pago = 'true' AND entradaSaida = 'entrada'
      UNION
      SELECT TOTAL(valor) as saldo, entradaSaida
      FROM lancamentos
      WHERE pago = 'true' AND entradaSaida = 'saida';
    `;
    setTimeout(function() {
      this.database.executeSql(sqlQuery, []).then((data) => {
          let saldo = 0;
          if(data.rows.length > 0) {
            for(let i = 0; i < data.rows.length; i++) {
              let item = {
              saldo: data.rows.item(i).saldo,
              entradaSaida: data.rows.item(i).entradaSaida,
              }
              if (item.entradaSaida == 'entrada') {
                saldo += item.saldo;
              } else {
                saldo -= item.saldo;
              }
            }
          }
          successCallback(saldo);
        }, (error) => {
            console.log("getSaldo() - Erro carregamento do saldo: " + JSON.stringify(error.err));
        });
    }, 700);
  }


  insert(lancamento, successCallback) {
    let sqlQuery = `
      INSERT INTO lancamentos(
        descricao,
        valor,
        data,
        conta,
        entradaSaida,
        pago) VALUES (?, ?, ?, ?, ?, ?)
    `;
    setTimeout(function() {

      this.database.executeSql(sqlQuery, [
        lancamento.descricao,
        lancamento.valor,
        lancamento.data,
        lancamento.conta,
        lancamento.entradaSaida,
        lancamento.pago]).then((data) => {
          console.log('data', data)
          lancamento.id = data.insertId;
          successCallback(lancamento);
      }, (error) => {
          console.log("Erro na inserção do Lançamento: " + JSON.stringify(error.err));
      });
    }, 100);
  }

  edit(lancamento, successCallback) {
    let sqlQuery = `UPDATE lancamentos
      SET
        descricao = ?,
        valor = ?,
        data = ?,
        conta = ?,
        entradaSaida = ?,
        pago = ?
      WHERE id = ?;
    `
    setTimeout(function() {
      this.database.executeSql(sqlQuery, [
        lancamento.descricao,
        lancamento.valor,
        lancamento.data,
        lancamento.conta,
        lancamento.entradaSaida,
        lancamento.pago,
        lancamento.id
      ]).then((data) => {
          lancamento.id = data.insertId;
          successCallback(lancamento);
      }, (error) => {
          console.log("ERRO na atualização do Lançamento: " + JSON.stringify(error.err));
      });
    }, 100);
  }

  delete(lancamento, successCallback) {
    setTimeout(function() {
      let sqlQuery = "DELETE FROM lancamentos WHERE id = ?";
      this.database.executeSql(sqlQuery, [lancamento.id]).then((data) => {
          successCallback(lancamento);
      }, (error) => {
          console.log("ERRO na exclusão do Lançamento: " + JSON.stringify(error.err));
      });
    }, 100);
  }

}
