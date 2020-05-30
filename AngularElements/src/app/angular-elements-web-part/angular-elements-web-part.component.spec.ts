import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularElementsWebPartComponent } from './angular-elements-web-part.component';

describe('AngularElementsWebPartComponent', () => {
  let component: AngularElementsWebPartComponent;
  let fixture: ComponentFixture<AngularElementsWebPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularElementsWebPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularElementsWebPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
