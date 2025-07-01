import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideState, provideStore } from '@ngrx/store';
import { userFeature } from './state/users/user.reducer';
import { provideEffects } from '@ngrx/effects';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideStore(),
    provideState(userFeature),
    provideEffects([]),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
