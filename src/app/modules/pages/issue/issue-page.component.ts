import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'app-issue-page',
  standalone: true,
  imports: [
    CommonModule,
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

}
