import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoteliersComponent } from './hoteliers.component';

describe('HoteliersComponent', () => {
  let component: HoteliersComponent;
  let fixture: ComponentFixture<HoteliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoteliersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoteliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
