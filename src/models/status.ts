export class Status {
	id!: string;
	/** datetime */
	created_at!: string;

	/** HTML (may include custom emojis) */
	content!: string;

	visibility!: string;
	spoiler_text!: string;

	in_reply_to_id!: string | null;
}
