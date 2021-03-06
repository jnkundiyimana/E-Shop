import { Product } from './models/product';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    this.db.list('/products').push(product);
  }

  getAll() {
    return  this.db.list('/products/products').valueChanges() as Observable<Product[]>;
  }

  get(productId) {
    return this.db.object('/products/products/' +productId).valueChanges()  as Observable<Product>;
  }

  update(productId, product) {
    return this.db.object('/products/products/' +productId).update(product);
  }

  delete(productId) {
    this.db.object('/products/' +productId).remove();
  }
}
