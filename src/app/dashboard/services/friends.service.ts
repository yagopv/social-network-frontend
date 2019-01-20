import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DashboardModule } from '../dashboard.module';

@Injectable({
  providedIn: DashboardModule
})
export class FriendsService {
  constructor(private http: HttpClient) {}
}
