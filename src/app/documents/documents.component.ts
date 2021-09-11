import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent  {
  items$: Observable<Item[]>;
  itemsCollectionObs$: Observable<Item[]>;
  item$: Observable<Item>;
  tasks$: Observable<Task[]>;
 

  private itemDoc: AngularFirestoreDocument<Item>
  private userDoc: AngularFirestoreDocument<Item>
  private itemsCollection: AngularFirestoreCollection<Item>;

  constructor(private afs: AngularFirestore) {
  // gets the value of the document (no meta data)
    // to get Id field pass the idField Obect inside that valueChanges Method.
    this.items$ = afs.collection<Item>('items').valueChanges({ idField: 'id'} );
    this.itemDoc = afs.doc<Item>('items/1');

    // need to explicitly define return type since we are adding the idField parameter; effectively
    //      altering the return type.  
    this.item$ = <Observable<Item>>this.itemDoc.valueChanges({ idField: 'id' });

    this.itemsCollection = afs.collection<Item>('items');
    this.itemsCollectionObs$ = this.itemsCollection.valueChanges({ idField: 'id' });
    
    
    let newItem = { name: 'updatedName' };
    this.update(newItem);

    // to retreive a nested collection se the collection(path: string) medthod
    this.userDoc = afs.doc<Item>('user/david');
    this.tasks$ = this.userDoc.collection<Task>('tasks').valueChanges();
  }

  
  addItem(name: string) {
    // perisit a document id
    const id = this.afs.createId();
    const item: Item = { id, name };
    this.itemsCollection.doc(id).set(item)
  }

  update(item: Item) {
    this.itemDoc.update(item);
  }
}
export interface Item {
  id?: string;
  name: string;
}
export interface Task {
  id?: string;
  name: string;
}
