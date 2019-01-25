import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faSpinner,
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

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
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
        .subscribe(res => this.onSuccess(), err => this.onError());
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
