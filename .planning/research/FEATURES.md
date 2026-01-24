# Feature Landscape: AI Creative Coding Workshop

**Domain:** Hands-on AI creative coding workshop
**Workshop:** "Code at the Speed of Thought" at Google Stockholm (Jan 28 2026)
**Duration:** 3.5 hours (2h foundations + 1.5h building)
**Audience:** 40 developers, mixed skill levels
**Researched:** 2026-01-24
**Confidence:** HIGH

## Table Stakes

Features attendees expect. Missing = workshop feels incomplete or attendees leave disappointed.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Live coding demonstrations** | Slides are ineffective for teaching code - live coding forces proper pacing, allows mistakes to be seen/debugged, and enables "what if?" questions | Medium | Research shows live coding is as good or better than static examples. Instructors can only go 2x faster than learners (vs 10x with slides). Students are noticeably more engaged during live coding. |
| **Hands-on coding time** | Passive watching leads to poor retention - attendees need to "get their hands dirty" to understand and remember | Low | Hands-on workshops promote deeper understanding and stronger retention. Act of doing creates muscle memory and confidence. |
| **Something working in first 30 min** | Modern developers expect instant gratification - if nothing works quickly, they assume it's too hard | Medium | "Time to Wow (TtW)" is critical. First emotional wow moment should come as early as possible. Visual outputs are most memorable. |
| **Visual/interactive output** | Creative coding means seeing results - text-only outputs feel like regular programming, not "creative" | Low | Visual components drive engagement and shareability. Products like Lovable/Bolt succeeded because users could screenshot and share their "wows". |
| **Clear progression structure** | Mixed skill levels need scaffolding - beginners get lost without structure, advanced get bored without challenge | Medium | Provide foundations that everyone completes, then offer depth for advanced users. Clear phases prevent overwhelm. |
| **Technical support during hands-on** | Attendees WILL get stuck - without help, they disengage and workshop fails | High | Critical blocker. Need roaming helpers or chat support during exercises. Stuck attendees become frustrated attendees. |
| **Pre-configured environment** | Setup time kills energy - if first 30 min is "install Node.js", workshop starts on wrong foot | Medium | Provide starter templates, CodePen/p5.js web editor, or pre-configured repos. Zero install time is ideal. |
| **Take-home code/resources** | Attendees want to continue learning after - without resources, they can't reproduce what they built | Low | Provide GitHub repos, documentation, links to tutorials. Make it trivial to pick up where they left off. |

## Differentiators

Features that set workshop apart. Not expected, but highly valued and remembered.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **"Wow moment" demo at start** | Opening with impossible-looking demo (face-reactive art, gesture control) shows what's possible and creates aspiration | Medium | Time to first emotional "wow" drives engagement. Visual outputs that exceed expectations are most effective. Live demo beats video. |
| **Webcam/camera interaction** | Body/face/hand tracking feels like magic - transforms laptop into creative instrument | High | MediaPipe and ml5.js make this accessible. Recent 2025 tutorials show Three.js + MediaPipe for 3D hand control. Creates shareable moments. |
| **Building toward real project** | Exercises that connect to final project goal feel purposeful vs arbitrary examples | Medium | Gray Area's Creative Code Intensive: participants develop projects culminating in public showcase. Portfolio-worthy output is motivator. |
| **Collaborative/multiplayer elements** | Shared canvases or multi-user experiences create energy and emergent creativity | High | Karachi Run example: multiplayer emoji race. Collective experiences are more memorable than solo work. |
| **Live remix/variation culture** | Encouraging attendees to fork/modify each other's work accelerates learning and creativity | Low | Creative coding community values "co-learning, co-teaching, experimentation, collaboration not competition". Remix is core to creative code culture. |
| **Public showcase at end** | Sharing work publicly (even just to cohort) makes work "real" and creates accountability | Medium | Gray Area showcases to industry professionals. Even informal demos at workshop end create motivation and memory. Portfolio moment. |
| **Unexpected inputs/sensors** | Using sound, motion, emotion detection - inputs beyond keyboard/mouse feel novel | Medium | Tone.js for audio, sentiment analysis for mood, device motion for mobile. Expands definition of "interactive". |
| **AI as creative tool not automation** | Positioning AI as amplifying creativity (not replacing it) empowers rather than threatens | Low | 2026 best practice: "AI amplifies your expertise, frees you from drudgery, lets you focus on creative aspects". Frame as augmentation. |
| **No slides, just code** | Pure live coding throughout feels modern and authentic | Low | The Carpentries approach: no slides, just projector + laptop + talking through code. Railway track vs going off-road. |

