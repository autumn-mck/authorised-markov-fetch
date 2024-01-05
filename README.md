## authorised-markov-fetch

A script to create a database of posts compatible with the [mstdn-ebooks](https://github.com/Lynnesbian/mstdn-ebooks) or [pleroma-ebooks](https://github.com/ioistired/pleroma-ebooks) -based [markov](https://en.wikipedia.org/wiki/Markov_chain) bots, that supports instances using secure/authorised fetch.

Rather than using ActivityPub outboxes and pretending to be an instance, which [authorised fetch breaks](https://github.com/Lynnesbian/mstdn-ebooks/wiki/Secure-fetch), this script relies on the bot's instance's API to fetch copies of posts.

Disadvantages:

- Currently requires _the bot's instance_ to support the Mastodon API (This still covers [Mastodon](https://joinmastodon.org/) & forks, [Akkoma](https://akkoma.social/), [Pleroma](https://pleroma.social/), [Iceshrimp](https://iceshrimp.dev/), [Sharkey](https://joinsharkey.org/), [Firefish](https://joinfirefish.org/) and probably more)
- Can only fetch posts that have already reached the bot's instance

Written as instances with authorised fetch enabled seem to be more and more common (good!), and also to look at some of the differnces between Node.js and [Bun](https://bun.sh/)
