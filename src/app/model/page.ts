export class Page {

  name: string;
  icon: string;
  niceName: string;
  adminOnly: boolean;

  constructor(name: string, icon: string, niceName: string, adminOnly?: boolean) {
    this.name = name;
    this.icon = 'fa-' + icon;
    this.niceName = niceName;
    this.adminOnly = adminOnly;
  }
}
