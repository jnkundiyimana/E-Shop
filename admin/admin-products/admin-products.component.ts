import { MatTableModule } from '@angular/material/table';
import { Product } from './../../models/product';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;
  dataSource;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(
      products => {
        this.filteredProducts = this.products = products;
      });
   }

  ngOnInit(): void {}
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = (query) ? 
      this.products.filter(p => 
        p.title.includes(query)) : 
        this.products;
  }
}
