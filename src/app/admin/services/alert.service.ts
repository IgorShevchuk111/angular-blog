import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


export type AlertType = 'success' | 'warnig' | 'danger'

export interface Alert {
  type: AlertType,
  text: string
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public alert$ = new Subject<Alert>()

  constructor() { }

  success(text: string){
    this.alert$.next({ type:  'success', text })
  }

  warnig(text: string){
    this.alert$.next({ type:  'warnig', text })
  }

  danger(text: string){
    this.alert$.next({ type:  'danger', text })
  }
}
