import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafletCardComponent } from './leaflet-card.component';

describe('LeafletCardComponent', () => {
  let component: LeafletCardComponent;
  let fixture: ComponentFixture<LeafletCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeafletCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeafletCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
