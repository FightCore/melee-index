import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '@/app/services/auth/auth.service';
import { inject } from '@angular/core';

export function tokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  // Inject the current `AuthService` and use it to get an authentication token:
  try {
    const authToken = inject(AuthService).getToken();
    // Clone the request to add the authentication header.
    const newReq = req.clone({
      headers: req.headers.append('Authorization', `${authToken}`),
    });
    return next(newReq);
  } catch (error) {
    console.error('Error in tokenInterceptor:', error);
    // If there's an error, you might want to handle it differently, e.g., redirect to login.
    // For now, we just log the error.
  }
  return next(req);
}
