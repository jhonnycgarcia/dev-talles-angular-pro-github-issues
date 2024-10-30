import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { GitHubIssue, State } from '../../interfaces';
import { RouterLink } from '@angular/router';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'issue-item',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './issue-item.component.html',
})
export class IssueItemComponent {

  issue = input.required<GitHubIssue>();
  private issueSrv = inject(IssueService);

  get isOpen() {
    return this.issue().state === State.Open;
  }

  get since() {
    const date = new Date(this.issue().created_at);
    return date.toLocaleDateString();
  }

  prefetchData() {
    // this.issueSrv.prefetchIssue(this.issue().number.toString());
    this.issueSrv.setIssueData(this.issue());
  }

}
