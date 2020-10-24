import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneModelComponent } from './phone-model.component';

describe('ModelsComponent', () => {
  let component: PhoneModelComponent;
  let fixture: ComponentFixture<PhoneModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
