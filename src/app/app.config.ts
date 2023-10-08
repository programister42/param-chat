import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import { provideEffects } from '@ngrx/effects';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { userFeature } from './+state/user/user.reducer';
import * as userEffects from './+state/user/user.effects';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideStore(),
		provideState(userFeature),
		provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
		provideRouterStore(),
		provideEffects(userEffects),
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
