import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  getDoc,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, from, map, switchMap } from 'rxjs';
import { Site } from './site';
import { AES, enc } from 'crypto-js';
import { environment } from '../environments/environment';
import { Auth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root',
})
export class PasswordmanagerService {
  constructor(private firestore: Firestore, private auth: Auth) {}
  async getCurrentUserId(): Promise<string | null> {
    const user = this.auth.currentUser;
    return user ? user.uid : null;
  }
  async addSite(data: object) {
    const uid = await this.getCurrentUserId();
    if (!uid) throw new Error('User not logged in');
    const dbInstance = collection(this.firestore, 'sites');
    return addDoc(dbInstance, { ...data, uid });
  }
  loadSite(): Observable<any[]> {
    return from(this.getCurrentUserId()).pipe(
      map((uid) => {
        if (!uid) throw new Error('User not logged in');
        return uid;
      }),
      switchMap((uid) => {
        const dbInstance = collection(this.firestore, 'sites');
        const q = query(dbInstance, where('uid', '==', uid));
        return collectionData(q, { idField: 'id' });
      })
    );
  }
  async updateSite(id: string, data: object) {
    const dbInstance = doc(this.firestore, 'sites', id);
    return updateDoc(dbInstance, data);
  }
  deleteSite(id: string) {
    const dbInstance = doc(this.firestore, 'sites', id);
    return deleteDoc(dbInstance);
  }
  loadPasswords(id: string) {
    const dbInstance = collection(this.firestore, `sites/${id}/passwords`);
    return collectionData(dbInstance, { idField: 'id' }).pipe(
      map((data) =>
        data.map((item: any) => {
          return {
            ...item,
            password: this.deCryptPassword(item.password),
          };
        })
      )
    );
  }

  getSiteDetails(id: string): Observable<Site> {
    const dbInstance = doc(this.firestore, 'sites', id);
    return docData(dbInstance, { idField: 'id' }) as Observable<Site>;
  }
  addPassword(id: string, data: object) {
    const dbInstance = collection(this.firestore, `sites/${id}/passwords`);
    return addDoc(dbInstance, data);
  }
  updatePassword(siteId: string, passwordId: string, data: object) {
    const dbInstance = doc(
      this.firestore,
      `sites/${siteId}/passwords`,
      passwordId
    );
    return updateDoc(dbInstance, data);
  }
  deletePassword(siteId: string, passwordId: string) {
    const dbInstance = doc(
      this.firestore,
      `sites/${siteId}/passwords`,
      passwordId
    );
    return deleteDoc(dbInstance);
  }
  enCryptPassword(password: string): string {
    return AES.encrypt(password, environment.secretKey).toString();
  }
  deCryptPassword(encrypted: string): string {
    try {
      const bytes = AES.decrypt(encrypted, environment.secretKey);
      const decryptedPassword = bytes.toString(enc.Utf8);
      if (!decryptedPassword) {
        throw new Error('Decryption failed');
      }
      return decryptedPassword;
    } catch (error) {
      alert('Decryption error:'+error);
      return ''; // Return an empty string or any default error value
    }
  }
}
