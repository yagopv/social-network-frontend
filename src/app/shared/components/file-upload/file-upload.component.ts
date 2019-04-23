import { Component, Input } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from '../../../core/services/user.service';

class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'sn-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Input() imageUrl: string;

  selectedFile: ImageSnippet;

  constructor(private userService: UserService) {}

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

      this.userService
        .uploadAvatar(this.selectedFile.file)
        .subscribe(response => this.onSuccess(response), () => this.onError());
    });

    reader.readAsDataURL(file);
  }

  getIcon() {
    if (this.selectedFile.status === 'ok') {
      return 'fa fa-check';
    }

    if (this.selectedFile.status === 'fail') {
      return 'fa fa-exclamation-triangle';
    }

    return 'fa fa-user-circle';
  }
}
