import { MatTableDataSource } from '@angular/material/table';
import { Product } from './../../models/product';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy, AfterViewInit, Query } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy  {
//AfterViewInit
  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;

  dataSource;
  displayedColumns: string[] = ['title', 'price', 'edit'];
 // @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(
      products => {
        this.filteredProducts = this.products = products;
        this.dataSource = new MatTableDataSource(this.filteredProducts);
      });
   }

  ngOnInit(): void {}

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    // this.filteredProducts = (query) ? 
    //   this.products.filter(p => 
    //     p.title.includes(query)) : 
    //     this.products;
    // this.dataSource =  this.filteredProducts;
    query = query.trim();
    query = query.toLocaleLowerCase();
    this.dataSource.filter = query;
  }
}
