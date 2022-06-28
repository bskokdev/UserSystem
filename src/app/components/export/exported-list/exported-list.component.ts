import {Component, Input, OnInit} from '@angular/core';
import {Export} from "../../../models/export.model";

@Component({
  selector: 'app-exported-list',
  templateUrl: './exported-list.component.html',
  styleUrls: ['./exported-list.component.scss']
})
export class ExportedListComponent implements OnInit {

  @Input() export: Export | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
