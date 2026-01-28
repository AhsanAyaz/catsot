# Code at the Speed of Thought

**Gemini + Creative Coding Workshop**

Google Stockholm Office
January 28, 2026

Note:

- Welcome everyone warmly
- Check WiFi access works
- Remind: zero pre-work expected
- Total time: 3.5 hours (Part 1: 2h, Break: 30m, Part 2: 1.5h)

---

<img src="assets/images/workshop_qr.png" alt="Session QR"/>

<!-- .element: style="width: 250px; margin-top: 1rem; display: block; margin-left: auto; margin-right: auto;" -->

- All links related to this session
- Feedback form
- My socials

---

### Who Am I?

<div class="introduction flex justify-center">
  <div class="introduction__left">
    <img class="introduction__left__avatar" src="https://avatars.githubusercontent.com/u/9844254?v=4"/>
    <div class="introduction__left__info fragment flex items-center flex-col">
      <p>GDE in AI & Angular</p>
      <div style="display: flex; flex-direction: column; gap: 8px; align-items: center;">
<img class="introduction__right__gde" src="./assets/images/gde_ai.svg"/>
<img class="introduction__right__gde" src="./assets/images/gde_angular.svg"/>
      </div>
      <p>Software Architect at Scania Group</p>
      <!-- <p>Co-Founder at VisionWise AB and IOMechs</p> -->
    </div>
  </div>
  <div class="introduction__right fragment">
    <img class="introduction__right__ng-book"  src="./assets/images/books.png"/>
    <a href="https://www.amazon.com/stores/author/B0FGXXWRFM" target="_blank" style="font-size: 24px; text-align: center;">Author Profile</a>
  </div>
</div>

<div class="footer">
  <div class="footer__site">
    <a href="https://codewithahsan.dev">https://codewithahsan.dev</a>
  </div>
  <div style="display: flex; gap: 6px; align-items: center;">
    <svg viewBox="0 0 20 20" aria-hidden="true" class="h-5 w-5 fill-slate-400"><path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 20 3.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 .8 7.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.095 4.095 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 0 16.407a11.615 11.615 0 0 0 6.29 1.84"></path></svg> <a href="https://twitter.com/codewith_ahsan">@codewith_ahsan</a>
  </div>
</div>

--

<!-- ![dev-days-award](assets/images/award-developers-day.jpg) -->
<!-- -- -->

![ai-hackathon-winner.jpeg](assets/images/ngx-device-detector.png)

--

![ai-hackathon-winner.jpeg](assets/images/ai-hackathon-winner.jpeg)

--

![js-poland-award](assets/images/js-poland-with-others.jpg)

--

![js-poland-single](assets/images/js-poland-single.jpg)

--

![google-sponsored](assets/images/featured-gcloud.png) <!-- .element style="height: 600px;" -->

---

## Who here likes AI? 🙋

--

### Who here uses AI for just coding? 🙋

--

### Do you know what I try to use AI for?

--

![Drawing](assets/images/intro/nano-banana/drawing.png) <!-- .element: style="width: 50%;" -->

prompt:
Generate a super realistic image of a programmer using this drawing. Keep the weird pose as much as realistically possible.
Use myself as the programmer in the image.

<!-- .element: class="fragment" -->

--

![Generated Image 1](assets/images/intro/nano-banana/generated-image-1.jpeg)

--

![Drawing](assets/images/intro/nano-banana/drawing.png) <!-- .element: style="width: 30%;" -->

#### +

[Prompt]

#### +

## ![Ahsan PFP](assets/images/intro/nano-banana/ahsan-pfp.jpeg) <!-- .element: style="width: 30%;" -->

--

![Generated Image 2](assets/images/intro/nano-banana/generated-image-2.jpeg)

--

![Generated Image 3](assets/images/intro/nano-banana/generated-image-3.jpeg)

<!-- .element style="height: 500px" -->

--

![Generated Image 4](assets/images/intro/nano-banana/generated-image-4.jpeg)

