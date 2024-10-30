import { TestBed } from '@angular/core/testing';
import { provideAngularQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { IssuesService } from './issues.service';

describe('IssuesService', () => {
  let service: IssuesService;
  const queryClient = new QueryClient();

  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false },
      providers: [ provideAngularQuery(queryClient) ]
    });
    service = TestBed.inject(IssuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load labels', async () => {
    const { data } = await service.labelsQuery.refetch();
    expect(data?.length).toBe(30);

    const [label] = data!;

    expect(typeof label.id).toBe('number');
    expect(typeof label.node_id).toBe('string');
    expect(typeof label.url).toBe('string');
    expect(typeof label.name).toBe('string');
    expect(typeof label.color).toBe('string');
    expect(typeof label.default).toBe('boolean');
    expect(typeof label.description).toBe('string');

  });

});
