import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "src/app/services/auth.service";


@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        if(authToken) {
            const cloneedReq = req.clone({
                setHeaders: {
                    Authorization: "token " + authToken
                }
            });
            return next.handle(cloneedReq);
        } else {
            return next.handle(req)
        }
     
    }
}