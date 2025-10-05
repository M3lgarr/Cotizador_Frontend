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
    paisDestino: null,
    peso: null,
    alto: null,
    largo: null,
    ancho: null,
    clienteId: null
  };


  resultado: any = null;
  loading = false;
  error?: string;

  paises: any[] = [];
  clientes: any[] = [];
  regiones: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarListas();
  }

 cargarListas() {
    this.http.get('http://localhost:8080/api/paises').subscribe((res: any) => {
      this.paises = res;
    });

    this.http.get('http://localhost:8080/api/clientes').subscribe((res: any) => {
          this.clientes = res;
   });

    this.http.get('http://localhost:8080/api/regiones').subscribe((res: any) => {
          this.regiones = res;
        });
      }



  cotizar() {
    this.loading = true;
    this.error = undefined;
    this.resultado = null;

    this.http.post('http://localhost:8080/api/cotizar', this.data).subscribe({
        next: (res) => {
           this.resultado = res; 
           this.loading = false; 
          },
        error: (err) => { 
          this.error = err?.error?.message || 'Error al cotizar'; 
          this.loading = false; 
        }
      });
  }
}
