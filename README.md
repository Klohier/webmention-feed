# webmention-feed

A Lit web component that fetches and displays [webmentions](https://indieweb.org/Webmention) for a given page URL.

## Install

```bash
npm install webmention-feed
```

## Setup with webmention.io

1. Sign in at [webmention.io](https://webmention.io) with your site URL
2. Add this to your site's `<head>`:
```html
<link rel="webmention" href="https://webmention.io/yoursite.com/webmention" />
```
3. Add the component to each post page, setting `post-url` to the canonical URL of that page:
```html
<webmention-feed
  post-url="https://yoursite.com/blog/my-post/"
  endpoint="https://webmention.io/yoursite.com/webmention"
></webmention-feed>
```

- `post-url` — the specific page to fetch mentions for
- `endpoint` — where the send form POSTs to (your webmention.io inbox)
- `fetch-endpoint` — no need to set this, defaults to webmention.io's API

The component automatically fetches mentions for both `yoursite.com` and `www.yoursite.com` to catch both URL variants.

If you self-host your own webmention endpoint, you can point the component at it via `fetch-endpoint` as long as it returns [JF2](https://jf2.spec.indieweb.org/) format:

```html
<webmention-feed
  post-url="https://yoursite.com/blog/my-post/"
  endpoint="https://yoursite.com/webmention"
  fetch-endpoint="https://yoursite.com/api/mentions.jf2"
></webmention-feed>
```

## Usage

```html
<script type="module" src="/webmention-feed.js"></script>

<webmention-feed
  post-url="https://example.com/blog/my-post"
  endpoint="https://webmention.io/example.com/webmention"
></webmention-feed>
```

## Attributes

| Attribute | Default | Description |
|---|---|---|
| `post-url` | — | Canonical URL of the page to fetch mentions for |
| `endpoint` | — | POST endpoint for submitting new webmentions |
| `fetch-endpoint` | webmention.io | GET endpoint for fetching mentions (JF2 format) |
| `per-page` | `10` | Number of replies shown per page |
| `heading` | `"Webmentions"` | Section heading text |
| `loading-text` | `"Loading mentions…"` | Text shown while fetching |
| `empty-text` | `"No mentions yet."` | Text shown when there are no mentions |
| `send-description` | `"Written a response? Send a webmention:"` | Prompt above the send form |
| `submit-label` | `"Send"` | Submit button text |
| `source-label` | `"Your post URL"` | Accessible label for the URL input |
| `anonymous-label` | `"Anonymous"` | Display name when author name is missing |
| `date-locale` | `navigator.language` | BCP 47 locale for formatting reply dates |

## CSS Custom Properties

| Property | Default | Description |
|---|---|---|
| `--wm-accent-color` | `#2563eb` | Links and button background |
| `--wm-text-color` | `inherit` | Body text |
| `--wm-border-color` | `#6b7280` | Top separator border |
| `--wm-reply-bg` | `transparent` | Reply card background |
| `--wm-reply-border-color` | `#d1d5db` | Reply card border |
| `--wm-input-bg` | `Canvas` | URL input background (adapts to dark mode) |
| `--wm-input-border-color` | `#9ca3af` | URL input border |
| `--wm-avatar-bg` | `#9ca3af` | Placeholder avatar background |
| `--wm-button-text-color` | `#ffffff` | Send button text |

## CSS Parts

Target internals with `webmention-feed::part(name)`.

`base` · `heading` · `send-form` · `input-label` · `input` · `button` · `list` · `reactions` · `stat` · `replies` · `reply` · `reply-meta` · `avatar` · `reply-author` · `reply-author-link` · `reply-date` · `reply-link` · `reply-content` · `status` · `pagination` · `page-button` · `page-button--prev` · `page-button--next` · `page-button--disabled` · `page-info`

```css
webmention-feed::part(pagination) {
  justify-content: center;
}

webmention-feed::part(page-button) {
  background: transparent;
  color: #2563eb;
  border: 1px solid currentColor;
}

webmention-feed::part(page-button--disabled) {
  opacity: 0.2;
}
```

## Slots

| Slot | Default | Description |
|---|---|---|
| `like-icon` | ♥ | Icon before the like count |
| `repost-icon` | ↩ | Icon before the repost count |
| `prev-label` | ← Prev | Previous page button label |
| `next-label` | Next → | Next page button label |

## Pagination

Replies are paginated automatically when there are more than `per-page` entries. Likes and reposts are always shown as counts and are not paginated.

```html
<webmention-feed
  post-url="https://example.com/blog/my-post"
  per-page="5"
>
  <span slot="prev-label">← Previous</span>
  <span slot="next-label">Next →</span>
</webmention-feed>
```

## Localisation

All user-facing strings can be replaced via attributes:

```html
<webmention-feed
  post-url="https://example.com/blog/my-post"
  heading="Reactions"
  loading-text="Fetching responses…"
  empty-text="No responses yet."
  send-description="Have you written a reply? Send a webmention:"
  submit-label="Submit"
  source-label="URL of your post"
  anonymous-label="Someone"
  date-locale="fr-FR"
></webmention-feed>
```
