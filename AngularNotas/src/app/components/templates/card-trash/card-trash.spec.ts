import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTrash } from './card-trash';

describe('CardTrash', () => {
  let component: CardTrash;
  let fixture: ComponentFixture<CardTrash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTrash]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTrash);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
