import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHotelierComponent } from './home-hotelier.component';

describe('HomeHotelierComponent', () => {
  let component: HomeHotelierComponent;
  let fixture: ComponentFixture<HomeHotelierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeHotelierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeHotelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
