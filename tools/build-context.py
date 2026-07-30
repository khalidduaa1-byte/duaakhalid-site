#!/usr/bin/env python3
"""Generate api/context.md — the grounded fact sheet the /ask bot answers from.

Everything here is extracted from index.html itself, so the bot can only state
what the site already states. Re-run after any copy change:

    python3 tools/build-context.py

The output is committed, so Vercel needs no build step.
"""
import json, re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
RX_TPL = re.compile(r'<script type="__bundler/template">\n(.*?)\n  </script>', re.S)


def decoded_template() -> str:
    src = (ROOT / "index.html").read_text(encoding="utf-8")
    m = RX_TPL.search(src)
    if not m:
        sys.exit("FATAL: template block not found in index.html")
    return json.loads(m.group(1))


def js_str(raw: str) -> str:
    """Unescape a single-quoted JS string literal."""
    return (raw.replace("\\u2019", "\u2019").replace("\\'", "'")
               .replace('\\"', '"').replace("\\\\", "\\"))


def scalar(block: str, key: str) -> str:
    m = re.search(key + r":\s*'((?:[^'\\]|\\.)*)'", block)
    return js_str(m.group(1)) if m else ""


def pairs(block: str, field: str) -> list[tuple[str, str]]:
    """Extract [{ t: '...', b: '...' }] entries from a named array field."""
    if re.search(field + r":\s*\[\s*\]", block):
        return []  # explicitly empty; don't let .*? run on into the next array
    m = re.search(field + r":\s*\[(.*?)\n        \]", block, re.S)
    if not m:
        return []
    return [(js_str(t), js_str(b)) for t, b in re.findall(
        r"\{\s*t:\s*'((?:[^'\\]|\\.)*)',\s*b:\s*'((?:[^'\\]|\\.)*)'\s*\}", m.group(1))]


def metrics(block: str) -> list[tuple[str, str]]:
    m = re.search(r"metrics:\s*\[(.*?)\]", block, re.S)
    if not m:
        return []
    return [(js_str(v), js_str(l)) for v, l in re.findall(
        r"\{\s*v:\s*'((?:[^'\\]|\\.)*)',\s*l:\s*'((?:[^'\\]|\\.)*)'\s*\}", m.group(1))]


def visible_text(html: str) -> str:
    txt = re.sub(r"<[^>]+>", " ", html)
    txt = (txt.replace("&amp;", "&").replace("&nbsp;", " ")
              .replace("&middot;", "·").replace("&rarr;", "->"))
    return re.sub(r"\s+", " ", txt).strip()


def main() -> None:
    tpl = decoded_template()

    # --- hero, thesis, journey: read from the single markup copy -------------
    hero_h1 = visible_text(re.search(r"<h1[^>]*>(.*?)</h1>", tpl, re.S).group(1))
    hero_sub = visible_text(re.search(
        r'max-width: 62ch; font-weight: 400;">(.*?)</p>', tpl, re.S).group(1))
    thesis = visible_text(re.search(
        r"(Most of my work starts.*?)</p>", tpl, re.S).group(1))

    out = ["# Facts about Duaa Khalid",
           "",
           "Generated from index.html. Everything below is stated on her portfolio.",
           "",
           "## Positioning",
           f"- Headline: {hero_h1}",
           f"- Summary: {hero_sub}",
           f"- In her own words: {thesis}",
           ""]

    # --- career track (the journey rows) ------------------------------------
    rows = re.findall(r'grid-template-columns: 210px 1fr 1fr;.*?(?=\n          <div style="display: grid|\n        </section>)',
                      tpl, re.S)
    if rows:
        out += ["## Career track (each step: the system that was broken, then what she did)"]
        for r in rows:
            when = re.search(r'padding: 26px 56px;">(.*?)</div></div>', r, re.S)
            mess = re.search(r'background: var\(--color-surface\);[^>]*>(.*?)</div>', r, re.S)
            did = re.search(r'padding: 26px 28px; font-size: 16px[^>]*>(.*?)$', r, re.S)
            parts = [visible_text(x.group(1)) for x in (when, mess, did) if x]
            parts = [p for p in parts if p]
            if parts:
                out.append("- " + " || ".join(parts))
        out.append("")

    # --- projects: parse the first data-dc-script copy -----------------------
    script = tpl.split("<script data-dc-script")[0]
    blocks = re.split(r"\n      \{\n        title:", script)[1:]
    out.append("## Projects")
    for b in blocks:
        b = "title:" + b
        title = scalar(b, "title")
        if not title:
            continue
        out += ["", f"### {title}",
                f"- Context: {scalar(b, 'kicker')}",
                f"- What it is: {scalar(b, 'dek')}",
                f"- Problem: {scalar(b, 'problem')}",
                f"- Her role: {scalar(b, 'role')}",
                f"- Outcome: {scalar(b, 'outcome')}"]
        live, repo = scalar(b, "liveUrl"), scalar(b, "repoUrl")
        if live:
            out.append(f"- Link ({scalar(b, 'liveLabel')}): {live}")
        if repo and repo != live:
            out.append(f"- Repository: {repo}")
        note = scalar(b, "note")
        if note:
            out.append(f"- Scope note: {note}")
        ms = metrics(b)
        if ms:
            out.append("- Numbers: " + "; ".join(f"{v} = {l}" for v, l in ms))
        for label, field in (("Design decisions", "decisions"),
                             (scalar(b, "deeperTitle") or "Detail", "deeper"),
                             ("Caveats and limitations", "caveats")):
            ps = pairs(b, field)
            if ps:
                out.append(f"- {label}:")
                out += [f"    - {t}: {bb}" for t, bb in ps]

    # --- contact -------------------------------------------------------------
    out += ["", "## Contact",
            "- Email: Khalidduaa1@gmail.com",
            "- LinkedIn: https://linkedin.com/in/duaa-khalid",
            "- GitHub: https://github.com/khalidduaa1-byte",
            "- Resume: https://duaakhalid.com/resume.pdf",
            "- Open to roles starting after Cornell Tech, and to part time work sooner.",
            ""]

    dest = ROOT / "api" / "context.md"
    dest.parent.mkdir(exist_ok=True)
    text = "\n".join(out)
    dest.write_text(text, encoding="utf-8")
    print(f"wrote {dest.relative_to(ROOT)}  ({len(text)} chars, ~{len(text)//4} tokens)")


if __name__ == "__main__":
    main()
