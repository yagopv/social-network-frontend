import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import {
  faCheck,
  faCrosshairs,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'hab-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Input() imageUrl: string;

  selectedFile: ImageSnippet;

  constructor(private authService: AuthService) {}

  private onSuccess(response: any) {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
    this.imageUrl = response.headers.get('Location');
    interval(1000)
      .pipe(take(5))
      .subscribe(() => (this.selectedFile = null));
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.authService
        .uploadAvatar(this.selectedFile.file)
        .subscribe(response => this.onSuccess(response), () => this.onError());
    });

    reader.readAsDataURL(file);
  }

  getIcon() {
    if (this.selectedFile.status === 'ok') {
      return faCheck;
    }

    if (this.selectedFile.status === 'fail') {
      return faCrosshairs;
    }

    return faUserCircle;
  }
}
