
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PomoDashComponent } from './pomo-dash.component';

describe('PomoDashComponent', () => {
  let component: PomoDashComponent;
  let fixture: ComponentFixture<PomoDashComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PomoDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PomoDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
