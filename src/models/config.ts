export interface Config {
	db_path: string;
	instance: string;
	access_token: string;
	expected_acct: string; // useful if you want to make sure you're not accidentally posting from the wrong account
	fetch_back_to: string; // ISO date string
}
