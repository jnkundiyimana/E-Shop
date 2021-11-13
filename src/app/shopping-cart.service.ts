import { Product } from './models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  // this returns a promise 
  create() {
    return this.db.list('/shopping-carts').push({
      createdTime: new Date().getTime()
    })
  }

  private getCart(cardId: string) {
    return this.db.object('/shopping-carts/'+ cardId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');

    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart (product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object('/shopping-carts/' +cartId+ '/items/' +product.key).valueChanges()  as Observable <any>;

    item$.pipe(take(1)).subscribe(item => {
     // if(item.exists()) item$.update({})
    })

  }

}
