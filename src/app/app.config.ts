import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
	provideAnalytics,
	getAnalytics,
	ScreenTrackingService,
	UserTrackingService,
} from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { providePerformance, getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig, getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import { provideEffects } from '@ngrx/effects';

import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { userFeature } from './+state/user/user.reducer';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideStore(),
		provideState(userFeature),
		provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
		provideRouterStore(),
		provideEffects(),
		importProvidersFrom([
			provideFirebaseApp(() => initializeApp(environment.firebase)),
			provideAnalytics(() => getAnalytics()),
			provideAuth(() => getAuth()),
			provideDatabase(() => getDatabase()),
			provideFirestore(() => getFirestore()),
			provideFunctions(() => getFunctions()),
			provideMessaging(() => getMessaging()),
			providePerformance(() => getPerformance()),
			provideRemoteConfig(() => getRemoteConfig()),
			provideStorage(() => getStorage()),
		]),
		ScreenTrackingService,
		UserTrackingService,
	],
};
