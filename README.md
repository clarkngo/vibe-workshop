# vibe-workshop

**Vibe Coding: Building Software by Collaborating with AI** — a half-day, 4-module workshop for a mixed technical/non-technical audience. Open [`index.html`](index.html) in a browser; there's no build step.

## Structure

Built to match how [sands-mvcc/ot](https://sands-mvcc.github.io/ot/) — the source course behind the `flat-html-lesson-site` archetype documented in the sibling [`workshop-archetypes`](../workshop-archetypes/index.html) repo — is *actually* constructed: every page sits flat at the repository root and is fully self-contained, with its own `<style>` and `<script>` inlined rather than pulled from shared files. No folders, no build step, no shared assets to keep in sync — clone it and open a file.

```
vibe-workshop/
├── index.html                     # hub: strand overview, module grid, labs, resources
│
├── module-01.html                 # What Is Vibe Coding? (Foundations) — full
├── module-02.html                 # The Vibe Coding Loop (Practice) — full
├── module-03.html                 # Judgment & Guardrails — stub
├── module-04.html                 # Capstone (build → teach → critique) — stub
│
├── labs.html                      # lab index + facilitation note
├── lab-01-rewrite-a-prompt.html   # deeper follow-up to Module 02's activity
├── lab-02-read-the-diff.html      # five realistic diffs, each with something wrong
├── lab-03-blast-radius-audit.html # apply Module 03's framework to a real backlog
│
├── core-frameworks.html           # the workshop's own models + NIST AI RMF / OWASP LLM Top 10 pointers
├── prompt-builder.html            # live prompt assembler + facilitator's module-drafting tool
│
├── teaching-guide.html            # instructor: schedule, facilitation notes, dated link audit
├── responsible-use.html           # read by everyone before Module 1
├── assessment-bank.html           # instructor: aggregated answer keys + capstone rubric
├── faculty-resources.html         # instructor hub: the three pages above + setup checklist + pre-work email
│
└── prompt-cheatsheet.html         # Module 2's prompt patterns, one page
```

Modules 1–2 are fully written; 3–4 are real but intentionally lighter ("stub" per the site's own labeling) — fill those out before this becomes the standing deck. The three labs, the core-frameworks reference, and the prompt-builder tool are all fully built, not stubs.

Each file inlines the same ~360 lines of CSS and the same nav/quiz JS as every other page, on purpose — that duplication is the source archetype's actual tradeoff (zero infrastructure, fault-isolated pages) not an oversight. See the [archetype blueprint](../workshop-archetypes/index.html#strengths) for what that trades away: a one-line style change means editing every file.

## Mapping to the source archetype

| Source pattern | This site |
|---|---|
| Lesson pages (`lessonNN.html`) | `module-01.html`–`module-04.html` |
| Standalone simulator pages (`simNN.html`) | Not built — each module's simulation stays inline; a half-day course doesn't carry enough content to justify a separate deep-dive page per module |
| `teaching-guide.html` | `teaching-guide.html` (same role: pacing, facilitation notes, dated link audit) |
| Framework/standard reference cards | `core-frameworks.html` |
| Faculty resources grouping | `faculty-resources.html` |
| `ot-gen-*.html` AI content-generation tools | `prompt-builder.html`'s "Draft a New Module" tab |
| (not present in the source) | `labs.html` + three lab pages — this workshop's own addition, no source equivalent |

`instructor`-only pages (`teaching-guide.html`, `responsible-use.html`, `assessment-bank.html`) are separated by page, not by folder — matching the source's own page-level, not folder-level, separation.
