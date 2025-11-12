import { ApplicationConfig, inject, isDevMode, SecurityContext } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideNamedApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { environment } from '@/environments/environment';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { userFeature } from './state/users/user.reducer';
import { tokenInterceptor } from './interceptors/token-interceptor';
import { MARKED_OPTIONS, provideMarkdown, SANITIZE } from 'ngx-markdown';
import { markedOptionsFactory } from './config/marked-options';
import { MeleeIndexPreset } from './theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MeleeIndexPreset,
        options: {
          darkModeSelector: '.dark',
        },
      },
    }),
    provideHttpClient(withInterceptors([tokenInterceptor]), withFetch()),
    provideNamedApollo(() => {
      const httpLink = inject(HttpLink);
      return {
        default: {
          link: httpLink.create({
            uri: `${environment.graphUrl}/graphql`,
          }),
          cache: new InMemoryCache(),
        },
        frameData: {
          link: httpLink.create({
            uri: `${environment.frameDataUrl}/graphql`,
          }),
          cache: new InMemoryCache(),
        },
      };
    }),
    provideStore(),
    provideState(userFeature),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideMarkdown({
      markedOptions: {
        provide: MARKED_OPTIONS,
        useFactory: markedOptionsFactory,
      },
      sanitize: {
        provide: SANITIZE,
        useValue: SecurityContext.NONE,
      },
    }),
  ],
};
