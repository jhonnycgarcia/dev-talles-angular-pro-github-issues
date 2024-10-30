import { sleep } from "@helpers/sleep";
import { environment } from "src/environments/environment";
import { GitHubIssue } from "../interfaces";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

export const getIssues
 = async (): Promise<GitHubIssue[]> => {

  await sleep(1000);
  try {
    const resp = await fetch(
      `${BASE_URL}/labels`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        }
      }
    );

    if(!resp.ok) { throw "Can't load issues"; }

    const issues: GitHubIssue[] = await resp.json();
    console.log({ issues });

    return issues;

  } catch (err) {
    throw "Can't get issues";
  }
}