## Anti-Features

Features to explicitly NOT build. Common mistakes in AI/coding workshops.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Starting with AI theory/concepts** | Workshop promises "hands-on building" but theory delays gratification - attendees lose energy before building anything | Start with working demo, reverse-engineer theory from concrete example. Vibe coding: low-friction experimentation over upfront planning. |
| **Too much content** | Trying to teach everything overwhelms and reduces retention | Focus on 2-3 core concepts done deeply. Better to master one thing than touch ten. Research shows cognitive load is real blocker. |
| **Debugging alone without help** | Letting attendees struggle silently wastes time and kills morale | Proactive roaming support, shared debugging sessions, "let's debug together" culture. Normalize asking for help. |
| **Generic AI coding examples** | Teaching general AI/ML when workshop promises "creative" coding - image classifiers feel corporate, not artistic | Use artistic use cases: generate art, control visuals with body, build games. Creative outputs over business logic. |
| **No breaks in 3.5 hours** | Cognitive load and sitting still drains energy - pushing through reduces learning | Plan breaks strategically. Quick energizers between sections. Research: workshops with icebreakers are 18% shorter and 20% more innovative. |
| **Pre-recorded demos instead of live** | Videos lack flexibility and human connection - can't respond to "what if" questions | Live code even if messy. Mistakes are teaching moments. Learners see how experts debug. Authenticity > polish. |
| **Complex setup requirements** | Requiring attendees to install Python, configure env, debug npm - eats 30+ min of workshop time | Use web-based tools (p5.js editor, CodePen, Replit). If local required, provide VM/container. Setup should be <5 min or zero. |
| **Only individual work** | Pure solo coding misses energy of shared experience and peer learning | Mix solo exercises with pair programming, collective projects, remix culture. "Together" is more memorable. |
| **Passive AI usage** | Just calling APIs without understanding what's happening - feels like magic trick not skill | Show what AI model does (pose detection = 17 keypoints), explain tradeoffs, let attendees tune parameters. Agency over magic. |
| **Homework/prerequisites** | Expecting attendees to prep beforehand reduces actual attendance and creates inequality | Design for zero prior knowledge. Make prep optional bonus, not required. First 30 min should onboard everyone. |

## Feature Dependencies

Critical dependencies that inform workshop sequencing:

```
Environment Setup (web-based)
    ↓
First Visual Output (< 30 min)
    ↓
Core Concept #1 (e.g., draw loop, variables)
    ↓
Add Camera Input
    ↓
Core Concept #2 (e.g., pose detection basics)
    ↓
Interactive Exercise (remix/variation)
    ↓
Build Project Component
    ↓
Polish & Share (public showcase)
```

**Key insight:** Visual output must come BEFORE heavy concepts. Traditional teaching does theory→practice. Creative coding needs practice→theory→deeper practice.

## Workshop Structure Recommendations

Based on research into successful 2025/2026 AI creative coding workshops:

### Opening (15 min)
- Icebreaker activity (2-3 min max)
- Live "wow moment" demo showing workshop end goal
- Quick explanation: "Here's what we'll build to get there"

### Foundations Phase (2 hours)
- **First 30 min:** Get something visual working (immediate gratification)
- **Next 45 min:** Core concept #1 with live coding + follow-along
- **Break (10 min)**
- **Next 45 min:** Core concept #2, introduce AI component (camera/pose/gesture)

### Building Phase (1.5 hours)
- **First 45 min:** Guided project building with roaming support
- **Next 30 min:** Free exploration, remixing, variations
- **Final 15 min:** Showcase presentations (3-4 attendees share)

