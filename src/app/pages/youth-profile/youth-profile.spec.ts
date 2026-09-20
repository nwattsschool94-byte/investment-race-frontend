import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouthProfile } from './youth-profile';

describe('YouthProfile', () => {
  let component: YouthProfile;
  let fixture: ComponentFixture<YouthProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YouthProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YouthProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
