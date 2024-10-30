import { Injectable, signal } from '@angular/core';
import { injectQuery, injectQueryClient } from '@tanstack/angular-query-experimental';
import { getIssueByNumber, getIssueCommnetsByNumber } from '../actions';
import { GitHubIssue } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private queryClient = injectQueryClient();
  private issueNumber = signal<string | null>(null)

  public issueQuery = injectQuery(() => ({
    enabled: this.issueNumber() != null,
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueByNumber( this.issueNumber()! ),
    staleTime: 1000 * 60 * 5,
  }));

  public issueCommentsQuery = injectQuery(() => ({
    enabled: this.issueNumber() != null,
    queryKey: ['issue', this.issueNumber(), 'comments'],
    queryFn: () => getIssueCommnetsByNumber( this.issueNumber()! ),
    staleTime: 1000 * 60 * 5,
  }));

  setIssueNumber(issueNumber: string) {
    this.issueNumber.set(issueNumber);
  }

  prefetchIssue(issueNumber: string) {
    this.queryClient.prefetchQuery({
      queryKey: ['issue', issueNumber],
      queryFn: () => getIssueByNumber(issueNumber),
      staleTime: 1000 * 60 * 5,
    });
  }

  setIssueData(issue: GitHubIssue) {
    this.queryClient.setQueryData<GitHubIssue>(
      ['issue', issue.number.toString()],
      issue,
      {
        updatedAt: Date.now() * 1000 * 60, // 1 minute
      }
    );
  }

}