### Multi-Track Approach for Mixed Skills
- **Track 1 (Beginners):** Follow guided template, modify parameters, simple variations
- **Track 2 (Experienced):** Build from scratch, add features, create original variations
- Both tracks converge on same demo format - different depth, same output type

## MVP Feature Priority

For this specific 3.5 hour workshop, prioritize:

### Must Have (Core Experience)
1. Web-based environment (p5.js web editor or similar) - zero install
2. Visual output working in first 30 minutes
3. Camera/webcam integration with pose/gesture detection (ml5.js or MediaPipe)
4. Live coding demonstrations throughout
5. Hands-on exercises with roaming technical support
6. Take-home starter code and resources

### Should Have (Differentiators)
1. Opening "wow moment" demo
2. Public showcase at end (even informal)
3. Remix/variation culture (fork examples, build on each other)
4. Multi-track support for different skill levels

### Could Have (Nice to Have)
1. Multiplayer/collaborative element
2. Multiple sensor inputs (audio, motion, etc.)
3. Recording/screenshot functionality for sharing
4. Pre-workshop optional prep materials

### Won't Have (Explicitly Avoid)
1. Theory-first approach
2. Complex local setup
3. More than 2-3 core concepts
4. Required homework/prerequisites

## Attendee Memory Triggers

What makes workshops memorable (what attendees talk about afterwards):

### Emotional Moments
- "I can't believe I built that!" - achievement beyond perceived ability
- "Look what happens when I move my hand!" - magical interaction
- "This is my creation" - ownership and pride

### Shareable Artifacts
- Screenshot/video of their working project
- GitHub repo they can show others
- Story: "I built a gesture-controlled particle system"

### Skill Transformation
- "Now I know how to..." - concrete capability acquired
- "I can see how to..." - mental model formed
- "I want to try..." - inspiration for future projects

### Social Connection
- Seeing others' creative variations
- Helping/being helped during debugging
- Shared "aha!" moments during demos

## Context: This Workshop

**"Code at the Speed of Thought"** positioning:
- **Promise:** "Most AI workshops end where interesting part begins"
- **Delivery:** Focus on creative expression, not business use cases
- **Projects:** Face-reactive, gesture-controlled, camera-based games
- **Portfolio:** Karachi Run, Mood Organism, ParticleZen demonstrate this approach works

**Success criteria:**
- Attendees leave with working camera-interactive project
- Mixed skill levels all achieve visual output
- At least 3-4 attendees share projects at end
- Workshop materials enable continued exploration after

## Sources

