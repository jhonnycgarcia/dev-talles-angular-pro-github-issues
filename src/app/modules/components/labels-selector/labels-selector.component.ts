import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { GitHubLabel } from '../../interfaces';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'issues-labels-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labels-selector.component.html',
})
export class LabelsSelectorComponent {

  public labels = input.required<GitHubLabel[]>();

  private issuesSrv = inject(IssuesService);

  onToggleLabel(label: string): void {
    this.issuesSrv.toggleLabel(label);
  }

  isSelected(label: string): boolean {
    return this.issuesSrv.selectedLabels().has(label);
  }

}
