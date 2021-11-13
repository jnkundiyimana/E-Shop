import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
// we use take to subscribe on only one item in an observable and we don't need to unsubscribe 
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent  {

  categories$;
  product;
  id;
  show: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
     private productService: ProductService) { 
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    
    if(this.id) this.productService.get(this.id).pipe(take(1)).subscribe(p => {
      this.product = p;
    });
  }

  // ngOnInit() {
  //   setTimeout(() => this.show=true, 500);
  // }

  save(product) {

    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if(!confirm('Are you sure you want delete this product?')) return;
    
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
    
  }

}
