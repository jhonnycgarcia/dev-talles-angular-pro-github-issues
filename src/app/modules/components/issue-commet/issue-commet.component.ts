import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { GitHubIssue } from '../../interfaces';

@Component({
  selector: 'issue-commet',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownModule
  ],
  templateUrl: './issue-commet.component.html',
})
export class IssueCommetComponent {

  issue = input.required<GitHubIssue>();

}
