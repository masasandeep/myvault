import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable,from } from 'rxjs';
import { Site } from './site';
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
    return collectionData(dbInstance, { idField: 'id' });
  }
  
  getSiteDetails(id:string): Observable<Site>{
    const dbInstance = doc(this.firestore,'sites',id)
    return docData(dbInstance, { idField: 'id' }) as Observable<Site>;
  }
  addPassword(id:string,data:object){
    const dbInstance = collection(this.firestore,`sites/${id}/passwords`);
    return addDoc(dbInstance,data)
  }
}
