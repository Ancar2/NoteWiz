import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-trash',
  imports: [],
  templateUrl: './card-trash.html',
  styleUrl: './card-trash.css'
})
export class CardTrash {
  @Input () titulo!: string;
  @Input () nota!: string;
  @Input () status!: string;
  @Input () id!: string;

  @Output () edit = new EventEmitter;
  @Output () delete = new EventEmitter;

  recuperar() {
    this.edit.emit();
  }

  eliminar () {
    this.delete.emit();
  }
}
