import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportedListComponent } from './exported-list.component';

describe('ExportedListComponent', () => {
  let component: ExportedListComponent;
  let fixture: ComponentFixture<ExportedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportedListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
