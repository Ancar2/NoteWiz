import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-notes',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './card-notes.html',
  styleUrl: './card-notes.css'
})
export class CardNotes {

  drop: boolean = false;
  @Input() titulo!:string
  @Input() nota!:string
  @Input() status!:string
  @Input() id!:string
  @Input() createAt!: string


  @Output() edit = new EventEmitter
  @Output() update = new EventEmitter


  eliminar() {
    this.edit.emit();
  }

  actualizar() {
    this.update.emit()
  }


}
