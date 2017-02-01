export class DataUtil {

  getFirstDay(data) {
    let ano = data.getFullYear();
    let mes = ("0" + (data.getMonth() + 1)).substr(-2);

    return ano + '-' + mes + '-01';
  }

  getLastDay(data) {
    let ano = data.getFullYear();
    let mes = Number(("0" + (data.getMonth() + 1)).substr(-2));
    let novaData = new Date(ano, mes, 0)
    let dia = novaData.getDate();
    return ano + '-' + mes + '-' + dia;
  }

}
