import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable,from, map } from 'rxjs';
import { Site } from './site';
import {AES,enc} from 'crypto-js';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PasswordmanagerService {

  constructor( private firestore:Firestore) {}
  addSite(data:object){
    const dbInstance  = collection(this.firestore,'sites');
    return addDoc(dbInstance,data)
  }
  loadSite(){
    const dbInstance = collection(this.firestore,'sites' );
    return collectionData(dbInstance, { idField: 'id' });
  }
  updateSite(id:string,data:object){
    const dbInstance = doc(this.firestore,'sites',id)
    return updateDoc(dbInstance,data)
  }
  deleteSite(id:string){
    const dbInstance = doc(this.firestore,'sites',id)
    return deleteDoc(dbInstance)

  }
  loadPasswords(id:string){
    const dbInstance = collection(this.firestore,`sites/${id}/passwords` );
    return collectionData(dbInstance, { idField: 'id' }).pipe(
      map(data=>
        data.map((item:any)=>{
          return {
            ...item,
            password: this.deCryptPassword(item.password)
          }
        }
      )
    ));
  }
  
  getSiteDetails(id:string): Observable<Site>{
    const dbInstance = doc(this.firestore,'sites',id)
    return docData(dbInstance, { idField: 'id' }) as Observable<Site>;
  }
  addPassword(id:string,data:object){
    const dbInstance = collection(this.firestore,`sites/${id}/passwords`);
    return addDoc(dbInstance,data)
  }
  updatePassword(siteId:string,passwordId: string,data:object){
    const dbInstance = doc(this.firestore,`sites/${siteId}/passwords`,passwordId)
    return updateDoc(dbInstance,data)
  }
  deletePassword(siteId:string,passwordId:string){
    const dbInstance = doc(this.firestore,`sites/${siteId}/passwords`,passwordId)
    return deleteDoc(dbInstance)
  }
  enCryptPassword(password: string): string {
    return AES.encrypt(password, environment.secretKey).toString();
  }
  deCryptPassword(encrypted: string): string {
      try {
        const bytes = AES.decrypt(encrypted, environment.secretKey);
        const decryptedPassword = bytes.toString(enc.Utf8);
        if (!decryptedPassword) {
          throw new Error("Decryption failed");
        }
        return decryptedPassword;
      } catch (error) {
        console.error("Decryption error:", error);
        return "";  // Return an empty string or any default error value
      }
    }
  }
