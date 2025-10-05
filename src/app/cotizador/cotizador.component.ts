import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cotizador',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- en standalone importas aquí
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css']
})
export class CotizadorComponent {
  data = {
    paisDestino: 'GT',
    peso: 2.5,
    alto: 20,
    largo: 30,
    ancho: 15,
    clienteId: 2
  };

  resultado: any = null;
  loading = false;
  error?: string;

  constructor(private http: HttpClient) {}

  cotizar() {
    this.loading = true;
    this.error = undefined;
    this.resultado = null;

    this.http.post('http://localhost:8080/api/cotizar', this.data)
      .subscribe({
        next: (res) => { this.resultado = res; this.loading = false; },
        error: (err) => { this.error = err?.error?.message || 'Error al cotizar'; this.loading = false; }
      });
  }
}
