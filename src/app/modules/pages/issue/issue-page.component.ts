import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { IssueService } from '../../services/issue.service';
import { IssueCommetComponent } from '../../components/issue-commet/issue-commet.component';

@Component({
  selector: 'app-issue-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IssueCommetComponent,
  ],
  templateUrl: './issue-page.component.html'
})
export default class IssuePageComponent {

  private route = inject(ActivatedRoute);
  private issueSrv = inject(IssueService);

  public issueNumber = toSignal<string>(
    this.route.paramMap.pipe(
      map((params) => params.get('number') ?? ''),
      tap((issueNumber) => this.issueSrv.setIssueNumber(issueNumber))
    )
  );

  public issueQuery = this.issueSrv.issueQuery;

  public issueCommentsQuery = this.issueSrv.issueCommentsQuery;

}
