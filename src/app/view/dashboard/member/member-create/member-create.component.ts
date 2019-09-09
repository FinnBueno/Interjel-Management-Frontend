import {Component, Input, OnInit} from '@angular/core';
import {MemberResource} from '../../../../resource/member.service';
import {Member, MemberType} from '../../../../model/member';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.scss']
})
export class MemberCreateComponent implements OnInit {

  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  birth: Date;
  address: string;
  postalCode: string;
  town: string;
  notes = '';

  constructor(private memberResource: MemberResource) {
  }

  ngOnInit() {
  }

  addMember() {
    if (this.firstname === undefined || this.lastname === undefined || this.email === undefined || this.phone === undefined ||
      this.birth === undefined || this.address === undefined || this.postalCode === undefined || this.town === undefined)
      return;
    if (this.phone.length > 9)
      this.phone = this.phone.substr(0, 9);

    const member = new Member(this.firstname, this.lastname, this.birth, this.email, this.notes, this.address, this.postalCode, this.town,
      this.phone, false, MemberType.REGULAR, 0, false);
    this.memberResource.create(member, () => {
      this.firstname = undefined;
      this.lastname = undefined;
      this.email = undefined;
      this.phone = undefined;
      this.birth = undefined;
      this.address = undefined;
      this.postalCode = undefined;
      this.town = undefined;
      this.notes = '';
    });
  }

  roles(): MemberType[] {
    return [MemberType.MANAGEMENT, MemberType.REGULAR];
  }

  roleToString(type: MemberType) {
    return type === MemberType.MANAGEMENT ? 'Bestuur' : 'Normaal';
  }

}
