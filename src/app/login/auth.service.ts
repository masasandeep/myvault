import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider,signInWithEmailAndPassword,signInWithPopup, signOut } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) { }
  googleLogin() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  // Email Login
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  logOut(){
    return signOut(this.auth);
  }

}