### AI Creative Coding Best Practices (2026)
- [How to Use AI in Coding - 12 Best Practices in 2026](https://zencoder.ai/blog/how-to-use-ai-in-coding)
- [My LLM coding workflow going into 2026](https://addyosmani.com/blog/ai-coding-workflow/)
- [Best Practices for Integrating Vibe Coding in 2026](https://learn.ryzlabs.com/ai-development/best-practices-for-integrating-vibe-coding-in-2026)

### Workshop Structure & Engagement
- [Top AI Conferences 2026](https://www.datacamp.com/blog/top-ai-conferences)
- [Creative Code Intensive - Gray Area](https://grayarea.org/course/creative-code-intensive/)
- [How to Keep Attendees Engaged in Hands-on Workshops](https://www.linkedin.com/advice/0/what-best-ways-keep-attendees-engaged-during-hands-on-s3h3f)
- [Hands-on workshop definition](https://instruqt.com/glossary/hands-on-workshop)

### Live Coding Research
- [Live Coding in Programming Classes: Instructors' Perspectives](https://arxiv.org/html/2506.03402)
- [Ten quick tips for teaching with participatory live coding](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008090)
- [Instructor Training: Live Coding is a Skill](https://carpentries.github.io/instructor-training/17-live.html)

### Creative Coding Community
- [Creative Code Collective Summer Lab](https://creativecodecollective.github.io/showcase)
- [CC Fest - Creative Coding Festival Lessons](https://ccfest.rocks/lessons)
- [AI Vibe Coding Workshop March 2026](https://www.mba.org/conferences-and-education/event/2026/03/12/default-calendar/ai-vibe-coding-march-2026-81942)

### Workshop Design Trends
- [8 conference workshop ideas](https://gogather.com/blog/conference-workshop-ideas-to-elevate-your-next-event)
- [15 Corporate Event Workshop Ideas 2026](https://www.dreamcast.in/blog/corporate-event-workshop-ideas/)

### AI Workshop Anti-Patterns
- [Don't Fall for These 5 Anti-Patterns in GenAI Project Delivery](https://www.creativedock.com/blog/dont-fall-for-these-5-anti-patterns-in-genai-project-delivery)
- [8 AI Code Generation Mistakes Devs Must Fix To Win 2026](https://vocal.media/futurism/8-ai-code-generation-mistakes-devs-must-fix-to-win-2026)
- [Avoiding AI Pitfalls in 2026](https://www.isaca.org/resources/news-and-trends/isaca-now-blog/2025/avoiding-ai-pitfalls-in-2026-lessons-learned-from-top-2025-incidents)

### Mixed Skill Level Accommodation
- [NAIRR Pilot - AI Unlocked Workshop](https://nairrpilot.org/ai-unlocked)
- [OpenAI Academy](https://academy.openai.com/)
- [Why a Creativity AI Workshop Matters](https://www.teamland.com/post/why-creative-ai-workshop-for-employees)
- [4 Tips for Preparing AI-Enhanced Workshops](https://www.nngroup.com/articles/preparing-ai-workshops/)

### Technical Resources: Camera/Gesture Control
- [Creating a 3D Hand Controller Using MediaPipe and Three.js](https://tympanus.net/codrops/2024/10/24/creating-a-3d-hand-controller-using-a-webcam-with-mediapipe-and-three-js/)
- [Real-Time Body Tracking in Browser: What MediaPipe Does](https://medium.com/@creativeaininja/real-time-body-tracking-in-your-browser-what-mediapipe-actually-does-and-how-to-use-it-b31aa96a5071)
- [Gesture Control with ElectronJS, MediaPipe and Nut.js](https://dev.to/anuragdeore/gesture-control-with-electronjs-mediapipe-and-nutjs-creative-coding-fun-4m9b)

### ml5.js & Pose Detection
- [Pose Detection with ml5.js - C2HO Workshop](https://www.hf.uio.no/imv/english/research/networks/creative-computing-hub-oslo/pages/c2ho-workshops/ml5-js-part-4.html)
- [Pose Detection - The Coding Train](https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/7-bodypose/pose-detection/)
- [Hand Pose Detection with ml5.js](https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/hand-pose/)

### p5.js Workshop Structure
- [GitHub - mattdesl/workshop-p5-intro](https://github.com/mattdesl/workshop-p5-intro)
- [GitHub - nicoversity/cc_p5js_workshop_intro](https://github.com/nicoversity/cc_p5js_workshop_intro)
- [p5.js Education Resources](https://p5js.org/education-resources/)

### "Wow Moment" Design
- [Part 3: Going Viral with Product-Led "Visual Wow" Moments](https://www.iamcharliegraham.com/part-3-going-viral-with-product-led-visual-wow-moments/)
- [Shortening the Time to WOW (TtW) in AI products](https://www.vccafe.com/2025/12/02/shortening-the-time-to-wow-ttw-in-ai-products/)
- [Finding your product's first wow moment](https://www.appcues.com/blog/finding-your-products-first-wow-moment)
- [How to Create a Mind-Blowing "Wow Moment"](https://userpilot.com/blog/wow-moment/)

### Icebreakers & Workshop Energy
- [67 engaging icebreakers](https://www.sessionlab.com/blog/icebreaker-games/)
- [Instructor Training: Icebreakers - The Carpentries](https://carpentries.github.io/instructor-training/icebreakers)
- [6 Quick Icebreakers Games for workshops](https://symondsresearch.com/quick-icebreakers/)

### Workshop Technical Support
- [Workshop Assist - in-app help](https://workshopsoftware.com/user-guides/stuck-heres-the-easiest-way-to-get-help-inside-workshop-software/)
- [DEBT 2025 - Debugging Techniques Workshop](https://2025.ecoop.org/home/debt-2025)
