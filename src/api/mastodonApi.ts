import * as cheerio from "cheerio";
import { Db } from "../db/db";
import { Account } from "../models/account";
import { Config } from "../models/config";

export class MastodonApi {
	static async getFollowing(config: Config, id: string) {
		console.info(`Fetching followed accounts...`);
		return this.getPath(`api/v1/accounts/${id}/following`, config) as Promise<Account[]>;
	}

	static async verifyCredentials(config: Config) {
		console.info(`Verifying credentials for @${config.expected_acct}...`);
		const response = await this.getPath("api/v1/accounts/verify_credentials", config);
		if (response.error) {
			throw new Error(response.error);
		}

		if (config.expected_acct && config.expected_acct !== response.acct) {
			throw new Error(`Expected account @${config.expected_acct}, got @${response.acct}`);
		}

		return response.id as string;
	}

	static async fetchStatusesBefore(config: Config, id: string, max_id?: string): Promise<any[]> {
		return this.postPath(`api/v1/accounts/${id}/statuses`, config, {
			exclude_reblogs: true,
			...(max_id && { max_id }),
		});
	}

	static async getAndSaveStatuses(config: Config, id: string, db: Db) {
		let newestStatusDate = new Date(config.fetch_back_to);
		console.info(`Fetching statuses until ${newestStatusDate.toISOString()} from ${id}...`);

		let fetchMoreStatuses = false;
		let lastStatusId = undefined;

		do {
			const statuses = await this.fetchStatusesBefore(config, id, lastStatusId);

			fetchMoreStatuses = statuses.length == 20;
			if (statuses.length == 0) break;

			statuses.forEach((status) => (status.content = this.getTextFromHtml(status.content)));
			statuses.forEach((status) => db.insertStatus(status));

			const lastStatus = statuses.at(-1)!;
			console.log(`${lastStatus.id}: ${lastStatus.created_at}`);

			fetchMoreStatuses = new Date(lastStatus.created_at) > newestStatusDate;
			lastStatusId = lastStatus.id;
		} while (fetchMoreStatuses);
	}

	static getTextFromHtml(html: string) {
		const $ = cheerio.load(html);
		$("br").replaceWith("\n");
		return $.text();
	}

	static async getPath(path: string, config: Config) {
		const response = await fetch(`https://${config.instance}/${path}`, {
			headers: {
				Authorization: `Bearer ${config.access_token}`,
				"Content-Type": "application/json",
			},
		});
		return response.json();
	}

	static async postPath(path: string, config: Config, body: any) {
		const urlParams = new URLSearchParams(body);
		const response = await fetch(`https://${config.instance}/${path}?${urlParams}`, {
			headers: {
				Authorization: `Bearer ${config.access_token}`,
				"Content-Type": "application/json",
			},
		});
		return response.json();
	}
}
