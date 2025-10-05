import { Routes } from '@angular/router';
import { CotizadorComponent } from './cotizador/cotizador.component';

export const routes: Routes = [
  { path: '', component: CotizadorComponent },
  { path: '**', redirectTo: '' }
];
