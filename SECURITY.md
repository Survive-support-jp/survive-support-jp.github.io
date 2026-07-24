# Security policy

This is a static public website. Never commit customer data, contact submissions, API keys, passwords, or private keys.

The public contact form opens the visitor's mail client and does not transmit or store form contents on this site. The internal `customer-ledger.html` tool stores records only in the current browser's local storage; it must not be linked from public pages, and its data must never be committed or uploaded. Any future server-side form must have server-side validation, rate limiting, bot protection, authentication, authorization, audit logging, a privacy notice, and secrets stored outside the repository.

Report a suspected security issue through the contact form, without including sensitive personal information.
