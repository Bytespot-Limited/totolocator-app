import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

export interface AccountInfo {
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl?: string;
  langKey: string;
  authorities: string[];
}

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAccount(): Observable<AccountInfo> {
    return this.http.get<AccountInfo>(`${this.baseUrl}account`);
  }

  updateAccount(payload: Partial<AccountInfo>): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}account`, payload);
  }

  changePassword(currentPassword: string, newPassword: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}account/change-password`, {
      currentPassword,
      newPassword,
    });
  }

  resetPasswordInit(email: string): Observable<string> {
    return this.http.post(`${this.baseUrl}account/reset-password/init`, email, {
      headers: new HttpHeaders({ 'Content-Type': 'text/plain' }),
      responseType: 'text',
    });
  }

  resetPasswordFinish(key: string, newPassword: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}account/reset-password/finish`, {
      key,
      newPassword,
    });
  }
}
