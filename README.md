A monorepo of framework-agnostic Lit web components.

## Packages

| Package                                         | Description                              |
| ----------------------------------------------- | ---------------------------------------- |
| [`webmention-feed`](./packages/webmention-feed) | Fetch and display webmentions for a page |

## Dev setup

```bash
pnpm install
pnpm build       # build all packages
pnpm dev         # watch all packages
```

## Releasing

```bash
pnpm changeset        # describe your changes
pnpm changeset version # bump versions + update changelogs
pnpm changeset publish # publish to npm
```
