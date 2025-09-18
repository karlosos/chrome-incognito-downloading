# ChromeIssue

Read the blog post about the issue: https://www.dzialowski.eu/downloading-blobs-chrome-incognito/

> When trying to download blobs in Chrome's Incognito mode, the download fails when the file is larger than 2GB. This issue doesn't occur in regular browsing mode, or in Firefox Incognito mode.

## Tasks

- `npx nx serve web`
- `npx nx serve backend`

## Backend

- `GET http://localhost:3000/generate-file?size=512` to generate a file with size 512 mbs
