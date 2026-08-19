# vibe-workshop

**Vibe Coding: Building Software by Collaborating with AI** — a half-day, 4-module workshop for a mixed technical/non-technical audience. Open [`index.html`](index.html) in a browser; there's no build step.

## Structure

Built on the `flat-html-lesson-site` archetype documented in the sibling [`workshop-archetypes`](../workshop-archetypes/index.html) repo (a teardown of [sands-mvcc/ot](https://sands-mvcc.github.io/ot/)), scaled from that source's 5-day/12-lesson format down to this one's half-day/4-module format:

```
vibe-workshop/
├── index.html                    # hub
├── modules/
│   ├── module-01.html            # What Is Vibe Coding? (Foundations) — full
│   ├── module-02.html            # The Vibe Coding Loop (Practice) — full
│   ├── module-03.html            # Judgment & Guardrails — stub
│   └── module-04.html            # Capstone (build → teach → critique) — stub
├── instructor/
│   ├── teaching-guide.html       # schedule, facilitation notes, dated link audit
│   ├── responsible-use.html      # read by everyone before Module 1
│   └── assessment-bank.html      # aggregated answer keys + capstone rubric
├── reference/
│   └── prompt-cheatsheet.html    # Module 2's prompt patterns, one page
├── shared/
│   ├── theme.css                 # one stylesheet, one localStorage theme key
│   ├── nav.js                    # theme toggle, sidebar (on-page nav, objectives progress, glossary)
│   └── quiz-engine.js            # quiz grading + matching-activity checking
└── archive/                      # parking lot for out-of-scope content, currently empty
```

Modules 1–2 are fully written; 3–4 are real but intentionally lighter ("stub" per the site's own labeling) — fill those out before this becomes the standing deck.

## Deliberate deviations from the source blueprint

The archetype blueprint's directory plan also includes `simulators/` (standalone deep-dive interactive pages, separate from the inline module simulation) and `tools/` (an AI prompt-builder for authoring new modules). Both are skipped here: a half-day, 4-module course doesn't carry enough content to justify a separate simulators folder on top of each module's inline simulation, and there's no second author yet who needs a content-generation tool. Nothing on the hub links to either — per the blueprint's own finding on the source course, an unbuilt link is a promise nobody's kept, so it's left out rather than stubbed.
