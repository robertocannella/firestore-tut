import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Shirt, ShirtId } from '../models/shirt';

@Injectable({
  providedIn: 'root'
})
export class ShirtService {

  private shirtCollection: AngularFirestoreCollection<ShirtId>;
  
  constructor(private readonly afs: AngularFirestore) {
    this.shirtCollection = afs.collection<ShirtId>('shirts');

    this.addItem({
      id: '',
      name: 'collared Shirt',
      price: 8.99
    })
    }

  getAll(): Observable<ShirtId[]>{
    return this.shirtCollection.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as ShirtId;
            data.id = a.payload.doc.id;
            return { ...data }
      })))
  }
  get(id: string) {
    return <Observable<ShirtId>>this.shirtCollection.doc(id).valueChanges();
  }
  update(shirt: ShirtId) {
    this.shirtCollection.doc(shirt.id).update({name: 'updated'});
  }
  delete(shirtId: string) {
    this.shirtCollection.doc(shirtId).delete();
  }
  //persists the id
  addItemPersitId(shirt: ShirtId) {
    const id = this.afs.createId();
    shirt.id = id;
    this.shirtCollection.doc(id).set(shirt);
  }
  addItem(shirt: ShirtId) {
    this.shirtCollection.add(shirt);
  }
  
}


