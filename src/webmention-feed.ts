import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

interface Author {
  name?: string;
  photo?: string;
  url?: string;
}

interface Mention {
  "wm-property": "like-of" | "repost-of" | "in-reply-to" | "mention-of";
  author?: Author;
  url: string;
  published?: string | null;
  content?: { text?: string };
}

/**
 * `<webmention-feed>` — fetches and displays webmentions for a given page.
 *
 * @attr {string} post-url - Canonical URL of the page to fetch mentions for.
 * @attr {string} endpoint - POST endpoint for submitting new webmentions.
 * @attr {string} fetch-endpoint - GET endpoint for fetching mentions (JF2 format). Defaults to webmention.io.
 * @attr {number} per-page - Number of replies to show per page. Default: 10.
 * @attr {string} heading - Text for the section heading. Default: "Webmentions".
 * @attr {string} loading-text - Text shown while fetching. Default: "Loading mentions…".
 * @attr {string} empty-text - Text shown when there are no mentions. Default: "No mentions yet."
 * @attr {string} send-description - Prompt text above the webmention form. Default: "Written a response? Send a webmention:".
 * @attr {string} submit-label - Submit button text. Default: "Send".
 * @attr {string} source-label - Accessible label for the URL input. Default: "Your post URL".
 * @attr {string} anonymous-label - Display name when author name is missing. Default: "Anonymous".
 * @attr {string} date-locale - BCP 47 locale for formatting reply dates. Default: navigator.language.
 *
 * @slot like-icon - Icon before the like count. Default: ♥
 * @slot repost-icon - Icon before the repost count. Default: ↩
 * @slot prev-label - Label for the previous page button. Default: ← Prev
 * @slot next-label - Label for the next page button. Default: Next →
 *
 * @cssvar --wm-accent-color
 * @cssvar --wm-text-color
 * @cssvar --wm-border-color
 * @cssvar --wm-reply-bg
 * @cssvar --wm-reply-border-color
 * @cssvar --wm-input-bg
 * @cssvar --wm-input-border-color
 * @cssvar --wm-avatar-bg
 * @cssvar --wm-button-text-color
 *
 * @csspart base
 * @csspart heading
 * @csspart send-form
 * @csspart input-label
 * @csspart input
 * @csspart button
 * @csspart list
 * @csspart reactions
 * @csspart stat
 * @csspart replies
 * @csspart reply
 * @csspart reply-meta
 * @csspart avatar
 * @csspart reply-author
 * @csspart reply-date
 * @csspart reply-link
 * @csspart reply-content
 * @csspart status
 * @csspart pagination
 * @csspart page-button
 * @csspart page-button--prev
 * @csspart page-button--next
 * @csspart page-button--disabled
 * @csspart page-info
 */
@customElement("webmention-feed")
export class WebmentionFeed extends LitElement {
  @property({ type: String, attribute: "post-url" }) postUrl = "";
  @property({ type: String, attribute: "endpoint" }) endpoint = "";
  @property({ type: String, attribute: "fetch-endpoint" })
  fetchEndpoint = "https://webmention.io/api/mentions.jf2";

  @property({ type: Number, attribute: "per-page" }) perPage = 10;

  // Localizable strings
  @property({ type: String, attribute: "heading" }) heading = "Webmentions";
  @property({ type: String, attribute: "loading-text" }) loadingText = "Loading mentions…";
  @property({ type: String, attribute: "empty-text" }) emptyText = "No mentions yet.";
  @property({ type: String, attribute: "send-description" }) sendDescription = "Written a response? Send a webmention:";
  @property({ type: String, attribute: "submit-label" }) submitLabel = "Send";
  @property({ type: String, attribute: "source-label" }) sourceLabel = "Your post URL";
  @property({ type: String, attribute: "anonymous-label" }) anonymousLabel = "Anonymous";
  @property({ type: String, attribute: "date-locale" }) dateLocale = typeof navigator !== "undefined" ? navigator.language : "en";

  @state() private mentions: Mention[] = [];
  @state() private loading = true;
  @state() private error = false;
  @state() private currentPage = 1;

