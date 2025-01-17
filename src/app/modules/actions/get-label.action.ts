import { sleep } from "@helpers/sleep";
import { environment } from "src/environments/environment";
import { GitHubLabel } from "../interfaces";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

export const getLabels = async (): Promise<GitHubLabel[]> => {
  // await sleep(1000);
  try {
    const resp = await fetch(
      `${BASE_URL}/labels`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        }
      }
    );

    if(!resp.ok) { throw "Can't load labels"; }

    const labels: GitHubLabel[] = await resp.json();
    return labels;

  } catch (err) {
    throw "Can't get labels";
  }
}
