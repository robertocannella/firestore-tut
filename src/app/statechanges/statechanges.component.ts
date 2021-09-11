import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-statechanges',
  templateUrl: './statechanges.component.html',
  styleUrls: ['./statechanges.component.css']
})
  

export class StatechangesComponent {
  private depositsCollection: AngularFirestoreCollection<AccountDeposit>;
  deposits$: Observable<AccountDeposit[]>;
  
  // state changes to filter:  'added' 'modified' 'removed'
  // 
  constructor(private readonly afs: AngularFirestore) {
    this.depositsCollection = afs.collection('deposits');
    this.deposits$ = this.depositsCollection.stateChanges(['modified']).pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as AccountDeposit;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))) 
    }
  }
  export interface AccountDeposit {description: string; amount: number;}
  export interface AccountDepositId extends AccountDeposit{id: string;}
