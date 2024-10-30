import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IssuesService } from '../../services/issues.service';
import { LabelsSelectorComponent } from "../../components/labels-selector/labels-selector.component";
import { IssueItemComponent } from '../../components/issue-item/issue-item.component';

@Component({
  selector: 'app-issues-list-page',
  standalone: true,
  imports: [
    CommonModule,
    IssueItemComponent,
    LabelsSelectorComponent,
],
  templateUrl: './issues-list-page.component.html'
})
export default class IssuesListPageComponent {

  private issuesSrv = inject(IssuesService);

  get labelsQuery() {
    return this.issuesSrv.labelsQuery;
  }

  get issuesQuery() {
    return this.issuesSrv.issuesQuery;
  }

}
