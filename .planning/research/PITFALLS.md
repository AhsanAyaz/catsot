# AI Workshop Pitfalls

**Domain:** AI Creative Coding Workshops (Live Coding)
**Researched:** 2026-01-24
**Context:** "Code at the Speed of Thought" - Google Stockholm, 3.5 hours, 40 developers, zero pre-work

## Critical Pitfalls

Mistakes that cause complete workshop failure or major disruption.

### Pitfall 1: API Quota Exhaustion During Live Demo

**What goes wrong:** API calls fail mid-demo with quota/rate limit errors. With 40 participants all hitting the same API endpoints simultaneously, you can exhaust daily quotas in minutes. Google AI Studio shows "An internal error occurred" when free tier daily limits are exceeded, even with valid API keys.

**Why it happens:**
- Underestimating concurrent usage (40 devs × multiple attempts = hundreds of API calls)
- Not pre-allocating quota or setting up billing
- Using free tier accounts for workshops
- API keys tied to personal accounts instead of dedicated workshop projects

**Consequences:**
- Demo completely breaks with cryptic error messages
- Participants can't follow along or complete exercises
- Lost credibility ("the expert's demo doesn't even work")
- No easy recovery - quota resets are time-based (24 hours)

**Prevention:**
1. **Pre-workshop setup:**
   - Create dedicated Google Cloud project with billing enabled
   - Set quota alerts at 50%, 75%, 90%
   - Test with simulated 40+ concurrent users
   - Generate workshop-specific API keys with high limits

2. **Backup strategies:**
   - Prepare pre-recorded video of successful API calls
   - Have offline mock responses ready for demos
   - Create tiered exercises (not everyone calls API simultaneously)
   - Keep personal backup API key for emergency demo recovery

3. **During workshop:**
   - Stagger API-heavy exercises across participant groups
   - Monitor quota usage in real-time on separate screen
   - Brief participants: "If you hit rate limit, wait 2 minutes before retry"

**Detection:**
- 429 RESOURCE_EXHAUSTED errors in console
- "You have exhausted your daily quota" messages
- Multiple participants reporting same error simultaneously
- Firebase Studio showing persistent "internal error" messages

**Recovery plan:**
1. **Immediate (if caught early):**
   - Switch to backup API key immediately
   - Ask participants to pause while you verify working key
   - Continue with working key

2. **If quota fully exhausted:**
   - Switch to pre-recorded video: "Let me show you what this looks like when working"
   - Walk through code and explain what WOULD happen
   - Pivot to offline exercises while quota recovers
   - Share working GitHub repo: "You can try this later with your own API key"

3. **Communication:**
   - Be transparent: "We hit our API quota faster than expected with 40 of us"
   - Turn it into learning: "This is why production apps need quota monitoring"
   - Maintain energy: "Great news - you're all so engaged you broke the API!"

