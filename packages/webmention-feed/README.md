# webmention-feed

A Lit web component that fetches and displays [webmentions](https://indieweb.org/Webmention) for a given page URL.

## Install

```bash
npm install webmention-feed
```

Or drop `dist/webmention-feed.js` directly into your project.

## Usage

```html
<script type="module" src="/webmention-feed.js"></script>

<webmention-feed
  post-url="https://example.com/blog/my-post"
  endpoint="https://webmention.io/example.com/webmention"
></webmention-feed>
```

## Attributes

| Attribute | Description |
|---|---|
| `post-url` | Canonical URL of the page to fetch mentions for |
| `endpoint` | POST endpoint for submitting new webmentions |
| `fetch-endpoint` | GET endpoint for fetching mentions (default: webmention.io) |

## CSS Custom Properties

| Property | Default | Description |
|---|---|---|
| `--wm-accent-color` | `#2563eb` | Links and button background |
| `--wm-text-color` | `inherit` | Body text |
| `--wm-border-color` | `#6b7280` | Top separator border |
| `--wm-reply-bg` | `transparent` | Reply card background |
| `--wm-reply-border-color` | `#d1d5db` | Reply card border |
| `--wm-input-bg` | `#ffffff` | URL input background |
| `--wm-input-border-color` | `#9ca3af` | URL input border |
| `--wm-avatar-bg` | `#9ca3af` | Placeholder avatar background |
| `--wm-button-text-color` | `#ffffff` | Send button text |

## CSS Parts

Target internals with `webmention-feed::part(name)`.

`base` · `heading` · `send-form` · `input` · `button` · `list` · `reactions` · `stat` · `replies` · `reply` · `reply-meta` · `avatar` · `reply-author` · `reply-date` · `reply-link` · `reply-content` · `status`

## Slots

| Slot | Default | Description |
|---|---|---|
| `like-icon` | ♥ | Icon before the like count |
| `repost-icon` | ↩ | Icon before the repost count |
