/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, Z = L.ShadowRoot && (L.ShadyCSS === void 0 || L.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, F = Symbol(), Y = /* @__PURE__ */ new WeakMap();
let lt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== F) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Z && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Y.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Y.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ut = (r) => new lt(typeof r == "string" ? r : r + "", void 0, F), mt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new lt(e, r, F);
}, gt = (r, t) => {
  if (Z) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = L.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, G = Z ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return ut(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: $t, defineProperty: ft, getOwnPropertyDescriptor: yt, getOwnPropertyNames: bt, getOwnPropertySymbols: _t, getPrototypeOf: vt } = Object, _ = globalThis, Q = _.trustedTypes, wt = Q ? Q.emptyScript : "", W = _.reactiveElementPolyfillSupport, U = (r, t) => r, z = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? wt : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, J = (r, t) => !$t(r, t), X = { attribute: !0, type: String, converter: z, reflect: !1, useDefault: !1, hasChanged: J };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), _.litPropertyMetadata ?? (_.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let x = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = X) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && ft(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = yt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const l = i == null ? void 0 : i.call(this);
      n == null || n.call(this, o), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? X;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties"))) return;
    const t = vt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
      const e = this.properties, s = [...bt(e), ..._t(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(G(i));
    } else t !== void 0 && e.push(G(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return gt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    var n;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : z).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, o;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const l = s.getPropertyOptions(i), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((n = l.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? l.converter : z;
      this._$Em = i;
      const d = a.fromAttribute(e, l.type);
      this[i] = d ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, n) {
    var o;
    if (t !== void 0) {
      const l = this.constructor;
      if (i === !1 && (n = this[t]), s ?? (s = l.getPropertyOptions(t)), !((s.hasChanged ?? J)(n, e) || s.useDefault && s.reflect && n === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(l._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: n }, o) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, o] of i) {
        const { wrapped: l } = o, a = this[n];
        l !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, o, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
      }), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[U("elementProperties")] = /* @__PURE__ */ new Map(), x[U("finalized")] = /* @__PURE__ */ new Map(), W == null || W({ ReactiveElement: x }), (_.reactiveElementVersions ?? (_.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis, tt = (r) => r, D = O.trustedTypes, et = D ? D.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, ht = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, pt = "?" + b, At = `<${pt}>`, E = document, M = () => E.createComment(""), T = (r) => r === null || typeof r != "object" && typeof r != "function", K = Array.isArray, Et = (r) => K(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", B = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, st = /-->/g, it = />/g, v = RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), rt = /'/g, ot = /"/g, ct = /^(?:script|style|textarea|title)$/i, xt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), g = xt(1), S = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), nt = /* @__PURE__ */ new WeakMap(), w = E.createTreeWalker(E, 129);
function dt(r, t) {
  if (!K(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return et !== void 0 ? et.createHTML(t) : t;
}
const St = (r, t) => {
  const e = r.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = C;
  for (let l = 0; l < e; l++) {
    const a = r[l];
    let d, c, h = -1, f = 0;
    for (; f < a.length && (o.lastIndex = f, c = o.exec(a), c !== null); ) f = o.lastIndex, o === C ? c[1] === "!--" ? o = st : c[1] !== void 0 ? o = it : c[2] !== void 0 ? (ct.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = v) : c[3] !== void 0 && (o = v) : o === v ? c[0] === ">" ? (o = i ?? C, h = -1) : c[1] === void 0 ? h = -2 : (h = o.lastIndex - c[2].length, d = c[1], o = c[3] === void 0 ? v : c[3] === '"' ? ot : rt) : o === ot || o === rt ? o = v : o === st || o === it ? o = C : (o = v, i = void 0);
    const y = o === v && r[l + 1].startsWith("/>") ? " " : "";
    n += o === C ? a + At : h >= 0 ? (s.push(d), a.slice(0, h) + ht + a.slice(h) + b + y) : a + b + (h === -2 ? l : y);
  }
  return [dt(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class R {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const l = t.length - 1, a = this.parts, [d, c] = St(t, e);
    if (this.el = R.createElement(d, s), w.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = w.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(ht)) {
          const f = c[o++], y = i.getAttribute(h).split(b), N = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: n, name: N[2], strings: y, ctor: N[1] === "." ? Ct : N[1] === "?" ? Ut : N[1] === "@" ? Ot : j }), i.removeAttribute(h);
        } else h.startsWith(b) && (a.push({ type: 6, index: n }), i.removeAttribute(h));
        if (ct.test(i.tagName)) {
          const h = i.textContent.split(b), f = h.length - 1;
          if (f > 0) {
            i.textContent = D ? D.emptyScript : "";
            for (let y = 0; y < f; y++) i.append(h[y], M()), w.nextNode(), a.push({ type: 2, index: ++n });
            i.append(h[f], M());
          }
        }
      } else if (i.nodeType === 8) if (i.data === pt) a.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(b, h + 1)) !== -1; ) a.push({ type: 7, index: n }), h += b.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = E.createElement("template");
    return s.innerHTML = t, s;
  }
}
function P(r, t, e = r, s) {
  var o, l;
  if (t === S) return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const n = T(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = P(r, i._$AS(r, t.values), i, s)), t;
}
class Pt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? E).importNode(e, !0);
    w.currentNode = i;
    let n = w.nextNode(), o = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let d;
        a.type === 2 ? d = new H(n, n.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (d = new kt(n, this, t)), this._$AV.push(d), a = s[++l];
      }
      o !== (a == null ? void 0 : a.index) && (n = w.nextNode(), o++);
    }
    return w.currentNode = E, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class H {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = P(this, t, e), T(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== S && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Et(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && T(this._$AH) ? this._$AA.nextSibling.data = t : this.T(E.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = R.createElement(dt(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(e);
    else {
      const o = new Pt(i, this), l = o.u(this.options);
      o.p(e), this.T(l), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = nt.get(t.strings);
    return e === void 0 && nt.set(t.strings, e = new R(t)), e;
  }
  k(t) {
    K(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new H(this.O(M()), this.O(M()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = tt(t).nextSibling;
      tt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class j {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = p;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = P(this, t, e, 0), o = !T(t) || t !== this._$AH && t !== S, o && (this._$AH = t);
    else {
      const l = t;
      let a, d;
      for (t = n[0], a = 0; a < n.length - 1; a++) d = P(this, l[s + a], e, a), d === S && (d = this._$AH[a]), o || (o = !T(d) || d !== this._$AH[a]), d === p ? t = p : t !== p && (t += (d ?? "") + n[a + 1]), this._$AH[a] = d;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ct extends j {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Ut extends j {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Ot extends j {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = P(this, t, e, 0) ?? p) === S) return;
    const s = this._$AH, i = t === p && s !== p || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== p && (s === p || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class kt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    P(this, t);
  }
}
const q = O.litHtmlPolyfillSupport;
q == null || q(R, H), (O.litHtmlVersions ?? (O.litHtmlVersions = [])).push("3.3.2");
const Mt = (r, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new H(t.insertBefore(M(), n), n, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A = globalThis;
class k extends x {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Mt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return S;
  }
}
var at;
k._$litElement$ = !0, k.finalized = !0, (at = A.litElementHydrateSupport) == null || at.call(A, { LitElement: k });
const V = A.litElementPolyfillSupport;
V == null || V({ LitElement: k });
(A.litElementVersions ?? (A.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Tt = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rt = { attribute: !0, type: String, converter: z, reflect: !1, hasChanged: J }, Ht = (r = Rt, t, e) => {
  const { kind: s, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), s === "setter" && ((r = Object.create(r)).wrapped = !0), n.set(e.name, r), s === "accessor") {
    const { name: o } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(o, a, r, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, r, l), l;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(l) {
      const a = this[o];
      t.call(this, l), this.requestUpdate(o, a, r, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function $(r) {
  return (t, e) => typeof e == "object" ? Ht(r, t, e) : ((s, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, s), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function I(r) {
  return $({ ...r, state: !0, attribute: !1 });
}
var Nt = Object.defineProperty, Lt = Object.getOwnPropertyDescriptor, m = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Lt(t, e) : t, n = r.length - 1, o; n >= 0; n--)
    (o = r[n]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Nt(t, e, i), i;
};
let u = class extends k {
  constructor() {
    super(...arguments), this.postUrl = "", this.endpoint = "", this.fetchEndpoint = "https://webmention.io/api/mentions.jf2", this.perPage = 10, this.heading = "Webmentions", this.loadingText = "Loading mentions…", this.emptyText = "No mentions yet.", this.sendDescription = "Written a response? Send a webmention:", this.submitLabel = "Send", this.sourceLabel = "Your post URL", this.anonymousLabel = "Anonymous", this.dateLocale = typeof navigator < "u" ? navigator.language : "en", this.mentions = [], this.loading = !1, this.error = !1, this.currentPage = 1;
  }
  connectedCallback() {
    super.connectedCallback(), this.postUrl && this.fetchMentions();
  }
  updated(r) {
    r.has("postUrl") && this.postUrl && (this.currentPage = 1, this.fetchMentions()), r.has("perPage") && (this.currentPage = 1);
  }
  async fetchMentions() {
    this.loading = !0, this.error = !1;
    try {
      const r = (c) => c.endsWith("/") ? c : `${c}/`, t = r(this.postUrl), e = new URL(t), i = e.hostname.startsWith("www.") ? e.hostname.slice(4) : `www.${e.hostname}`, n = r(
        `${e.protocol}//${i}${e.pathname}${e.search}`
      ), o = async (c) => {
        const h = await fetch(
          `${this.fetchEndpoint}?target=${encodeURIComponent(c)}&per-page=100`
        );
        if (!h.ok) throw new Error(`${h.status}`);
        return (await h.json()).children ?? [];
      }, [l, a] = await Promise.all([o(t), o(n)]), d = /* @__PURE__ */ new Set();
      this.mentions = [...l, ...a].filter((c) => d.has(c.url) ? !1 : (d.add(c.url), !0)), this.dispatchEvent(new CustomEvent("wm-load", {
        bubbles: !0,
        composed: !0,
        detail: {
          mentions: this.mentions,
          likeCount: this.likes.length,
          repostCount: this.reposts.length,
          replyCount: this.replies.length
        }
      }));
    } catch {
      this.error = !0, this.dispatchEvent(new CustomEvent("wm-error", { bubbles: !0, composed: !0 }));
    } finally {
      this.loading = !1;
    }
  }
  get likes() {
    return this.mentions.filter((r) => r["wm-property"] === "like-of");
  }
  get reposts() {
    return this.mentions.filter((r) => r["wm-property"] === "repost-of");
  }
  get replies() {
    return this.mentions.filter(
      (r) => r["wm-property"] === "in-reply-to" || r["wm-property"] === "mention-of"
    );
  }
  get totalPages() {
    return Math.max(1, Math.ceil(this.replies.length / this.perPage));
  }
  get pagedReplies() {
    const r = (this.currentPage - 1) * this.perPage;
    return this.replies.slice(r, r + this.perPage);
  }
  renderReply(r) {
    var i;
    const t = r.author ?? {}, e = t.name ?? this.anonymousLabel, s = r.published ? new Date(r.published).toLocaleDateString(this.dateLocale, {
      year: "numeric",
      month: "short",
      day: "numeric"
    }) : null;
    return g`
      <li class="reply" part="reply">
        <div class="reply-meta" part="reply-meta">
          ${t.photo ? g`<img src=${t.photo} alt=${e} class="avatar" part="avatar" width="28" height="28" />` : g`<span class="avatar placeholder" part="avatar" aria-hidden="true"></span>`}
          <span class="reply-author" part="reply-author">
            ${t.url ? g`<a href=${t.url} rel="noopener noreferrer" part="reply-author-link">${e}</a>` : e}
          </span>
          ${s ? g`<time class="reply-date" part="reply-date">${s}</time>` : p}
          <a
            href=${r.url}
            class="reply-link"
            part="reply-link"
            rel="noopener noreferrer"
            aria-label="View ${e}'s post"
          >→</a>
        </div>
        ${(i = r.content) != null && i.text ? g`<p class="reply-content" part="reply-content">${r.content.text}</p>` : p}
      </li>
    `;
  }
  renderPagination() {
    if (this.totalPages <= 1) return p;
    const r = this.currentPage === 1, t = this.currentPage === this.totalPages;
    return g`
      <div class="pagination" part="pagination">
        <button
          class="page-button"
          part="page-button page-button--prev ${r ? "page-button--disabled" : ""}"
          ?disabled=${r}
          @click=${() => {
      this.currentPage -= 1, this.dispatchEvent(new CustomEvent("wm-page-change", {
        bubbles: !0,
        composed: !0,
        detail: { page: this.currentPage, totalPages: this.totalPages }
      }));
    }}
        ><slot name="prev-label">← Prev</slot></button>

        <span class="page-info" part="page-info">
          ${this.currentPage} / ${this.totalPages}
        </span>

        <button
          class="page-button"
          part="page-button page-button--next ${t ? "page-button--disabled" : ""}"
          ?disabled=${t}
          @click=${() => {
      this.currentPage += 1, this.dispatchEvent(new CustomEvent("wm-page-change", {
        bubbles: !0,
        composed: !0,
        detail: { page: this.currentPage, totalPages: this.totalPages }
      }));
    }}
        ><slot name="next-label">Next →</slot></button>
      </div>
    `;
  }
  render() {
    const r = "wm-heading";
    return g`
      <section part="base" aria-labelledby=${r}>
        <h2 id=${r} part="heading">${this.heading}</h2>

        ${this.endpoint ? g`
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
        </div>` : p}

        <div class="list" part="list" aria-live="polite" aria-atomic="true">
          ${this.loading ? g`<p class="status" part="status">${this.loadingText}</p>` : this.error ? p : this.mentions.length === 0 ? g`<p class="status" part="status">${this.emptyText}</p>` : g`
                ${this.likes.length > 0 || this.reposts.length > 0 ? g`
                      <div class="reactions" part="reactions">
                        ${this.likes.length > 0 ? g`<span class="stat" part="stat">
                              <slot name="like-icon">♥</slot>
                              ${this.likes.length} like${this.likes.length !== 1 ? "s" : ""}
                            </span>` : p}
                        ${this.reposts.length > 0 ? g`<span class="stat" part="stat">
                              <slot name="repost-icon">↩</slot>
                              ${this.reposts.length} repost${this.reposts.length !== 1 ? "s" : ""}
                            </span>` : p}
                      </div>
                    ` : p}
                ${this.replies.length > 0 ? g`
                      <ol class="replies" part="replies" aria-label="${this.heading} replies">
                        ${this.pagedReplies.map((t) => this.renderReply(t))}
                      </ol>
                      ${this.renderPagination()}
                    ` : p}
              `}
        </div>
      </section>
    `;
  }
};
u.styles = mt`
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

    button:hover:not(:disabled) {
      filter: brightness(1.1);
    }

    button:focus-visible,
    input[type="url"]:focus-visible {
      outline: 2px solid var(--wm-accent-color);
      outline-offset: 2px;
    }

    input[type="url"]:hover {
      border-color: var(--wm-accent-color);
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
    .reply-author a:hover { text-decoration: underline; }
    .reply-author a:focus-visible {
      outline: 2px solid var(--wm-accent-color);
      outline-offset: 2px;
      border-radius: 2px;
    }

    .reply-date { font-size: 0.8rem; opacity: 0.6; margin-left: auto; }

    .reply-link { font-size: 0.85rem; color: var(--wm-accent-color); text-decoration: none; }
    .reply-link:hover { text-decoration: underline; }
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
m([
  $({ type: String, attribute: "post-url" })
], u.prototype, "postUrl", 2);
m([
  $({ type: String, attribute: "endpoint" })
], u.prototype, "endpoint", 2);
m([
  $({ type: String, attribute: "fetch-endpoint" })
], u.prototype, "fetchEndpoint", 2);
m([
  $({ type: Number, attribute: "per-page" })
], u.prototype, "perPage", 2);
m([
  $({ type: String, attribute: "heading" })
], u.prototype, "heading", 2);
m([
  $({ type: String, attribute: "loading-text" })
], u.prototype, "loadingText", 2);
m([
  $({ type: String, attribute: "empty-text" })
], u.prototype, "emptyText", 2);
m([
  $({ type: String, attribute: "send-description" })
], u.prototype, "sendDescription", 2);
m([
  $({ type: String, attribute: "submit-label" })
], u.prototype, "submitLabel", 2);
m([
  $({ type: String, attribute: "source-label" })
], u.prototype, "sourceLabel", 2);
m([
  $({ type: String, attribute: "anonymous-label" })
], u.prototype, "anonymousLabel", 2);
m([
  $({ type: String, attribute: "date-locale" })
], u.prototype, "dateLocale", 2);
m([
  I()
], u.prototype, "mentions", 2);
m([
  I()
], u.prototype, "loading", 2);
m([
  I()
], u.prototype, "error", 2);
m([
  I()
], u.prototype, "currentPage", 2);
u = m([
  Tt("webmention-feed")
], u);
export {
  u as WebmentionFeed
};
