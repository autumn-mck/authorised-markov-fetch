import config from "../config.json";
import { MastodonApi } from "./api/mastodonApi";
import { Api } from "./api/api";
import { BunSqliteDb } from "./db/bunSqliteDb";
import { Db } from "./db/db";

const db: Db = new BunSqliteDb(config.db_path);
db.createTables();

const api: Api = MastodonApi;

const id = await api.verifyCredentials(config);
const following = await api.getFollowing(config, id);

for (const account of following) {
	console.info(`Fetching posts from @${account.acct}...`);
	await api.getAndSaveStatuses(config, account.id, db);
}
