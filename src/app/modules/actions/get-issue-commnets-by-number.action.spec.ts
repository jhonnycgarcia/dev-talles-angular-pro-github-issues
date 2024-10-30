import { environment } from "src/environments/environment";
import { getIssueCommnetsByNumber } from "./get-issue-commnets-by-number.action";

const issueNumber = '123';
const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

const mockCommnets = [
  { id: 1, body: 'This is a test comment' },
  { id: 2, body: 'This is another test comment' },
];

describe('getIssueCommnetsByNumber action', async() => {

  it('should fetch issue commnets by number successfully', async () => {
    const requestUrl = `${BASE_URL}/issues/${issueNumber}/comments`;
    const issueReponse = new Response(
      JSON.stringify(mockCommnets),
      {
        status: 200,
        statusText: 'OK',
      }
    );

    spyOn(window, 'fetch').and.resolveTo(issueReponse);

    const commnets = await getIssueCommnetsByNumber(issueNumber);

    expect(window.fetch).toHaveBeenCalledWith(requestUrl, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      }
    });

    expect(commnets).toEqual(mockCommnets as any);
  });

  it('should throw an error if the response is not ok', async () => {
    const issueReponse = new Response(
      null,
      {
        status: 404,
        statusText: 'Not Found',
      }
    );

    spyOn(window, 'fetch').and.resolveTo(issueReponse);

    try {
      await getIssueCommnetsByNumber(issueNumber);
      expect(true).toBeFalsy();
    } catch (err) {
      expect(err).toBe(`Can't get issue comments by number ${issueNumber}`);
    }

  });

});
