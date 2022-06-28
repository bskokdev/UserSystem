import {Component, OnDestroy, OnInit} from '@angular/core';
import {Export} from "../../../models/export.model";
import {ExportService} from "../../../services/export.service";
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-exports-page',
  templateUrl: './exports-page.component.html',
  styleUrls: ['./exports-page.component.scss']
})
export class ExportsPageComponent implements OnInit, OnDestroy {

  exports: Export[];

  private destroy$ = new Subject();

  constructor(private router: Router, private exportService: ExportService) {
    this.exports = [];
  }

  ngOnInit(): void {
    this.getExports();
  }

  // gets all exports (sorted by date of creation)
  getExports(): void {
    this.exportService.getExportsSortedByDate().pipe(takeUntil(this.destroy$)).subscribe(data => this.exports = data);
  }

  // goes back to the /users path
  onBack(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    // unsubscribe from observables
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
