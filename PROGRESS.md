# JSR MENU — Progress Tracker

> Ye file har baar kholo aur dekho ki kaha tak kaam hua aur aage kya karna hai.
> Last updated: 09-08-2026

---

## 0. GOALS (Har cheez ka maqsad)

### Overall Goal (Ek line me)
> **JSR ke customer ko jab khaana achha lage, to use 30 second me ek genuine Google review likhne ka sabse easy tarika do — aur saath me JSR ka professional menu website bhi ho jo online presence badhaye.**

### Har hisse ka goal

| Hissa | Goal kya hai | Success kaise dikhega |
|---|---|---|
| **Menu site (index.html)** | JSR ka menu, photos, vibe professional tarike se dikhao — search karte waqt first impression strong ho | Customer menu dekhke aana chahe, photo share kare |
| **Review page (Cafe/Rooftop)** | Customer happy hue to turant review likhna ho — rating, tags, language choose kare | Har happy customer se 1+ review mile |
| **AI review generator** | Natural, human-sounding 5 review options har customer ke mood/language me | Customer copy karke Google Maps pe paste kare |
| **Google Maps integration** | Review ke saath "Open in Google Maps" ka seedha link ho | Asli reviews Google pe aayein |
| **Social proof (site pe)** | Bane hue reviews site pe bhi dikhein taaki naye visitors trust karein | Site pe reviews dekhkar naye log aayein |
| **Language support** | Auto 3 reviews fixed order: **1. English, 2. Hinglish, 3. Gujarati (Roman/English alphabet)** — koi selection nahi | Har customer ko uski bhasha ka review mile |
| **Anti-repeat system** | Ek customer ko do baar same review na dikhe (sessionStorage) | Reviews unique feel hon |
| **Backend/API** | AI call server-side ho, API key safe rahe (browser me nahi) | Key leak na ho, AI sahi chalega |
| **Analytics** | Pata chale kitne log review generator use kar rahe, kya rating/tags/language choose kar rahe | Data se improvement ke decisions |
| **Deploy (Vercel)** | Site live ho — mobile + desktop, seedha link share ho | Koi bhi link se site khol sake |

### Priority (Sabse pehle kya important)
1. **Review generator ka flow** — customer ko Google Maps review tak le jaana (sabse bada value)
2. **Live deploy** — site abhi tak sirf local chalti hai, Vercel pe daalna zaroori
3. **Menu site polish** — photos/menu update, mobile-friendly
4. **Social proof showcase** — reviews site pe dikhane ka section
5. **Growth** — aur businesses/dukkar ke liye system ready rakhna (agar SaaS banana ho)

---

## 1. Ye project kya hai

- **JSR (Jamsham)** ka restaurant menu website + Google review generator.
- 2 review pages:
  - `/jamshamreview` — Jamsham Cafe
  - `/jamshamrooftopreview` — Jamsham Rooftop
- Reviews AI se generate hote hain (OpenAI `gpt-4o-mini`), customer rating/tags/language choose karta hai.

---

## 2. File structure

```
index.html               -> Main menu site (hero images: hero-bg/food/owner.webp)
jamshamreview.html       -> Cafe review page
jamshamrooftopreview.html-> Rooftop review page
server.js                -> Local HTTPS server (port 3006, cert.pfx + passphrase 'jsrpass')
vercel.json              -> Vercel rewrites for review pages
cert.cer / cert.pfx      -> Local SSL cert
api/generate-reviews.js  -> Vercel serverless: AI review generation
api/analytics.js         -> Vercel serverless: analytics logging
review/
  app.js                 -> Main review UI logic (rating/tags/language/session)
  templates.js           -> HTML templates for reviews UI
  review.css             -> Styling
  businesses.js          -> Business config (Cafe + Rooftop)
  analytics.js           -> Frontend analytics beacon
```

---

## 3. Kya ho chuka hai (DONE)

