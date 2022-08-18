import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelFormUpdateComponent } from './hotel-form-update.component';

describe('HotelFormUpdateComponent', () => {
  let component: HotelFormUpdateComponent;
  let fixture: ComponentFixture<HotelFormUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelFormUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
