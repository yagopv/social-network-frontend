import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading = false;

  setLoading(isLoading) {
    setTimeout(() => {
      this.isLoading = isLoading;
    });
  }
}