- [x] Menu site `index.html` ban gaya (hero images ke saath).
- [x] Dono review pages (`jamshamreview.html` + `jamshamrooftopreview.html`) ban gaye.
- [x] Review app (UI) complete — rating, tags, language (English/Hindi/Gujarati/Hinglish), 5 AI review options.
- [x] **Simplified flow (08-08)** — tags (food options) aur language selection HATA diye. Ab sirf: rating tap karo → auto **3 reviews**: 1st English, 2nd Hinglish, 3rd Gujarati (Roman alphabet), professional. Har card pe language badge.
- [x] Session handling — same customer ko repeat reviews nahi dikhte (sessionStorage).
- [x] Local HTTPS server — `npm start` (ya `node server.js`) se port 3006 pe chalta hai.
- [x] OpenAI integration (server-side, API key server ke env me hai, browser me nahi).
- [x] Vercel deploy setup — `vercel.json` rewrites + `api/` serverless functions.
- [x] Analytics beacon bhi hai (log karta hai konsi reviews ban rahi hain).

---

## 4. Local chalane ka tarika

```powershell
$env:OPENAI_API_KEY = "sk-..."   # pehle baar me set karo (ya system env me)
node server.js
# phir browser me: https://localhost:3006
```

---

## 5. Aage kya karna hai (NEXT / TODO)

