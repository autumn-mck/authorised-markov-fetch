import { Db } from "../db/db";
import { Account } from "../models/account";
import { Config } from "../models/config";

export interface Api {
	getFollowing(config: Config, id: string): Promise<Account[]>;
	verifyCredentials(config: Config): Promise<string>;
	getAndSaveStatuses(config: Config, id: string, db: Db): Promise<void>;
}
