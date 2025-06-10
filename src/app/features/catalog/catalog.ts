import { Component, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event.service';
 

@Component({
  selector: 'app-catalog', 
  imports: [CommonModule, RouterModule],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss'
})
export class Catalog {
  readonly events;
  readonly hasEvents;

  constructor(private eventService: EventService) {
    this.events = this.eventService.events;
    this.hasEvents = computed(() => this.events().length > 0);

    effect(() => {
      console.log('Eventos:', this.events());
    });
  }
}