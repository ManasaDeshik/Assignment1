import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchDateInfoService {
  dateInfoAdded = new Subject();

  constructor() { }
}
