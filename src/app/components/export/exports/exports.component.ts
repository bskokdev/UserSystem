import {Component, Input, OnInit} from '@angular/core';
import {Export} from "../../../models/export.model";

@Component({
  selector: 'app-exports',
  templateUrl: './exports.component.html',
  styleUrls: ['./exports.component.scss']
})
export class ExportsComponent implements OnInit {

  @Input() exports: Array<Export>
  page: number;

  constructor() {
    this.page = 1;
    this.exports = [];
  }

  ngOnInit(): void {
  }
}
