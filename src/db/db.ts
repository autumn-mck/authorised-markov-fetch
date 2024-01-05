import { Status } from "../models/status";

export interface Db {
	createTables(): void;
	fetchAllStatuses(): Status[];
	insertStatus(status: Status): void;
}
