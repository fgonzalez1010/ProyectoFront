import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-top-product',
  templateUrl: './top-product.component.html',
  styleUrls: ['./top-product.component.css']
})
export class TopProductComponent implements OnInit {
  topProducts: any[] = [];
  chart: Chart | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTopProducts();
  }

  fetchTopProducts(): void {
    this.http.get<any[]>('http://localhost:8080/reportes/topProducts').subscribe(
      (data) => {
        this.topProducts = data;
        this.createChart();
      },
      (error) => {
        console.error('Error fetching top products:', error);
      }
    );
  }

  exportToExcel(): void {
    // 1. Crear la hoja de datos
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

    // 2. Crear un libro y agregar la hoja
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos Destacados');

    // 3. Capturar el gráfico como imagen
    const canvas = document.getElementById('productChart') as HTMLCanvasElement;
    if (canvas) {
      const imageData = canvas.toDataURL('image/png'); // Convertir el canvas a base64

      // 4. Agregar la imagen como comentario en una celda
      const sheetName = 'Productos Destacados';
      const ws = workbook.Sheets[sheetName];
      const cell = ws['A1']; // Celda donde colocarás la imagen (puedes cambiar)
      if (!cell.c) cell.c = []; // Asegurarse de que existan los comentarios
      cell.c.push({
        t: 'base64', // Tipo de contenido
        c: imageData // Imagen en formato base64
      });
    }

    // 5. Guardar el archivo Excel
    XLSX.writeFile(workbook, 'reporte_top_products.xlsx');
  }


  createChart(): void {
    const labels = this.topProducts.map(product => product.productName);
    const data = this.topProducts.map(product => product.totalSale);

    const canvas = document.getElementById('productChart') as HTMLCanvasElement;
    if (canvas) {
      this.chart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Ventas Totales',
              data: data,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Productos Destacados - Ventas Totales'
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
}
