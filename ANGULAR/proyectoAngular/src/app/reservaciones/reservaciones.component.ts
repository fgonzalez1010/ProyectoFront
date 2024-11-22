import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.css']
})
export class ReservacionesComponent {
  reservacion: any = [];
  estado: any = [];
  viajes: any = [];

  // Variables para la gestión de ventas
  sales: any[] = [];
  sale: any = {};

  constructor(private http: HttpClient) {
    this.buscarReservacion();
    this.buscarEstados();
    this.buscarViajes();
    this.fetchSales(); // Inicializar la lista de ventas
  }

  // Reservaciones
  buscarReservacion() {
    this.servicioBuscarReservacion().subscribe(
      (us: any) => this.reservacion = us
    );
  }

  servicioBuscarReservacion(): Observable<any> {
    return this.http.get("http://localhost:8080/reservacion/buscar");
  }

  // Viajes
  buscarViajes() {
    this.servicioBuscarViajes().subscribe(
      (us: any) => this.viajes = us
    );
  }

  servicioBuscarViajes(): Observable<any> {
    return this.http.get("http://localhost:8080/viaje/buscar");
  }

  // Estados
  buscarEstados() {
    this.servicioBuscarEstados().subscribe(
      (us: any) => this.estado = us
    );
  }

  servicioBuscarEstados(): Observable<any> {
    return this.http.get("http://localhost:8080/estado/buscar");
  }

  // Ventas
  fetchSales() {
    this.getSalesService().subscribe(
      (data: any) => this.sales = data
    );
  }

  getSalesService(): Observable<any> {
    return this.http.get("http://localhost:8080/sale");
  }

  saveSale() {
    let formValid: any = document.getElementById("saveSaleForm");
    if (formValid.reportValidity()) {
      this.saveSaleService().subscribe(
        (data: any) => this.refreshSales(data)
      );
    }
  }

  saveSaleService(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>("http://localhost:8080/sale", this.sale, httpOptions);
  }

  updateSale(sale: any) {
    this.sale = { ...sale };
  }

  deleteSale(sale: any) {
    this.deleteSaleService(sale.saleId).subscribe(
      () => this.fetchSales()
    );
  }

  deleteSaleService(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/sale/${id}`);
  }

  refreshSales(data: any) {
    this.fetchSales();
    this.sale = {};
  }

  clearSaleForm() {
    this.sale = {};
  }
}
