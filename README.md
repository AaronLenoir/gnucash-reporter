# gnucash-reporter
Visualizes some reports on GnuCash data.

Unfinished personal project I'm working on to:

1. Learn about electron and node
2. Get some better visualizations of GnuCash data

# Features

Currently it only (kind of) displays a summary balance of the main accounts in a GnuCash file.

It only supports sqlite GnuCash files at the moment.

It's not in a usable state yet, but interesting enough (for me) to keep around.

# Running

Assuming you have npm, electron and git:

```
git clone https://github.com/AaronLenoir/gnucash-reporter.git
cd gnucash-reporter
npm install
npm start
```

If it works and runs, it should first ask you to locate a gnucash file. Make sure it's a sqlite gnucash file. There's an example file included in this repository.
