import { ApplicationConfig, isDevMode } from '@angular/core';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { provideRouter } from '@angular/router';

import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { NavigationActionTiming, provideRouterStore } from '@ngrx/router-store';
import { provideEffects } from '@ngrx/effects';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { authFeature } from './+state/auth/auth.reducer';
import * as userEffects from './+state/auth/auth.effects';
import * as homeEffects from './pages/home/+state/home.effects';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideStore(),
		provideState(authFeature),
		provideStoreDevtools({
			maxAge: 25,
			logOnly: !isDevMode(),
		}),
		provideRouterStore({
			navigationActionTiming: NavigationActionTiming.PostActivation,
		}),
		provideEffects([userEffects, homeEffects]),
		{
			provide: SupabaseClient,
			useFactory: () => createClient(environment.supabaseUrl, environment.supabaseKey),
		},
		{
			provide: IMAGE_LOADER,
			useValue: ({ src, loaderParams }: ImageLoaderConfig) => {
				const imgExt = src.split('.').pop();
				const resultSrc =
					src.replace(`.${imgExt}`, '') +
					(loaderParams?.['darkVariant'] ? '-dark' : '') +
					`.${imgExt}`;
				return `${environment.supabaseUrl}/storage/v1/object/public/${resultSrc}`;
			},
		},
	],
};
