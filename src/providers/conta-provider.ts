import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';
import 'rxjs/add/operator/map';

/*
  Generated class for the ContaProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ContaProvider {

  database: any;

  constructor() {
    setTimeout(function() {
      this.database = new SQLite();
      let createSql = "CREATE TABLE IF NOT EXISTS contas (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT )";
      this.database.openDatabase({
        name: "data.db",
        location: "default"
      }).then(() => {
        this.database.executeSql(createSql, {}).then((data) => {
          console.log("Tabela contas criada: ", data);
        }, (error) => {
          console.error("Erro na execução da criação da tabela contas", error);
        })
      }, (error) => {
        console.error("Erro na abertura do banco de dados: contas", error);
      });
    }, 600);
  }

  getList(sucessCallBack) {
    setTimeout(function() {
      let sqlQuery = "SELECT * FROM contas";
      let list = [];
      this.database.executeSql(sqlQuery, []).then((data) => {
      console.log("Qtde de Registros: " + JSON.stringify(data.length));
      if(data.rows.length > 0) {
        for(var i = 0; i < data.rows.length; i++) {
          let item = {
            id:"",
            descricao: ""
          };
          item.id = data.rows.item(i).id;
          item.descricao = data.rows.item(i).descricao
          list.push(item);
        }
        sucessCallBack(list);
      }

    }, (error) => {
      console.log("ERRO na leitura da Tabela: " + JSON.stringify(error));
    });
  }, 100);
}

  insert(conta, sucessCallBack) {
    setTimeout(function() {
      let sqlQuery = "INSERT INTO contas (descricao) VALUES (?)";
      this.database.executeSql(sqlQuery, [conta.descricao]).then((data) => {
          conta.id = data.insertId;
          sucessCallBack(conta);
      }, (error) => {
          console.log("Erro na inserção da Conta: " + JSON.stringify(error.err));
      });
    }, 100);
  }

  edit(conta, sucessCallBack) {
    let sqlQuery = "UPDATE contas SET descricao = ? WHERE id = ?";
    setTimeout(function() {
      this.database.executeSql(sqlQuery, [conta.descricao, conta.id]).then((data) => {
          conta.id = data.insertId;
          sucessCallBack(conta);
      }, (error) => {
          console.log("ERRO na atualização da Conta: " + JSON.stringify(error.err));
      });
    }, 100);
  }

  delete(conta, sucessCallBack) {
    let sqlQuery = "DELETE FROM contas WHERE id = ?";
    setTimeout(function() {
      this.database.executeSql(sqlQuery, [conta.id]).then((data) => {
          sucessCallBack(conta);
      }, (error) => {
          console.log("ERRO na exclusão da Conta: " + JSON.stringify(error.err));
      });
    }, 100);
  }
  

}
