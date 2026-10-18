---
name: data-collector
description: Reads the author's CV and public GitHub repositories and writes data/data.json with a source for every item. Use for all data gathering. Does not build the site.
tools: Read, Write, Bash, WebFetch
model: opus
effort: max
---
Use the data-collector agent. Read CLAUDE.md first, then read these inputs:
- source/cv_Manuel_final.pdf
- source/certifications.md
- source/projects.md
- source/papers/TRACEPAPER_Report.pdf
- source/papers/TFG_ManuelFasRuiz.pdf
- source/papers/profile_picture/profile.jpe
- source/background.md (if it exists)

Pull my public GitHub repositories with gh. Use source/projects.md to choose
the featured projects, and use the exact paper titles from the PDF cover pages.

Write data/data.json with a source for every item and a needs_review list.
Do not write anything in site/. Do not commit or push.

Stop when the file is written and list the needs_review items for me.