**Sources:**
- [Google AI Studio quota handling issues](https://discuss.ai.google.dev/t/ai-studio-does-not-gracefully-fail-over-when-daily-free-tokens-are-exceeded/111936)
- [API rate limiting best practices](https://www.getambassador.io/blog/rate-limiting-apis-scale-patterns-strategies)
- [Handling rate limits prevention guide](https://www.ayrshare.com/complete-guide-to-handling-rate-limits-prevent-429-errors/)

---

### Pitfall 2: Hardware Dependency Failures (Camera/Webcam Access)

**What goes wrong:** Face detection and gesture control demos fail because cameras don't work. 40% of webcam issues stem from outdated drivers, USB glitches, or permission problems. In a 40-person workshop, expect 5-10 laptops to have camera issues.

**Why it happens:**
- Corporate laptops with locked-down permissions
- Privacy-conscious developers with camera physically blocked/disabled
- Browser permission denials
- USB bandwidth issues with external webcams
- Driver incompatibilities across Windows/Mac/Linux
- Physical obstructions (stickers, covers, dirt on lens)

**Consequences:**
- "It works on my machine" syndrome - instructor's demo works, participants stuck
- Workshop energy dies as you troubleshoot individual laptops
- The "creative" part (face/gesture demos) becomes the boring part
- 10-15 minutes lost per troubleshooting attempt

**Prevention:**
1. **Pre-workshop communication (1 week before):**
   ```
   Subject: Workshop Prep - Test Your Camera!

   We'll be doing face detection & gesture control.
   Please test NOW:

   1. Visit: https://webcamtests.com
   2. Grant browser permission when prompted
   3. Verify you see yourself
   4. If it fails, contact IT or bring external webcam

   Common fixes: https://[your-guide]
   ```

2. **Day-of setup:**
   - Have 5-10 external USB webcams as loaners
   - Test room during setup: open browser, test camera access
   - Create camera test page: simple HTML that shows camera feed
   - First 10 minutes: everyone tests camera BEFORE main content

3. **Technical preparation:**
   - Use MediaPipe (works in browser, no installation)
   - Have both web-based AND installed app versions ready
   - Prepare graceful fallback demos that work with mouse/keyboard

**Detection:**
- Hands going up during camera exercise
- Participants looking frustrated at laptops
- Console showing "Permission denied" or "NotFoundError"
- Someone saying "my camera has a physical cover"

**Recovery plan:**
1. **Quick wins (try first, in order):**
   - "Check browser permission icon in address bar - grant access"
   - "Try Firefox/Chrome if your current browser fails"
   - "Close Zoom/Teams/Slack - they might be hogging camera"
   - "Unplug and replug external webcam"

2. **If individual still stuck (2-minute rule):**
   - Hand them a loaner webcam
   - OR: Pair them with neighbor who has working camera
   - OR: Tell them to follow along conceptually, try later with their own setup

3. **If >25% of room has issues (systemic problem):**
   - Pivot entire demo: "I'll demonstrate with my camera on the projector"
   - Use one working participant as live example
   - Skip the hands-on camera portion, focus on code walkthrough
   - Share working GitHub repo: "Clone this and try at home"

4. **Prevention for next time:**
   - Update pre-workshop instructions with learnings
   - Consider requiring camera test screenshot as "admission ticket"

**Sources:**
- [Webcam troubleshooting guide 2026](https://www.obsbot.com/blog/webcam/fix-webcam-not-working)
- [Common camera issues and fixes](https://cameratest.org/webcam-troubleshooting-how-to-fix-common-camera-issues-easily/)
- [MediaPipe real-time face tracking](https://medium.com/@kenzic/real-time-face-tracking-in-the-browser-with-mediapipe-7c818c96b4ca)

---

### Pitfall 3: WiFi Failure / Network Dependency

**What goes wrong:** Venue WiFi collapses under 40+ devices doing live API calls, video streaming, and code downloads. At major tech events like CES, network failures are "seldom the result of a single point of failure" but rather congestion, RF saturation, and upstream throttling.

**Why it happens:**
- 40 laptops + 40 phones = 80+ devices on one access point
- Simultaneous npm installs, git clones, API calls
- Venue WiFi designed for email, not concurrent development
- Conference WiFi notorious for being "less than perfect"
- External APIs going down (Murphy's Law: if it can fail during your demo, it will)

**Consequences:**
- Cannot download dependencies, cannot access cloud tools
- Live coding becomes "staring at loading spinner"
- Participants blame you even though it's venue infrastructure
- Complete show-stopper if demos require internet

**Prevention:**
1. **Assume WiFi will fail - design for offline:**
   - Pre-install all dependencies locally
   - Bundle all libraries/assets in workshop repo
   - Use `npm install` with local cache
   - Run local mock servers instead of external APIs
   - Have downloadable USB drive with complete setup

2. **Network redundancy:**
   - Bring 4G/5G mobile hotspot as backup
   - Test venue WiFi 1 hour before workshop
   - Get venue's enterprise WiFi credentials (not guest network)
   - Have failover plan: if primary internet fails, switch to hotspot

3. **Workshop structure:**
   - First 30 minutes: offline setup and verification
   - Share everything via local network or USB before internet-heavy exercises
   - Never assume "just download this quickly" - it won't be quick

4. **Pre-distribute materials:**
   - Email participants setup instructions + offline installer 3 days before
   - GitHub repo with all dependencies vendored/committed
   - Bring loaded USB drives to physically distribute

**Detection:**
- Timeouts during npm install, git clone, API calls
- Multiple "check your internet connection" errors
- Participants looking confused: "Mine says no connection"
- Your own demo suddenly buffering/failing

**Recovery plan:**
1. **Immediate action:**
   - Switch to mobile hotspot for your demo machine
   - "Everyone pause downloads for 2 minutes"
   - Triage: "Who needs files? Pair up with someone who already has them"

2. **Pivot to offline:**
   - Abandon cloud-dependent exercises
   - Focus on local code examples
   - Use pre-recorded video of cloud features
   - Demo on your machine, share screen

3. **Physical distribution:**
   - Pass around USB drives with setup files
   - Use AirDrop/local network sharing
   - One person downloads successfully? They become the seed node.

4. **Communication:**
   - "Venue WiFi is struggling - not your fault"
   - "This is why we always test offline mode in production"
   - Keep energy up while troubleshooting

**Sources:**
- [CES 2026 connectivity crisis](https://vegasnews.com/news/ces-las-vegas-wifi-connectivity-crisis-trade-show/)
- [Technical workshop preparation checklist](https://www.jvt.me/posts/2017/02/15/preparing-a-technical-workshop/)
- [Live demo backup plan strategies](https://www.linkedin.com/advice/1/how-can-you-incorporate-live-demonstrations-your)

---

### Pitfall 4: "God Demo" - Trying to Do Everything Live

**What goes wrong:** Instructor attempts to live-code complex AI integration from scratch. Result: typos, syntax errors, fumbling speech, long pauses, and a demo that fails. As one expert notes: "Writing code doesn't mix well with oration, leading to fumbling speech and long pauses."

**Why it happens:**
- Overconfidence: "I've coded this 100 times, I can do it live"
- Wanting to appear impressive by coding without notes
- Underestimating cognitive load of talking + typing + troubleshooting
- Not accounting for pressure of 40 people watching you type

**Consequences:**
- Syntax errors that take 5 minutes to debug
- Forgetting import statements or API keys
- Audience disengages while watching you fix typos
- Workshop runs 30+ minutes over schedule
- Participants lose confidence in instructor

**Prevention:**
1. **Prepare pre-written checkpoints:**
   - Have 90% of code already written
   - Live-code only the "interesting" 10%
   - Use git branches: `git checkout step-1`, `git checkout step-2`
   - Keep fully working version in separate folder as escape hatch

2. **Script your live typing:**
   - If typing during demo, have code snippet file open to copy from
   - Use code snippets in VS Code (type trigger, expand to full code)
   - Keep terminal history of tested commands to re-run
   - NEVER type complex code from memory during demo

3. **Practice with fail-safes:**
   - Rehearse full demo 3 times minimum
   - Record yourself - if you fumble during practice, you'll fumble live
   - Have co-presenter ready to take over if you get stuck
   - Use TDD: tests pass = demo works, even if you typo

4. **Embrace semi-live demos:**
   - "I've pre-written the boilerplate, let's focus on the interesting part"
   - Show final working version first, THEN explain how to build it
   - Use notebook/REPL environments (less syntax ceremony)

**Detection:**
- You're typing and talking trails off
- Multiple typos in a row
- "Wait, why isn't this working?"
- Audience checking phones/laptops instead of watching

**Recovery plan:**
1. **Immediate:**
   - STOP typing. Take a breath.
   - "Let me show you the working version first, then explain"
   - Switch to pre-written code

2. **If stuck debugging:**
   - Set 2-minute timer: if not fixed in 2 minutes, switch to backup
   - "Interesting - this is a great learning moment about debugging"
   - Show error, explain briefly, then: "Let me grab the working version"

3. **Restart strategy:**
   - `git reset --hard` to known-good state
   - OR open backup folder with working version
   - "Technical difficulties - here's what it looks like working"

4. **Turn it into teaching:**
   - If you DO fix it quickly: "See how I debugged that? Console first, then..."
   - If you can't: "This is why we use version control and backups"

**Sources:**
- [Your live coding demo is boring](https://inconshreveable.com/11-13-2015/your-live-coding-demo-is-boring/)
- [Tips on live coding demos](https://medium.com/@linhartos/some-tips-on-live-coding-demo-e5412dbb5869)
- [Why tech demos fail after weeks of prep](https://medium.com/@srinathmohan_21939/why-tech-demos-fail-even-after-weeks-of-prep-and-what-you-can-do-about-it-5f5696fc7cab)

---

## Moderate Pitfalls

Mistakes that cause delays, disengagement, or technical debt during the workshop.

### Pitfall 5: Mixed Skill Level Pacing Disaster

**What goes wrong:** Workshop moves too fast for beginners, too slow for experts. As research shows: "For some participants, workshops may be going too quickly and for others they may be going too slowly." With zero pre-work assumption and mixed levels, this becomes acute.

**Why it happens:**
- No skill assessment before workshop
- Trying to please everyone (impossible)
- Linear content that assumes uniform knowledge
- Slower learners can't keep up, faster learners get bored

**Consequences:**
- Beginners feel lost, start disengaging
- Advanced developers tune out, check email
- Two groups form: those keeping up and those giving up
- 77% of employees disengage when work feels disconnected from their understanding

**Prevention:**
1. **Pre-workshop triage:**
   - Send skill survey 1 week before
   - Three tracks: Beginner / Intermediate / Advanced
   - Set expectations: "This workshop targets intermediate. Beginners will struggle, experts might be bored."

2. **Tiered exercises:**
   - Core demo for everyone (20 minutes)
   - Then split: "Try basic version OR advanced challenge"
   - Provide completed code for each tier
   - Let people self-select difficulty

3. **Pair programming:**
   - Pair beginners with experts
   - Experts benefit by teaching (deeper learning)
   - Beginners get immediate help

4. **Just-in-time content:**
   - Don't explain everything upfront
   - Provide links: "Need JS basics? Start here: [link]"
   - Have TA/assistant circulating to help stragglers

**Detection:**
- Lots of hands raised during exercises
- Half the room looking lost, other half on phones
- Someone asks basic question far below expected level
- Workshop running behind because you're re-explaining basics

**Recovery plan:**
1. **Pause and assess:**
   - "Quick poll: who's following along OK? Who's stuck?"
   - Identify the bottleneck

2. **Split the room:**
   - "If you're comfortable with this, move to advanced exercise [link]"
   - "If you need more time, I'll do a mini-session over here"

3. **Graceful continuation:**
   - Show working version to everyone
   - Let people opt into "I'll follow along conceptually and try later"
   - Pair stuck people with helper

**Sources:**
- [Mixed skill level pacing problems](https://simpedia.info/workshop-pacing/)
- [Employee disengagement trends 2026](https://www.quantumworkplace.com/2025-workplace-trends-report)
- [Skill development workshop challenges](https://digitaldefynd.com/IQ/skill-development-workshops-worth/)

---

### Pitfall 6: Unprepared Participants (Despite "Zero Pre-work")

**What goes wrong:** "Zero pre-work" doesn't mean "zero setup." Participants arrive without required software, browsers, or permissions. Research shows: "Not everyone receives or follows preparation instructions, even when provided in advance."

**Why it happens:**
- Email instructions ignored or lost
- Corporate laptops with restricted admin rights
- Participants assume "I'll just follow along"
- Last-minute registrations who missed instructions

**Consequences:**
- First 30 minutes wasted on setup instead of content
- "Works on my machine" syndrome
- Those who prepared sit idle, getting frustrated
- Workshop delayed before it even starts

**Prevention:**
1. **Minimal viable setup:**
   - Use browser-based tools (AI Studio, Firebase Studio, CodePen)
   - No installations required = fewer failure points
   - If installation needed, provide web-based fallback

2. **Pre-flight checklist (send 3 days + 1 day before):**
   ```
   Setup Test (5 minutes):
   ☐ Open Chrome/Firefox
   ☐ Visit: https://ai.google.dev/aistudio
   ☐ Sign in with Google account
   ☐ Click "New prompt" - if you see editor, you're ready!

   Problems? Join pre-workshop office hours [day before, 30 min]
   ```

3. **Day-of setup time:**
   - Schedule 15-minute buffer at start for setup
   - Don't start content until 80%+ have green light
   - Have TAs helping during this buffer

4. **Zero-setup alternatives:**
   - Host everything in cloud IDE (GitHub Codespaces, CodeSandbox)
   - Every participant has same environment, guaranteed
   - As shown in RStudio workshop: "Zero-setup workshops with GitHub Codespaces enable no setup from participants at all"

**Detection:**
- Lots of hands raised immediately: "How do I install X?"
- Someone asks for admin password
- "I don't have a Google account"
- Multiple people still installing things 10 minutes in

**Recovery plan:**
1. **Triage fast:**
   - "If you're ready, start on intro exercise [link]"
   - "If you need setup, come to the side table with [TA name]"

2. **Buddy system:**
   - "Pair up: one person setup, one person not"
   - Person with setup shares screen, walks through content

3. **Provide escape hatch:**
   - "Can't get setup working? Watch me demo, try later with: [GitHub repo]"
   - Don't let one person's setup block 39 others

**Sources:**
- [Zero-setup workshops with GitHub Codespaces](https://global.rstudio.com/conference/2022/talks/zero-setup-r-workshops-github/)
- [Common workshop preparation mistakes](https://stormz.me/en/blog/five-common-mistakes-when-preparing-collaborative-workshop)
- [Why workshops fail: unprepared participants](https://sched.com/blog/why-workshops-fail/)

---

### Pitfall 7: Latency and Performance Issues in Real-Time Demos

**What goes wrong:** Face detection or gesture control demos lag, stutter, or fail to respond in real-time. Optimal gesture control requires <50ms latency, but in practice, systems often see 390-420ms latency, making demos feel sluggish.

**Why it happens:**
- Participants' laptops vary widely in CPU/GPU power
- Browser-based ML models competing with other tabs
- Poor lighting conditions in venue
- Unoptimized code processing every frame
- Background apps consuming resources

**Consequences:**
- "Wow" factor becomes "meh" factor
- Face tracking jittery or delayed
- Gesture control feels broken
- Participants think the technology doesn't work

**Prevention:**
1. **Optimize for low-end hardware:**
   - Target 30fps minimum, not 60fps
   - Reduce camera resolution (640x480 often sufficient)
   - Use MediaPipe's tracking mode (avoids detection on every frame)
   - Implement frame dropping if queue builds up

2. **Pre-demo optimization:**
   - "Close all other browser tabs and apps"
   - Test in actual venue lighting
   - Have high-performance demo laptop for main display
   - Use quantization/optimization for models

3. **Graceful degradation:**
   - Show performance metrics in UI: "FPS: 28"
   - Adjust quality based on performance
   - Provide "reduce quality" toggle for slower machines

4. **Demo on known-good hardware:**
   - Your demo machine should be fast
   - Test participant laptops beforehand if possible
   - Set expectations: "Works best on newer laptops"

**Detection:**
- Visible lag between face movement and on-screen reaction
- FPS counter showing <20fps
- Gestures not recognized consistently
- Participants saying "it's not responding"

**Recovery plan:**
1. **Quick optimizations:**
   - "Close other apps - free up CPU"
   - "Reduce browser window size"
   - "Turn off video in Zoom/Teams if running"

2. **Fallback to reference implementation:**
   - "If yours is too slow, watch my screen - I'll demonstrate"
   - Share high-FPS recording of working demo

3. **Adjust exercise:**
   - Shift from real-time demo to frame-by-frame analysis
   - "Let's understand the code, performance can be tuned later"

**Sources:**
- [Real-time gesture control latency benchmarks](https://www.mdpi.com/2079-9292/14/4/704)
- [MediaPipe face tracking performance](https://medium.com/@kenzic/real-time-face-tracking-in-the-browser-with-mediapipe-7c818c96b4ca)
- [Gesture recognition latency optimization](https://www.freecodecamp.org/news/using-transformers-for-real-time-gesture-recognition/)

---

### Pitfall 8: Blindly Trusting AI-Generated Code in Live Demo

**What goes wrong:** Instructor uses AI to generate code live, runs it without review, and it fails subtly or produces wrong results. As experts warn: "AI will happily produce plausible-looking code, but you are responsible for quality." Silent failures are especially dangerous - code runs without errors but produces incorrect results.

**Why it happens:**
- Pressure to show "AI magic" working perfectly
- Trusting AI output due to time pressure
- Not testing generated code before running
- Treating AI as infallible oracle rather than junior developer

**Consequences:**
- Demo produces wrong output (but looks like it works)
- Participants learn incorrect patterns
- When someone points out error, instructor looks incompetent
- Undermines trust in both AI tools and instructor

**Prevention:**
1. **Always review before running:**
   - "Let's read through what the AI generated"
   - Point out key parts: "See how it handles edge cases?"
   - Have unit tests ready to validate output

2. **Set expectations correctly:**
   - "AI is like an over-confident junior developer - always review"
   - Show the REVIEW process, not just the generation
   - Make validation part of the demo

3. **Use AI incrementally:**
   - Generate small pieces, test each
   - Don't generate 200 lines and run blindly
   - Build up working demo step by step

4. **Prepare tested examples:**
   - Pre-generate and test AI outputs before workshop
   - Use working examples as baseline
   - If doing live generation, compare to known-good version

**Detection:**
- Code runs but output doesn't match expectations
- Participant asks: "Why does it return X when we expected Y?"
- No error messages but behavior is wrong
- You realize mid-explanation that code is incorrect

**Recovery plan:**
1. **Acknowledge immediately:**
   - "Good catch - this is a great example of AI mistakes"
   - Don't try to defend obviously wrong code

2. **Turn it into learning:**
   - "Let's debug this together"
   - Show how to review AI output critically
   - Fix it collaboratively

3. **Have correct version ready:**
   - Switch to pre-tested implementation
   - "Here's the correct version - let's compare"

**Sources:**
- [AI coding mistakes developers must fix 2026](https://vocal.media/futurism/8-ai-code-generation-mistakes-devs-must-fix-to-win-2026)
- [Mastering AI tools: avoiding common pitfalls](https://medium.com/@vaibhavsuman00/mastering-ai-tools-a-developers-guide-to-avoiding-common-pitfalls-05a55d891064)
- [AI coding best practices 2026](https://zencoder.ai/blog/how-to-use-ai-in-coding)

---

### Pitfall 9: Time Management Collapse (Running Over)

**What goes wrong:** Workshop scheduled for 3.5 hours runs 4+ hours, or you rush through final hour to finish on time. Research shows workshops often struggle with time management, especially with mixed skill levels.

**Why it happens:**
- Overambitious content for time slot
- Debugging participant issues eats into scheduled time
- No buffer time for inevitable problems
- "Just one more cool thing" syndrome
- Underestimating setup and transition time

**Consequences:**
- Participants have hard stops (flights, meetings, childcare)
- People leave before the "big finale"
- Final sections feel rushed and incomplete
- Venue kicks you out mid-sentence
- Negative feedback: "ran way over time"

**Prevention:**
1. **Realistic scheduling:**
   ```
   For 3.5 hour workshop:
   - 0:00-0:15: Setup buffer, intro (15 min)
   - 0:15-0:45: Core Demo #1 (30 min)
   - 0:45-1:15: Hands-on #1 (30 min)
   - 1:15-1:25: Break (10 min)
   - 1:25-1:55: Core Demo #2 (30 min)
   - 1:55-2:25: Hands-on #2 (30 min)
   - 2:25-2:35: Break (10 min)
   - 2:35-3:05: Core Demo #3 (30 min)
   - 3:05-3:20: Wrap-up, Q&A (15 min)
   - 3:20-3:30: Buffer for overrun (10 min)

   Total: 3:30 (200 min) = actual workshop time
   ```

2. **Modular content design:**
   - Core path: Must-cover content (fits in 80% of time)
   - Optional extras: "If we have time" demos
   - Each module self-contained (can be dropped if running late)

3. **Visible timekeeping:**
   - Timer on screen showing time remaining
   - Co-presenter giving time signals
   - Phone alarm at key checkpoints

4. **Practice with timer:**
   - Rehearse full workshop
   - Time each section
   - If it takes 3 hours in rehearsal, it'll take 4 hours live

**Detection:**
- 90 minutes in, you're only halfway through planned content
- Participants asking "when's the break?"
- Someone sneaks out (probably have a hard stop)
- Venue staff hovering, pointing at watch

**Recovery plan:**
1. **Make the cut:**
   - Identify what can be dropped
   - "We're running behind, so I'm skipping Demo #4"
   - "Here's the GitHub link to explore Demo #4 on your own"

2. **Speed up strategically:**
   - Show, don't live-code
   - Fewer hands-on exercises, more demos
   - Cut Q&A during session, save for end

3. **Respect hard stops:**
   - At 3-hour mark: "We have 30 min left. This is your exit point if you need to leave."
   - Summarize what's left: "Final demo then wrap-up"
   - Email follow-up materials to those who leave early

**Sources:**
- [Workshop time management best practices](https://www.pmi.org/learning/library/behind-schedule-projects-workshop-approach-6935)
- [Time management in technical workshops](https://www.actitime.com/developers-time-tracking/time-management-in-software-development)
- [Running a technical workshop like a pro](https://www.ministryoftesting.com/articles/running-a-technical-workshop-like-a-pro?s_id=16479174)

---

## Minor Pitfalls

Mistakes that cause annoyance but are easily fixable.

### Pitfall 10: Low Workshop Energy / Audience Disengagement

**What goes wrong:** After 90 minutes, room energy plummets. People checking phones, side conversations, visible fatigue. 77% of employees disengage when work feels disconnected from purpose - workshops face similar dynamics.

**Why it happens:**
- Long stretches without breaks or interaction
- Passive watching instead of active doing
- Lack of movement (sitting for 3.5 hours)
- Content feels disconnected from participants' needs
- Monotone delivery, no variety in format

**Prevention:**
1. **Energizers every 45 minutes:**
   - Physical: "Everyone stand up and stretch"
   - Mental: "Turn to neighbor and explain what we just built"
   - Competitive: "First person to get this working wins [small prize]"

2. **Interactive techniques:**
   - Polls: "How many of you have tried X?"
   - Live questions: "What should we build next?"
   - Pair programming exercises
   - Show-and-tell: participants share their results

3. **Movement and variety:**
   - Don't talk for more than 20 minutes straight
   - Alternate: demo → hands-on → demo → discussion
   - Use different presenters/voices if co-teaching
   - Physical breaks: bathroom, coffee, walk around

4. **Connection to purpose:**
   - Start each section: "Here's WHY this matters"
   - Real-world examples: "This is how Netflix uses this"
   - Let participants suggest use cases

**Detection:**
- Lots of phones out
- Side conversations
- People leaving for bathroom and not coming back
- Yawning, slouching, glazed eyes
- Hands-on exercise engagement drops

**Recovery:**
1. **Emergency energizer:**
   - "Quick break - stand up, stretch, 2 minutes"
   - Change format immediately
   - Ask engaging question: "What's the coolest thing you could build with this?"

2. **Shift to high-engagement:**
   - Stop talking, start doing
   - "Everyone try this next exercise - first to finish, show me"
   - Add element of fun/competition

**Sources:**
- [Workshop engagement strategies 2026](https://gogather.com/blog/unlocking-audience-engagement-examples-and-strategies-for-success)
- [Making workshops more engaging](https://caffeinatedkyle.com/engaging-workshop/)
- [Employee disengagement causes](https://www.quantumworkplace.com/2025-workplace-trends-report)

---

### Pitfall 11: Poor Room Setup and Logistics

**What goes wrong:** Projector doesn't work, room too small, tables configured wrong, no power outlets, coffee break chaos. Even with great communication, research shows "the initial setup might need adjustments."

**Why it happens:**
- Didn't visit venue beforehand
- Assumed venue provides standard setup
- No buffer time for adjustments
- Last-minute room changes

**Prevention:**
1. **Site visit (1 day before if possible):**
   - Test projector with your laptop
   - Count power outlets
   - Check WiFi strength
   - Find bathrooms, break area
   - Request room re-arrangement if needed

2. **Arrive 60 minutes early:**
   - Setup and test everything
   - Display "Welcome" slide before people arrive
   - Put agenda on whiteboard/flip chart
   - Arrange tables (classroom style or pods)

3. **Logistics checklist:**
   - Adapters (HDMI, USB-C, VGA)
   - Extension cords and power strips
   - Printed handouts (backup if tech fails)
   - Visible clock or timer
   - Coffee/water/snacks location communicated

**Detection:**
- People arriving and asking "where's the bathroom?"
- Projector not connecting to laptop
- No power outlets near tables
- Room too hot/cold, can't adjust

**Recovery:**
- Always have adapters
- If projector fails, use large monitor or share screen wirelessly
- If room too crowded, adjust exercises to reduce movement

**Sources:**
- [Room setup for workshops](https://www.sessionlab.com/blog/room-setup/)
- [Workshop logistics guide](https://advance.washington.edu/liy/sites/default/files/Workshop%20Logistics%20Guide_0.pdf)
- [Technical workshop checklist](https://www.jvt.me/posts/2017/02/15/preparing-a-technical-workshop/)

---

## Phase-Specific Warnings

| Workshop Phase | Likely Pitfall | Mitigation |
|----------------|----------------|------------|
| **Pre-workshop (1 week before)** | Participants don't read setup instructions | Send 2 reminders, offer pre-workshop office hours, use browser-based tools that need no setup |
| **Setup (first 15 min)** | Camera/API key/WiFi failures | Build in 15-min buffer, have TAs ready to help, provide pre-tested loaner resources |
| **First demo (0:15-0:45)** | Live coding fails, syntax errors | Use pre-written code with git checkpoints, only live-code simple parts, have backup video |
| **Hands-on #1 (0:45-1:15)** | Mixed skill levels, some finish in 5 min, others stuck at 30 min | Provide tiered exercises (basic + advanced), encourage pairing, have solution available |
| **Mid-workshop (1:30-2:00)** | Energy crash, people checking phones | Take 10-min break with movement, switch format, add interactive poll or discussion |
| **Advanced demos (2:00-3:00)** | API quota exhausted, hardware lag | Monitor quota usage, stagger API calls, optimize for performance, have pre-recorded fallback |
| **Wrap-up (3:00-3:30)** | Running over time, rushing finale | Cut optional content early, summarize key points, email follow-up materials to those who leave |

---

## Preparation Phase Checklist

**3 Days Before:**
- [ ] Test all demos in actual venue if possible
- [ ] Verify API quotas and billing setup
- [ ] Send "test your camera" email to participants
- [ ] Clone workshop repo to USB drive (offline backup)
- [ ] Record backup videos of critical demos

**1 Day Before:**
- [ ] Visit venue, test projector and WiFi
- [ ] Prepare loaner webcams and power strips
- [ ] Create local mock API for offline fallback
- [ ] Time full rehearsal with co-presenter
- [ ] Send final reminder email with setup checklist

**Day Of (arrive 60 min early):**
- [ ] Test projector, sound, lighting
- [ ] Connect to WiFi, verify internet speed
- [ ] Setup camera test page on big screen
- [ ] Arrange tables, post agenda on board
- [ ] Open all tabs, repos, tools you'll use
- [ ] Put phone on silent, close email/Slack
- [ ] Have co-presenter ready as backup

---

## Delivery Phase Checklist

**During Workshop:**
- [ ] Monitor time every 15 minutes
- [ ] Watch for disengagement signals (phones, yawning, side talk)
- [ ] Check API quota dashboard between sections
- [ ] Ask "everyone following?" every 30 minutes
- [ ] Take 10-min break every 60-75 minutes
- [ ] If running over, cut optional content, not core demos
- [ ] Have co-presenter help stuck participants while you present

**When Something Breaks:**
- [ ] Stay calm, acknowledge the issue
- [ ] Apply 2-minute rule: if not fixed in 2 min, use backup
- [ ] Turn failure into learning moment
- [ ] Keep energy positive: "This is real development!"
- [ ] Never blame participants, venue, or tools

---

## Meta-Pitfall: The "Everything Will Be Fine" Trap

**What goes wrong:** Instructor assumes nothing will break because it worked perfectly in testing.

**Reality:** With 40 participants, diverse hardware, venue WiFi, and live APIs, something WILL break. The question isn't "if" but "when" and "how many things."

**Prevention:** Embrace Murphy's Law. For every critical dependency, have a backup. For every demo, have a pre-recorded version. For every exercise, have a solution. For every internet-required feature, have an offline version.

**Mindset shift:**
- From: "I hope nothing breaks"
- To: "When this breaks, here's my plan"

This transforms failures from catastrophes into minor hiccups, maintaining workshop energy and credibility.

---

## Sources Summary

This research drew from 30+ sources covering:
- AI tool failures and quota management (Google AI Developer Forums, API documentation)
- Live coding and demo best practices (technical blogs, Medium articles)
- Workshop facilitation and engagement (SessionLab, Ministry of Testing, Community Tool Box)
- Hardware troubleshooting (Dell, Microsoft, webcam testing guides)
- Time management and logistics (PMI, technical workshop guides)
- Real-time performance optimization (MediaPipe, gesture recognition research)
- Workplace disengagement trends (SHRM, Quantum Workplace, Inizio Engage)

**Confidence Level:** HIGH for technical pitfalls (API, hardware, performance), MEDIUM for soft skills (engagement, pacing), verified across multiple authoritative sources and real-world incident reports.
