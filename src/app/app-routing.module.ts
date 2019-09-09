import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MembersComponent} from './view/dashboard/member/members.component';
import {DashboardComponent} from './view/dashboard/dashboard.component';
import {LoginComponent} from './view/login/login.component';
import {NotFoundComponent} from './view/not-found/not-found.component';
import {MemberOverviewComponent} from './view/dashboard/member/member-overview/member-overview.component';
import {VisitorsComponent} from './view/dashboard/visitors/visitors.component';
import {MemberCreateComponent} from './view/dashboard/member/member-create/member-create.component';
import {StartEveningComponent} from './view/dashboard/visitors/start-evening/start-evening.component';
import {OverviewEveningComponent} from './view/dashboard/visitors/overview-evening/overview-evening.component';
import {EventsComponent} from './view/dashboard/events/events.component';
import {AdminComponent} from './view/dashboard/admin/admin.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Interjel' },
    children: [
      // widget outlets
      widget('member', MembersComponent),
      widget('visitors', VisitorsComponent),
      widget('events', EventsComponent),
      widget('admin', AdminComponent),
      widget('**', NotFoundComponent),

      // modal outlets
      modal('create-member', MemberCreateComponent),
      modal('overview-member/:id', MemberOverviewComponent),
      modal('start-evening', StartEveningComponent),
      modal('overview-evening/:id', OverviewEveningComponent)
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export function widget(path: string, component: any): any {
  return {
    path: path,
    component: component,
    outlet: 'widget'
  };
}

export function modal(path: string, component: any): any {
  return {
    path: path,
    component: component,
    outlet: 'modal'
  };
}
