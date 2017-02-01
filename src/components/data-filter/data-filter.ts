import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'data-filter',
  templateUrl: 'data-filter.html'
})
export class DataFilterComponent implements OnInit{

  @Input() startDate;
  @Output() changeMonth = new EventEmitter();
  @Output() clickMonth = new EventEmitter();

  mesSelecionado: any;

  constructor() {

  }

  ngOnInit() {
    this._updateMonth();
  }

  ngOnChanges(changes) {
    this._updateMonth();
  }

  private _executeChangeMonth() {
    this.changeMonth.next(this.startDate);
  }

  executeClickMonth() {
    this.clickMonth.next();
  }

  private _updateMonth() {
    this.mesSelecionado = this.startDate;
    this._executeChangeMonth();
  }

  previousMonth() {
    let date = new Date(this.startDate);
    date.setMonth(date.getMonth() - 1);
    this.startDate = date;
    this._updateMonth();
  }

  nextMonth() {
    let date = new Date(this.startDate);
    date.setMonth(date.getMonth() + 1);
    this.startDate = date;
    this._updateMonth();
  }
}
