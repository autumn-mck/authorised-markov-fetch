import Database from "bun:sqlite";
import { Db } from "./db";
import { Status } from "../models/status";

export class BunSqliteDb implements Db {
	private static schema = `
CREATE TABLE IF NOT EXISTS posts (
	post_id TEXT PRIMARY KEY NOT NULL,
	summary TEXT,
	content TEXT,
	is_reply BOOLEAN,
	published_at REAL NOT NULL,
	visibility TEXT
);
`;

	private db: Database;

	constructor(path: string) {
		this.db = new Database(path);
		this.createTables();
	}

	fetchAllStatuses(): Status[] {
		return this.db
			.prepare(
				`
SELECT * FROM posts
`
			)
			.all() as Status[];
	}

	createTables() {
		this.db.run(BunSqliteDb.schema);
	}

	insertStatus(status: Status) {
		this.db
			.prepare(
				`
INSERT INTO posts (
	post_id,
	summary,
	content,
	is_reply,
	published_at,
	visibility
) VALUES (?, ?, ?, ?, ?, ?);
`
			)
			.run(
				status.id,
				status.spoiler_text ? status.spoiler_text : null,
				status.content,
				status.in_reply_to_id != null,
				Math.floor(new Date(status.created_at).getTime() / 1000),
				status.visibility
			);
	}
}
