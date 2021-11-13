import { ActivatedRoute } from '@angular/router';
import { async } from '@angular/core/testing';
import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  
  constructor(private route: ActivatedRoute,
     private productService: ProductService) {
     productService.getAll().subscribe(products => this.filteredProducts = this.products = products);

    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');

      //this.products.filter(p => console.log(p.category))
      this.filteredProducts = (this.category) ? 
      this.products.filter(p => p.category.toLocaleLowerCase() === this.category.toLocaleLowerCase()) : 
      this.products;
    })
  }

}
