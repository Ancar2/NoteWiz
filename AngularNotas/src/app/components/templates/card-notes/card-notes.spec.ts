import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNotes } from './card-notes';

describe('CardNotes', () => {
  let component: CardNotes;
  let fixture: ComponentFixture<CardNotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardNotes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardNotes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
