import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ShirtId } from '../models/shirt';
import { ShirtService } from '../services/shirt.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent {

  shirts$!: Observable<ShirtId[]>;

  constructor(private readonly shirtService: ShirtService) {
    this.shirts$ = shirtService.getAll();
  }
  
  update(shirt: ShirtId) {
    this.shirtService.update(shirt)
  }
  delete(shirtId: string) {
    this.shirtService.delete(shirtId);
  }

}
