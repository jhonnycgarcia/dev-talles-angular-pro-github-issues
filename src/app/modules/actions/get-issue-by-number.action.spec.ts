import { environment } from "src/environments/environment";
import { getIssueByNumber } from "./get-issue-by-number.action";

const issueNumber = '123';
const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

const moskIssue = {
  id: 123,
  number: issueNumber,
  body: 'This is a test issue',
};

describe('getIssueByNumber action', () => {

  it('should fetch issue by number successfully', async () => {
    const requestUrl = `${BASE_URL}/issues/${issueNumber}`;
    const issueReponse = new Response(
      JSON.stringify(moskIssue),
      {
        status: 200,
        statusText: 'OK',
      }
    );

    spyOn(window, 'fetch').and.resolveTo(issueReponse);

    const issue = await getIssueByNumber(issueNumber);

    expect(window.fetch).toHaveBeenCalledWith(requestUrl, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      }
    });

    expect(issue).toEqual(moskIssue as any);
  });

  it('should not fetch issues by number successfully', async () => {
    const issueReponse = new Response(
      null,
      {
        status: 404,
        statusText: 'Not Found',
      }
    );

    spyOn(window, 'fetch').and.resolveTo(issueReponse);

    try {
      await getIssueByNumber(issueNumber);
      expect(true).toBeFalsy();
    } catch (err) {
      expect(err).toBe(`Can't get issue by number ${issueNumber}`);
    }
  });

});
