import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsitesComponent } from './viewsites.component';

describe('ViewsitesComponent', () => {
  let component: ViewsitesComponent;
  let fixture: ComponentFixture<ViewsitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewsitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewsitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
