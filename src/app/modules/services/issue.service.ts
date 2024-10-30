import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getIssueByNumber, getIssueCommnetsByNumber } from '../actions';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private issueNumber = signal<string | null>(null)

  public issueQuery = injectQuery(() => ({
    enabled: this.issueNumber() != null,
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueByNumber( this.issueNumber()! ),
  }));

  public issueCommentsQuery = injectQuery(() => ({
    enabled: this.issueNumber() != null,
    queryKey: ['issue', this.issueNumber(), 'comments'],
    queryFn: () => getIssueCommnetsByNumber( this.issueNumber()! ),
  }));

  setIssueNumber(issueNumber: string) {
    this.issueNumber.set(issueNumber);
  }

}