<!-- .element style="height: 500px" -->

---

### Welcome

Today we explore **multimodal AI** through hands-on creative coding.

**Format:**

- Part 1: Foundations (2 hours, 6 modules)
<!-- .element: class="fragment" -->
- Coffee Break (30 minutes)
<!-- .element: class="fragment" -->
- Part 2: Build Your Project (1.5 hours)
<!-- .element: class="fragment" -->

**Zero pre-work required** — everything browser-based

---

<video src="assets/videos/AIEvolution.mp4" controls autoplay loop muted></video>

<!-- .element: style="border-radius: 12px; max-height: 50vh;" -->

Note:

- Autocomplete → Chat → Agent-First paradigm shift
- Today you'll experience agent-first tooling

---

<video src="assets/videos/VibeCodingFlow.mp4" controls autoplay loop muted></video>

<!-- .element: style="border-radius: 12px; max-height: 50vh;" -->

Note:

- Prompt → Blueprint → Code Gen → Iterate → Deploy
- Blueprint phase: thinking before coding

---

<!-- .slide: style="font-size: 0.8em" -->

### What You'll Build Today

By end of workshop, you'll have:

1. **Working code you own** (downloadable, shareable)
<!-- .element: class="fragment" -->
1. **Deployed app** with public URL
<!-- .element: class="fragment" -->
1. **Mental models** for architecting AI experiences
<!-- .element: class="fragment" -->

**Not just following a tutorial — understanding _how_ to architect AI.**

---

### Learning Outcomes

--

#### **Technical Skills:**

- Context engineering and prompt design
<!-- .element: class="fragment" -->
- Structured output with JSON schemas
<!-- .element: class="fragment" -->
- Multimodal AI (image analysis, vision)
<!-- .element: class="fragment" -->
- Grounding with Google Search
<!-- .element: class="fragment" -->
- Creative coding with Canvas/MediaPipe
<!-- .element: class="fragment" -->

--

#### **Mental Models:**

- When to use structured vs freeform prompts
<!-- .element: class="fragment" -->
- How to combine AI with browser APIs
<!-- .element: class="fragment" -->
- Vibe coding workflow
<!-- .element: class="fragment" -->

---

### Today's Mission

Apply multimodal AI to creative coding — the intersection Stockholm does best.

_All skills and projects are universal — Stockholm provides inspiration._

---

### Workshop Flow

--

#### **Part 1: Foundations (13:00-15:00)**

The AI Coding Toolkit:

- AI Studio — The API playground
<!-- .element: class="fragment" -->
- NotebookLM — Research grounding
<!-- .element: class="fragment" -->
- Antigravity — Agent-first development
<!-- .element: class="fragment" -->
- Gemini CLI — Terminal power
<!-- .element: class="fragment" -->

--

#### **Coffee Break (15:00-15:30)**

--

#### **Part 2: Build & Deploy (15:30-17:00)**

Firebase Studio deep-dive → Deployed app

---

### Logistics

**WiFi:** [Workshop organizer to fill in SSID/password]

--

**Breaks:**

- Coffee break at 15:00
- Quick 5-minute breaks between Part 1 modules as needed

--

### Q&A Format

- Questions anytime during exercises
- Hands up for help
- Share interesting discoveries with group

--

### Materials

- All modules: `/modules/XX-name/README.md`
- Cheatsheet: `/cheatsheet/cheatsheet.pdf`

![Workshop QR](assets/images/workshop_qr.png)

<!-- .element: style="width: 250px; margin-top: 1rem;" -->

---

### Zero Pre-Work Confirmation

You need **ONLY** a browser and internet connection.

**No installation required:**

- AI Studio (aistudio.google.com)
<!-- .element: class="fragment" -->
- All code runs in browser
<!-- .element: class="fragment" -->
- Firebase deployment via web UI
<!-- .element: class="fragment" -->

**Google-sponsored API access** provided during workshop

**Ready to start? Let's explore AI Studio.**
