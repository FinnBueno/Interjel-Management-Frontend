import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import localeNLNL from '@angular/common/locales/nl';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MembersComponent } from './view/dashboard/member/members.component';
import { NotFoundComponent } from './view/not-found/not-found.component';
import {MemberFilter} from './view/util/pipe/member-filter.pipe';
import {FormsModule} from '@angular/forms';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { LoginComponent } from './view/login/login.component';
import { PageFilter } from './view/util/pipe/page-filter.pipe';
import { MemberOverviewComponent } from './view/dashboard/member/member-overview/member-overview.component';
import {registerLocaleData} from '@angular/common';
import { MemberCreateComponent } from './view/dashboard/member/member-create/member-create.component';
import {VisitorsComponent} from './view/dashboard/visitors/visitors.component';
import {DateFormatPipe} from './view/util/pipe/date.pipe';
import { StartEveningComponent } from './view/dashboard/visitors/start-evening/start-evening.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './util/auth.interceptor';
import {DateValueAccessorModule} from 'angular-date-value-accessor';
import { OverviewEveningComponent } from './view/dashboard/visitors/overview-evening/overview-evening.component';
import {ArchivedPipe} from './view/util/pipe/archived.pipe';
import { EventsComponent } from './view/dashboard/events/events.component';
import { AdminComponent } from './view/dashboard/admin/admin.component';

registerLocaleData(localeNLNL);

@NgModule({
  declarations: [
    // main component
    AppComponent,

    // login and such
    LoginComponent,

    // main frame
    DashboardComponent,

    // members page
    MembersComponent,
    MemberOverviewComponent,
    MemberCreateComponent,

    // visitors page
    VisitorsComponent,
    StartEveningComponent,
    OverviewEveningComponent,

    // events page

    // admin page

    // other pages
    NotFoundComponent,

    // pipes
    PageFilter,
    MemberFilter,
    DateFormatPipe,
    ArchivedPipe,
    EventsComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    NgbModalModule,
    HttpClientModule,
    DateValueAccessorModule,
  ],
  providers: [
    AuthInterceptor, {
      provide: HTTP_INTERCEPTORS,
      useValue: {hasBackdrop: false},
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: "nl-NL"
    },
    DateFormatPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
