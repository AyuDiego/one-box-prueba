import { Routes } from '@angular/router';
import { Catalog } from './features/catalog/catalog';
import { EventDetail } from './features/event-detail/event-detail';

export const routes: Routes = [
  {
    path: '',
    component: Catalog,
    title: 'Cartelera'
  },
  {
    path: 'event/:id',
    component: EventDetail,
    title: 'Detalle de evento'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
