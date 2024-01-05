export class Account {
	id!: string;
	/** username without domain */
	username!: string;
	/** username with domain when remote, but does not include domain if local ("webfinger account URI") */
	acct!: string;

	// ... and a whole bunch of other stuff we don't care about for this
}
