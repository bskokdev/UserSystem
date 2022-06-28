import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportsPageComponent } from './exports-page.component';

describe('ExportsPageComponent', () => {
  let component: ExportsPageComponent;
  let fixture: ComponentFixture<ExportsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
