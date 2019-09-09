import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../resource/rest.service';
import {parseDate} from '../../../util/date.util';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public currentSeason: Date;

  constructor(private rest: RestService) { }

  ngOnInit() {
    this.rest.get('season').subscribe(data => this.currentSeason = parseDate(data['startDate']));
  }

  startNewSeason() {
    const masterPassword = this.hashCode(prompt('Voer het master wachtwoord in om een nieuw seizoen te starten.'));
    if (masterPassword === 2081958921) {
      this.rest.post('season', {}).subscribe(() => this.currentSeason = (new Date(Date.now())));
    } else {
      alert('Wachtwoord incorrect.');
    }
  }

  hashCode(text: string): number {
    var hash = 0, i, chr;
    if (text.length === 0) return hash;
    for (i = 0; i < text.length; i++) {
      chr   = text.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };
}
