import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapboxCardComponent } from './mapbox-card.component';

describe('MapboxCardComponent', () => {
  let component: MapboxCardComponent;
  let fixture: ComponentFixture<MapboxCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapboxCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapboxCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