- [x] **Google Maps review link** — review generate hone ke baad "Open in Google Maps" button/step add karna (goal #1 ka core). Dono businesses ke Google Maps links chahiye. ✅ Done — businesses.js me reviewUrl hai, review card tap pe opens (app.js:354).
- [x] **Branch popup (09-08)** — hero me "📍 2 Branches" pill + ticker span click karo → bottom sheet opens → 2 options (Jamsham Rooftop / Jamsham Cafe) → naya tab me Google Maps listing khulta hai (g.page bina /review ke).
- [x] **JSR Hottie compact (09-08)** — desc hataya, cards chhote (mobile 92px strip, desktop 4-col slim).
- [x] **Shared anti-repeat (09-08)** — localStorage `jsr_shared_used` me dono businesses ke used reviews shared. Ab same browser me Cafe + Rooftop dono pe koi review line repeat nahi hoti. Test: 90 unique reviews, 0 duplicates.
- [x] **Language badge + rating (09-08)** — har review card pe "⭐ rating · 🌍/🇮🇳/💬/🙏 language" badge.
- [x] **Hero compact (09-08)** — hero-bg/hero-owner/hero-food images hataye, "Menu Dekho" CTA hata diya. Ab menu turant start hota hai.
- [x] **Footer branches (09-08)** — footer me dono branches ke Google Maps links clickable.
- [x] **Review page overhaul (09-08)** — Gujarati remove (sirf English + Hinglish, LANGS_ORDER `['en','hg']`), star tap karte hi review auto-generate (CTA button hataya), review direct ek editable box (textarea, auto-grow) me — alag card+editor nahi, "Copy & Review on Google" → "⭐ Post Review on Google", har rating (1-5) ke review me emoji guaranteed (EMOJI/MID/NEG pools + fallback fix, ⭐ U+2B50 range bhi detect), "🔄 Shuffle 2 more" regen button. 10 total suggestions/session (5 batches × 2 langs).
- [x] **Human/advanced templates (09-08)** — English + Hinglish ke saare reviews rewrite: realistic Google-review style, specific details, conversation tone. Sabse bada fix: pehle sirf 'overall experience' tag use hota tha → ab random 2 categories (food/service/ambience/rooftop...). Opening-repeat bug fix: base opening (when ke bina) pe dedup + biz-name strip mismatch fix → 50 reviews me sirf 2 opening repeats (pool khatam hone par).
- [x] **Batch count fix (09-08)** — count sirf rating BADALNE pe hota hai (same star tap = toast + shuffle suggestion). Shuffle free/unlimited. `generate(countBatch)` param.
- [x] **Owner Panel (09-08)** — `/owner` page: apne asli customer reviews add/edit/delete (rating + language + business select). localStorage `jsr_owner_reviews`. Review pages pe custom reviews template reviews se PEHLE milte hain (matching rating + language, anti-repeat respected).
- [x] **Customer Save (09-08)** — har review card pe "💾 Save" → localStorage `jsr_saved_reviews` (is device pe). Page refresh/band ho to bhi "Saved reviews on this device" section me milte hain — copy/delete bhi. Event: `review_saved`, `saved_review_copied`.
- [x] **Owner Panel v2 — Server-side (10-08)** — reviews ab localStorage ki jagah server pe save hote hain (`data/reviews.json`, kisi bhi device se dikhte hain). Owner page ab **password se protected** hai (`POST /api/owner/login`, default password `jsrowner`, env `OWNER_PASSWORD` se badal sakte ho, 12h token). Dashboard me: total/rating-wise counts, analytics (visits, rating taps, copies, Google redirects — `data/analytics.json`), add/edit/delete review (delete server-side). APIs: `GET /api/reviews?business=...`, `POST/DELETE /api/owner/reviews` (auth), `GET /api/owner/summary` (auth). AI (OpenAI) **abhi connected nahi** — reviews template + owner pool se aate hain.
- [x] **Seed reviews (10-08)** — pehli baar server chalne pe 20 sample human-style reviews seed ho jaate hain (10 Cafe + 10 Rooftop, emoji ke saath, kuch me menu items ke naam). Id "seed-..." hoti hai, owner dashboard se delete kar sakte ho.
- [x] **Menu item names in reviews (10-08)** — templates me `{item}` placeholder add kiya. Ab har ~40% review me asli menu item ka naam aata hai (e.g. "Pink Sauce Pasta", "Mocha Cold Coffee", "Nutella Shake") — businesses.js `menuItems` se. Human feel + icon (emoji) dono guaranteed.
- [x] **Security (10-08)** — cert.pfx path aur passphrase ab env se (`CERT_PFX`, `CERT_PASSPHRASE`), default local values. Owner token in-memory (12h expiry). `robots.txt` add (Disallow: /owner, /api/). Images cache 7 din (604800), API responses `no-store`.
- [ ] **Vercel deploy** — kya live deploy hua? (`vercel deploy --prod`) Agar nahi hua to karna hai. **Note:** owner panel + reviews storage sirf local `node server.js` pe chalta hai — Vercel serverless pe alag storage chahiye hoga.
- [ ] **Vercel env var** — `OPENAI_API_KEY` Vercel project settings me add karna hai.
- [ ] **Site pe social proof** — kuch sample/real reviews menu site pe showcase karna.
- [ ] **Custom domain / SSL** — final domain decide karke link karna (agar chahiye).
- [ ] **Live test** — deploy ke baad dono review pages + menu site test karna (mobile view bhi).
- [ ] (Baaki kaam jo user ne bataya — yahan add karte raho)

---

## 6. Important notes

- API key kabhi `review/` ya HTML files me nahi dalna — sirf server/env me.
- Cert files (`cert.pfx`) local dev ke liye hain, Vercel pe need nahi (HTTPS auto hota hai). `.gitignore` me hain.
- `SESSION_KEY_RESET_ON_CHANGE` = rating/tags/language badalne par purani reviews reset hoti hain (by design).

### Security (09-08)
- Rate limit: `/api/generate-reviews` → 8 req/min/IP, analytics → 60 req/min/IP (server.js + api/*.js dono me), owner login → 10 req/min/IP.
- CORS allow-list: sirf localhost + Vercel URL + `ALLOWED_ORIGINS` env. Baaki origins → 403.
- Prompt injection: user input sanitize (control chars + trim + length cap), business/location ab user message me hain, system prompt me nahi.
- Static images (webp/png) → `Cache-Control: max-age=604800` (7 din), HTML/JS → no-cache, API responses → no-store.
- Owner panel: password login + 12h session token (in-memory). Default password `jsrowner` — env `OWNER_PASSWORD` se badlo. Reviews file `data/reviews.json`, analytics `data/analytics.json` (`.gitignore` me `data/` add karna bhoolna mat agar git use karte ho).
- Vercel deploy pe bhi same protection active hai (api/ files shared).
