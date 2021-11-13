import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll(): Observable<any> {
    return this.db.list('/categories', ref => ref.orderByChild('name'))
    .valueChanges() as Observable<any>;
  }
}
