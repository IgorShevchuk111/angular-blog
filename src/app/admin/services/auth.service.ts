import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FbAuthResponse, User } from 'src/app/shared/interfaces';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators'

@Injectable()
export class AuthService {

  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) { }

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'))
    if(new Date() > expDate) {
      this.logOut()
    return null
    } else {
      return localStorage.getItem('fb-token')
  } 
  }
  

  logIn(user: User): Observable<any> {
    user.returnSecureToken = true
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
    .pipe(
      tap(this.setToken),
      catchError(this.handleError.bind(this))
    )
  }

  logOut(){
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  handleError(error: HttpErrorResponse) {
    const message = error.error.error.message
    console.log(message);

    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Wrong email')
        break;

      case 'INVALID_PASSWORD':
        this.error$.next('Invalid password')
        break; 
      
        case 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.':
        this.error$.next('TOO_MANY_ATTEMPTS_TRY_LATER')
        break;
        
      default:
        break;
    }
    
    return throwError(error)

  }

  private setToken(response: FbAuthResponse | null){
    if(response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
    localStorage.setItem('fb-token', response.idToken)
    localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
    
  }


}
