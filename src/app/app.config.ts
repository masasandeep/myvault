import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "myvault-8a629", appId: "1:208053574591:web:61879e5aae0ba2b2485f0a", storageBucket: "myvault-8a629.firebasestorage.app", apiKey: "AIzaSyBWuq1TwcClh7Yj5FMQY6GAS00ecrAm7BI", authDomain: "myvault-8a629.firebaseapp.com", messagingSenderId: "208053574591", measurementId: "G-P3T01T6TSL" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
