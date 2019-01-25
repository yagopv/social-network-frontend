import { Component, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Profile } from '../../../auth/models/profile.model';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'hab-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {
  searchIcon: IconProp = faSearch;
  users: Profile[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {}
}
