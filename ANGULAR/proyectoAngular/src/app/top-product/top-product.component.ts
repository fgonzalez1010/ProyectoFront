import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-top-product',
  templateUrl: './top-product.component.html',
  styleUrls: ['./top-product.component.css']
})
export class TopProductComponent implements OnInit {
  topProducts: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTopProducts();
  }

  fetchTopProducts(): void {
    this.http.get<any[]>('http://localhost:8080/reportes/topProducts').subscribe(
      (data) => {
        this.topProducts = data;
      },
      (error) => {
        console.error('Error fetching top products:', error);
      }
    );
  }

  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.topProducts.map(product => ({
        'ID DEL PRODUCTO': product.producId,
        'SKU': product.sku,
        'NOMBRE DEL PRODUCTO': product.productName,
        'LÍNEA': product.lineName,
        'MARCA': product.brandName,
        'SUCURSAL': product.branch,
        'VENTAS TOTALES': product.totalSale
      }))
    );

    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos Destacados');

    XLSX.writeFile(workbook, 'reporte_top_products.xlsx');
  }
}
