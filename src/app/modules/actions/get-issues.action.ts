import { sleep } from "@helpers/sleep";
import { environment } from "src/environments/environment";
import { GitHubIssue, State } from "../interfaces";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

export const getIssues = async (
  state: State = State.All,
  selectedLabels: string[] = []
): Promise<GitHubIssue[]> => {

  // await sleep(1000);

  const params = new URLSearchParams();
  params.append('state', state);

  if (selectedLabels.length > 0) {
    params.append('labels', selectedLabels.join(','));
  }

  try {
    const resp = await fetch(
      `${BASE_URL}/issues?${params}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        }
      }
    );

    if(!resp.ok) { throw "Can't load issues"; }

    const issues: GitHubIssue[] = await resp.json();
    return issues;

  } catch (err) {
    throw "Can't get issues";
  }
}