  override connectedCallback() {
    super.connectedCallback();
    if (this.postUrl) this.fetchMentions();
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has("postUrl") && this.postUrl) {
      this.currentPage = 1;
      this.fetchMentions();
    }
    if (changed.has("perPage")) {
      this.currentPage = 1;
    }
  }

  private async fetchMentions() {
    this.loading = true;
    this.error = false;

    try {
      const normalize = (u: string) => (u.endsWith("/") ? u : `${u}/`);
      const url = normalize(this.postUrl);
      const parsed = new URL(url);

      const isWww = parsed.hostname.startsWith("www.");
      const altHostname = isWww ? parsed.hostname.slice(4) : `www.${parsed.hostname}`;
      const altUrl = normalize(
        `${parsed.protocol}//${altHostname}${parsed.pathname}${parsed.search}`
      );

      const fetchTarget = async (target: string) => {
        const res = await fetch(
          `${this.fetchEndpoint}?target=${encodeURIComponent(target)}&per-page=100`
        );
        if (!res.ok) throw new Error(`${res.status}`);
        const data = await res.json();
        return (data.children ?? []) as Mention[];
      };

      const [primary, alt] = await Promise.all([fetchTarget(url), fetchTarget(altUrl)]);
      const seen = new Set<string>();
      this.mentions = [...primary, ...alt].filter((m) => {
        if (seen.has(m.url)) return false;
        seen.add(m.url);
        return true;
      });
    } catch {
      this.error = true;
    } finally {
      this.loading = false;
    }
  }

  private get likes() {
    return this.mentions.filter((m) => m["wm-property"] === "like-of");
  }
  private get reposts() {
    return this.mentions.filter((m) => m["wm-property"] === "repost-of");
  }
  private get replies() {
    return this.mentions.filter(
      (m) => m["wm-property"] === "in-reply-to" || m["wm-property"] === "mention-of"
    );
  }

  private get totalPages() {
    return Math.max(1, Math.ceil(this.replies.length / this.perPage));
  }

  private get pagedReplies() {
    const start = (this.currentPage - 1) * this.perPage;
    return this.replies.slice(start, start + this.perPage);
  }

  private renderReply(m: Mention) {
    const author = m.author ?? {};
    const authorName = author.name ?? this.anonymousLabel;
    const date = m.published
      ? new Date(m.published).toLocaleDateString(this.dateLocale, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : null;

    return html`
      <li class="reply" part="reply">
        <div class="reply-meta" part="reply-meta">
          ${author.photo
            ? html`<img src=${author.photo} alt=${authorName} class="avatar" part="avatar" width="28" height="28" />`
            : html`<span class="avatar placeholder" part="avatar" aria-hidden="true"></span>`}
          <span class="reply-author" part="reply-author">
            ${author.url
              ? html`<a href=${author.url} rel="noopener noreferrer">${authorName}</a>`
              : authorName}
          </span>
          ${date ? html`<time class="reply-date" part="reply-date">${date}</time>` : nothing}
          <a
            href=${m.url}
            class="reply-link"
            part="reply-link"
            rel="noopener noreferrer"
            aria-label="View ${authorName}'s post"
          >→</a>
        </div>
        ${m.content?.text
          ? html`<p class="reply-content" part="reply-content">${m.content.text}</p>`
          : nothing}
      </li>
    `;
  }

  private renderPagination() {
    if (this.totalPages <= 1) return nothing;

    const prevDisabled = this.currentPage === 1;
    const nextDisabled = this.currentPage === this.totalPages;

    return html`
      <div class="pagination" part="pagination">
        <button
          class="page-button"
          part="page-button page-button--prev ${prevDisabled ? "page-button--disabled" : ""}"
          ?disabled=${prevDisabled}
          @click=${() => { this.currentPage -= 1; }}
        ><slot name="prev-label">← Prev</slot></button>

        <span class="page-info" part="page-info">
          ${this.currentPage} / ${this.totalPages}
        </span>

        <button
          class="page-button"
          part="page-button page-button--next ${nextDisabled ? "page-button--disabled" : ""}"
          ?disabled=${nextDisabled}
          @click=${() => { this.currentPage += 1; }}
        ><slot name="next-label">Next →</slot></button>
      </div>
    `;
  }

  override render() {
    return html`
      <section part="base">
        <h2 part="heading">${this.heading}</h2>

        <div class="send" part="send-form">
          <p>${this.sendDescription}</p>
          <form action=${this.endpoint} method="post">
            <input type="hidden" name="target" .value=${this.postUrl} />
            <label class="input-label" part="input-label">
              <span class="visually-hidden">${this.sourceLabel}</span>
              <input
                type="url"
                name="source"
                placeholder="https://your-post-url.com"
                required
                part="input"
              />
            </label>
            <button type="submit" part="button">${this.submitLabel}</button>
          </form>
        </div>

        <div class="list" part="list">
          ${this.loading
            ? html`<p class="status" part="status">${this.loadingText}</p>`
            : this.error
            ? nothing
            : this.mentions.length === 0
            ? html`<p class="status" part="status">${this.emptyText}</p>`
            : html`
                ${this.likes.length > 0 || this.reposts.length > 0
                  ? html`
                      <div class="reactions" part="reactions">
                        ${this.likes.length > 0
                          ? html`<span class="stat" part="stat">
                              <slot name="like-icon">♥</slot>
                              ${this.likes.length} like${this.likes.length !== 1 ? "s" : ""}
                            </span>`
                          : nothing}
                        ${this.reposts.length > 0
                          ? html`<span class="stat" part="stat">
                              <slot name="repost-icon">↩</slot>
                              ${this.reposts.length} repost${this.reposts.length !== 1 ? "s" : ""}
                            </span>`
                          : nothing}
                      </div>
                    `
                  : nothing}
                ${this.replies.length > 0
                  ? html`
                      <ol class="replies" part="replies">
                        ${this.pagedReplies.map((m) => this.renderReply(m))}
                      </ol>
                      ${this.renderPagination()}
                    `
                  : nothing}
              `}
        </div>
      </section>
    `;
  }

  static override styles = css`
    :host {
      --wm-text-color: inherit;
      --wm-accent-color: #2563eb;
      --wm-border-color: #6b7280;
      --wm-reply-bg: transparent;
      --wm-reply-border-color: #d1d5db;
      --wm-input-bg: Canvas;
      --wm-input-border-color: #9ca3af;
      --wm-avatar-bg: #9ca3af;
      --wm-button-text-color: #ffffff;

      display: block;
      color: var(--wm-text-color);
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid var(--wm-border-color);
    }

    h2 { margin: 0 0 1.5rem; }

    .send p {
      font-size: 0.9rem;
      opacity: 0.75;
      margin: 0 0 0.5rem;
    }

    form {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-bottom: 2rem;
    }

    .input-label {
      flex: 1;
      min-width: 0;
      display: contents;
    }

    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    input[type="url"] {
      flex: 1;
      min-width: 0;
      padding: 0.4rem 0.75rem;
      border: 1px solid var(--wm-input-border-color);
      border-radius: 6px;
      background: var(--wm-input-bg);
      color: var(--wm-text-color);
      font-size: 0.9rem;
      font-family: inherit;
    }

    button {
      padding: 0.4rem 1rem;
      border-radius: 6px;
      border: none;
      background: var(--wm-accent-color);
      color: var(--wm-button-text-color);
      font-size: 0.9rem;
      font-family: inherit;
      cursor: pointer;
    }

    button:focus-visible,
    input[type="url"]:focus-visible {
      outline: 2px solid var(--wm-accent-color);
      outline-offset: 2px;
    }

    .status { font-size: 0.9rem; opacity: 0.6; }

    .reactions { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
    .stat { font-size: 0.9rem; opacity: 0.8; }

    .replies {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .reply {
      background: var(--wm-reply-bg);
      border: 1px solid var(--wm-reply-border-color);
      border-radius: 8px;
      padding: 0.75rem 1rem;
    }

    .reply-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-bottom: 0.4rem;
    }

    .avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
    }

    .avatar.placeholder {
      display: inline-block;
      background: var(--wm-avatar-bg);
    }

    .reply-author { font-size: 0.9rem; font-weight: 600; }
    .reply-author a { color: var(--wm-accent-color); text-decoration: none; }

    .reply-date { font-size: 0.8rem; opacity: 0.6; margin-left: auto; }

    .reply-link { font-size: 0.85rem; color: var(--wm-accent-color); text-decoration: none; }
    .reply-link:focus-visible {
      outline: 2px solid var(--wm-accent-color);
      outline-offset: 2px;
      border-radius: 2px;
    }

    .reply-content {
      margin: 0;
      font-size: 0.9rem;
      opacity: 0.85;
      line-height: 1.5;
    }

    .pagination {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-top: 1.5rem;
    }

    .page-button:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    .page-info {
      font-size: 0.9rem;
      opacity: 0.7;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "webmention-feed": WebmentionFeed;
  }
}
