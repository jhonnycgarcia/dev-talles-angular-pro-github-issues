import { sleep } from "@helpers/sleep";
import { environment } from "src/environments/environment";
import { GitHubIssue } from "../interfaces";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

export const getIssueByNumber = async (issueNumber: string): Promise<GitHubIssue> => {
    // await sleep(1000);
    try {
      const resp = await fetch(
        `${BASE_URL}/issues/${issueNumber}`,
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
          }
        }
      );

      if (!resp.ok) { throw "Can't load issue by number"; }

      const issues: GitHubIssue = await resp.json();
      return issues;

    } catch (err) {
      throw `Can't get issue by number ${issueNumber}`;
    }
  }
