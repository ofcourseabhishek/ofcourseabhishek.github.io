
# Portfolio Website — Design Specification

**Owner:** Abhishek Rai  
**Document:** `design.md`  
**Status:** Design requirements defined; implementation decisions pending  
**Project type:** Personal developer portfolio

---

## 1. Project Overview

Build a personal portfolio website for Abhishek Rai, a Computer Science and Engineering student pursuing opportunities in AI/ML engineering and software development.

The portfolio should establish a professional personal brand, communicate technical strengths, and present selected projects to recruiters, engineering managers, and other developers.

The design should take inspiration from the supplied hero reference without reproducing it exactly.

The central design principle is:

> Communicate the most important information about Abhishek, his technical profile, and his work immediately, without requiring visitors to scroll through the website.

The website should be minimal, spacious, professional, and visually distinctive.

### 1.1 Primary objectives

- Establish a clear professional identity.
- Communicate the owner's AI/ML engineering focus.
- Present relevant technical skills.
- Showcase two or three selected projects.
- Provide direct access to GitHub and LinkedIn.
- Make contact information and the resume accessible.
- Present education, experience, certifications, and other professional information.
- Provide a responsive experience across desktop and mobile devices.

### 1.2 Target audience

The primary audience consists of:

- Recruiters.
- Developers and software engineers.

The interface should make it easy for these visitors to understand the owner's background, technical capabilities, and project experience.

---

## 2. Design Principles

### 2.1 Information density without clutter

The hero should communicate several important details within the initial viewport.

However, displaying more information must not make the interface feel crowded.

Use clear typography, deliberate spacing, visual hierarchy, and concise content.

### 2.2 Minimalism

Use a minimal and spacious visual language.

Avoid unnecessary interface elements, excessive decoration, and visual noise.

### 2.3 Professional identity

The website should communicate professionalism.

Visual effects, typography, colours, and animations should support the content rather than distract from it.

### 2.4 Project-first credibility

Projects should be treated as substantive demonstrations of technical ability rather than merely decorative portfolio cards.

The project section should support detailed presentation of the problem, implementation, and relevant technical details.

### 2.5 Responsive composition

The desktop design should not simply be compressed to fit a mobile screen.

The mobile experience should have its own considered layout while retaining the same content priorities and professional identity.

---

## 3. Reference Analysis

The supplied reference is the primary visual inspiration.

### 3.1 Characteristics to retain as inspiration

- A large, spacious canvas.
- A prominent central portrait.
- Information arranged on both sides of the portrait.
- A strong introductory heading.
- Clear visual hierarchy between the introduction and supporting information.
- Floating project or professional-information cards.
- A restrained navigation bar.
- A prominent contact action.
- Subtle background shapes and decorative elements.
- A cohesive, minimal composition.

These are reference characteristics, not mandatory reproductions of every element.

### 3.2 Required adaptations

The portfolio must represent a developer and AI/ML engineer rather than a UI/UX designer.

Replace design-oriented information and visual examples with relevant developer portfolio content.

The interface should communicate:

- Name and professional title.
- Short professional introduction.
- Technical skills.
- Selected projects.
- Professional links.
- A clear contact action.

### 3.3 Elements not yet approved

The following decisions remain open:

- Exact arrangement of floating elements.
- Number and type of floating cards.
- Decorative 3D objects.
- Exact background decoration.
- Card shapes and dimensions.
- Exact spacing and proportions.
- Whether the reference's rounded outer canvas should be retained.

Do not treat these details as finalized.

---

## 4. Information Architecture

The primary navigation contains exactly two named tabs:

1. **Me**
2. **My projects**

The tabs should switch the displayed content without a full-page reload.

The exact routing strategy is not finalized.

### 4.1 Me

The Me view is the primary personal and professional profile.

It must contain:

- Introduction.
- Skills.
- Education.
- Experience.
- Certifications.
- Contact information.
- Resume download.
- Current availability for opportunities.

The hero is the primary introduction to this view.

### 4.2 My projects

The My projects view presents selected projects as editorial case studies.

The initial project selection should contain two or three projects.

The exact projects to feature must be confirmed before implementation.

### 4.3 Navigation requirements

- Display the two navigation labels clearly.
- Make the active view distinguishable.
- Preserve a consistent navigation appearance across both views.
- Switch content without a full-page reload.
- Ensure navigation remains usable on mobile.
- Avoid adding additional primary navigation tabs without approval.

The exact active-state animation and transition behaviour are TBD.

---

## 5. Hero Section

The hero is the most important part of the portfolio.

It must communicate the owner's identity, professional focus, technical skills, and selected work quickly.

### 5.1 Desktop composition

**Required composition:** Central portrait with information on both sides.

The composition should be inspired by the supplied reference.

The central portrait should serve as the visual anchor.

The surrounding content should remain readable and should not compete excessively with the portrait.

The exact left-to-right placement of individual information blocks is TBD.

### 5.2 Hero content

The following elements must be represented in the hero:

1. Display name.
2. Professional title.
3. Short introduction.
4. Technical skills.
5. Featured project.
6. Contact action.
7. GitHub link.
8. LinkedIn link.

All of these elements should be visible in the initial desktop viewport where practical.

The exact layout must be validated at the intended desktop viewport size.

### 5.3 Display name

**Abhishek Rai**

Use this as the primary personal identifier.

### 5.4 Professional title

**AI/ML Engineer**

This is the selected professional headline.

The website may also communicate the owner's Computer Science and Engineering student status through the introduction.

Do not replace the selected headline with a different job title without approval.

### 5.5 Hero introduction

Use the following supplied introduction as the content source:

> Computer science student passionate about artificial intelligence, computer vision, and software engineering and seeking opportunities to apply skills in these domains. Experienced with Linux-based development and Dockerized application deployment. Strong interest in building AI-powered products that solve real-world problems. Focused on building scalable solutions and gaining industry experience through challenging projects.

The wording may be edited for length and readability during implementation, provided the meaning is preserved.

A shorter hero-specific version may be used if the full introduction is retained elsewhere in the Me view.

The final copy is TBD.

### 5.6 Portrait

Use a professional photograph of Abhishek.

The required asset has not yet been prepared.

The portrait should:

- Be visually prominent.
- Work with the central composition.
- Have sufficient resolution for desktop and mobile.
- Be cropped intentionally for each layout.
- Maintain a professional appearance.

The exact aspect ratio, crop, background treatment, and image framing are TBD.

Do not substitute an unrelated stock photograph or an invented avatar.

### 5.7 Technical skills

Technical skills must be represented in the hero.

The presentation format is undecided.

Potential formats include a compact text list, grouped categories, technology icons, or badges.

Do not finalize a format until it has been selected.

### 5.8 Featured project

Include a featured-project element in the hero.

The final project selection is TBD.

The featured project should link to the corresponding case study or project detail view.

Its exact presentation, image, title, and supporting text must be determined from the selected project.

### 5.9 Social links

Provide GitHub and LinkedIn links.

The exact destination URLs must be verified before implementation.

Do not fabricate profile URLs.

### 5.10 Contact action

The contact action should open Abhishek's LinkedIn profile.

The exact button label is TBD.

The destination URL must be verified.

### 5.11 Floating elements

The use and arrangement of floating elements remain undecided.

The reference uses floating cards to communicate professional information and show work.

If this approach is retained, possible content includes:

- Featured-project previews.
- Technology or skill badges.
- Professional-role information.

These are possibilities, not approved requirements.

The final floating-element system is TBD.

---

## 6. Me View

The Me view should provide a structured professional profile without making the visitor navigate through unrelated sections.

### 6.1 Introduction

Present the owner's professional identity and background.

The introduction should be consistent with the hero.

### 6.2 Skills

Present technical capabilities using information supported by the owner's resume.

The following skill information is available.

#### Programming languages

- Python
- C++
- C
- JavaScript
- Java

#### Frameworks and libraries

- FastAPI
- Flask
- NumPy
- Pandas
- OpenCV
- matplotlib

#### Database

- PostgreSQL

#### AI/ML and development

- Computer Vision
- Prompt Engineering
- Image Analysis
- REST API Development

#### Tools

- Git
- GitHub
- Docker
- Linux (Fedora)
- VS Code
- Android Studio
- Codex
- Ollama
- Claude Code
- Antigravity

The exact grouping, order, iconography, and visual presentation are TBD.

Do not add technologies that have not been confirmed for the portfolio.

### 6.3 Education

Use the following resume information:

**B.Tech in Computer Science & Engineering**

- Institution: Pranveer Singh Institute of Technology
- Location: Kanpur
- Dates: August 2024 – May 2028
- GPA: 6.7/10

The education section should present these details clearly.

The exact visual layout is TBD.

### 6.4 Experience

The portfolio must include an Experience section.

The supplied resume does not provide a separate employment or internship history.

Do not invent employment, internships, job titles, employers, or dates.

The content and presentation of this section remain TBD until the owner provides the relevant information.

If no experience entries are available, the section's visibility and empty-state treatment must be decided before implementation.

### 6.5 Certifications

The resume lists the following certifications:

- 100 Days of Code: The Complete Python Pro Bootcamp — Angela Yu, Udemy.
- Machine Learning Specialization — Andrew Ng, Coursera.

Present the certification names and providers accurately.

Certificate URLs, completion dates, credential identifiers, and verification links are TBD.

Do not invent credentials or certification dates.

### 6.6 Resume download

Provide a resume download action.

Use the approved, current resume file.

The final file location, filename, and button label are TBD.

Ensure that the download points to the actual resume rather than a placeholder.

### 6.7 Contact information

The resume provides:

- Email: ofcourse.abhishek@gmail.com
- LinkedIn profile reference: `in/Abhishek--Rai`

The exact LinkedIn URL must be verified before implementation.

A phone number is present in the resume, but whether it should be published on the portfolio is TBD.

The contact section should make the approved contact methods easy to access.

### 6.8 Current opportunities

The portfolio should communicate that Abhishek is seeking opportunities.

The precise wording, availability status, and opportunity types must be confirmed before publication.

Do not display a live availability claim unless it is accurate.

---

## 7. My Projects View

The projects view should present two or three selected projects.

The selected layout is **editorial case studies**.

### 7.1 Design objective

Each project should communicate more than its name and technology stack.

The presentation should allow a visitor to understand what the project does and why it demonstrates relevant technical work.

### 7.2 Case-study structure

The following is a proposed content structure. The final fields and their order remain subject to confirmation.

- Project name.
- Short summary.
- Problem or motivation.
- Project goals.
- Solution and implementation.
- Technical stack.
- Relevant technical decisions.
- Screenshots or other project visuals.
- GitHub repository link.
- Live application link, where available.

Do not fabricate project outcomes, usage statistics, performance claims, or implementation details.

### 7.3 Project selection

The final two or three projects have not been explicitly selected.

The resume includes the following project.

#### Focal Point AI — AI Photography Feedback Platform

The resume describes Focal Point AI as an AI-powered web application that analyzes photographs and delivers professional feedback.

Documented capabilities include:

- Evaluation of composition.
- Lighting analysis.
- Exposure analysis.
- Focus analysis.
- Framing analysis.
- Colour-balance analysis.
- Visual-storytelling feedback.
- Personalized suggestions for photographers.
- A FastAPI backend for image processing and structured AI-generated feedback.

The resume lists the following technologies:

- Python.
- FastAPI.
- AI vision models.
- JavaScript.
- HTML/CSS.
- Docker.

The resume also mentions user authentication, feedback history, progress tracking, scoring, and photography challenges as planned features.

Do not present planned features as implemented features.

The resume contains a claim of processing over 100 images daily. Confirm that this claim remains accurate and that it is appropriate to publish before including it.

The repository URL, live application URL, screenshots, and final case-study content must be verified.

#### Additional projects

The other one or two selected projects are TBD.

Do not automatically add projects merely because they have been discussed elsewhere.

The owner must confirm which projects belong in this portfolio.

### 7.4 Project visuals

Project visuals should support the case-study content.

The required screenshots and visual assets have not yet been prepared.

The number, aspect ratio, and presentation of project images are TBD.

---

## 8. Visual Design System

The visual direction must remain consistent across the Me and My projects views.

### 8.1 Theme

**Requirement:** Support both light and dark themes.

Provide a theme toggle.

The exact theme colours and the default theme are TBD.

The theme system should maintain readable text and distinguishable interface elements in both modes.

### 8.2 Colour palette

The colour palette has not been selected.

Do not treat the blue accent or light-grey background in the reference as a confirmed colour requirement.

Define the following tokens once the palette is approved:

- Page background.
- Primary surface.
- Secondary surface.
- Primary text.
- Secondary text.
- Primary accent.
- Borders and dividers.
- Interactive hover states.
- Focus indicators.

Light and dark theme values should be coordinated.

### 8.3 Typography

The typography direction is TBD.

The reference uses a prominent heading and restrained supporting text, but the exact font family and type scale have not been selected.

The final system should define:

- Display heading.
- Section heading.
- Body text.
- Supporting text.
- Navigation text.
- Button text.
- Optional technical or monospace text.

Font families, weights, sizes, line heights, and responsive scaling are TBD.

### 8.4 Spacing

The overall design should feel spacious.

The exact spacing scale, content width, section gaps, and component padding are TBD.

Spacing should be consistent across the site.

### 8.5 Cards and surfaces

The exact card style is TBD.

Do not assume that every content block must use a card.

Use surfaces only where they support hierarchy and content organization.

### 8.6 Borders, shadows, and radii

The reference contains soft edges and subtle separation between elements.

The final border thickness, corner radii, shadow treatment, and surface effects are TBD.

### 8.7 Icons

The icon library and icon style are TBD.

Any icons used for technologies or social links must accurately represent their destinations or technologies.

Avoid unnecessary decorative icons.

---

## 9. Motion and Interaction

**Requirement:** Rich motion and interactive effects.

The motion design should reinforce the visual hierarchy and make the interface feel responsive.

Specific effects have not yet been selected.

### 9.1 Potential interaction areas

- Navigation transitions.
- Theme switching.
- Hero element entrances.
- Portrait interactions.
- Floating-card interactions.
- Project case-study transitions.
- Button hover and press states.
- Scroll-related effects.

These are possible implementation areas, not a finalized animation list.

### 9.2 Motion constraints

- Do not let animation delay access to important content.
- Keep navigation responsive.
- Avoid motion that makes text difficult to read.
- Avoid effects that obscure project information.
- Ensure the interface remains usable when motion is reduced.
- Preserve the layout when animations are disabled.

The animation library, timing, easing, sequence, and exact effects are TBD.

---

## 10. Responsive Design

### 10.1 Desktop

Use the central-portrait composition with information on both sides.

Prioritize the complete hero and its most important information.

Avoid unnecessary scrolling before visitors can understand the owner's identity and technical focus.

The exact target viewport dimensions are TBD.

### 10.2 Tablet

The layout should adapt to the available width.

The exact breakpoint and tablet-specific arrangement are TBD.

### 10.3 Mobile

**Requirement:** Use a dedicated mobile layout.

Do not simply scale down the desktop composition.

Rearrange the content to preserve a clear reading order.

The mobile layout must retain access to:

- Name and professional title.
- Introduction.
- Technical skills.
- Featured project.
- GitHub and LinkedIn.
- Contact action.
- Primary navigation.

The exact order, portrait placement, navigation treatment, and stacking behaviour are TBD.

### 10.4 Responsive assets

The portrait and project visuals should be prepared for the layouts in which they appear.

Avoid cropping that removes important visual information.

Exact image dimensions and responsive asset variants are TBD.

---

## 11. Accessibility and Usability

The portfolio should remain usable across input methods and display conditions.

Implementation requirements:

- Use semantic page structure.
- Provide accessible names for interactive controls.
- Ensure keyboard navigation works.
- Make focus states visible.
- Maintain readable text contrast in both themes.
- Do not communicate state through colour alone.
- Provide appropriate alternative text for meaningful images.
- Respect reduced-motion preferences.
- Ensure the theme toggle and navigation are keyboard accessible.
- Avoid hover-only interactions.

The final accessibility verification process is TBD.

---

## 12. Technical Implementation

The technology stack has not been finalized.

### 12.1 Recommended stack

**Recommendation: React + Vite.**

This is a recommendation, not an approved implementation decision.

Reasons for considering this stack:

- The portfolio has two views that switch content without a full-page reload.
- React supports reusable UI components.
- The interface contains repeated patterns such as project cards, skill groups, navigation items, and theme controls.
- Vite provides a straightforward development and build workflow.
- The portfolio's described requirements do not inherently require a server-rendered framework.

### 12.2 Alternatives

Next.js remains an option.

The final decision should account for the intended deployment platform, routing requirements, SEO strategy, and whether server-side rendering or other framework-specific capabilities are needed.

Plain HTML, CSS, and JavaScript are also possible, but the final choice should reflect the desired implementation and maintenance approach.

### 12.3 Frontend requirements

Regardless of the selected stack:

- Implement the two primary views.
- Support in-place content switching.
- Support light and dark themes.
- Implement responsive layouts.
- Keep the content and visual system consistent.
- Make project links and contact actions functional.
- Keep animations independent of core content availability.

### 12.4 Routing

The required behaviour is content switching without a full-page reload.

Whether to use client-side routes, URL-backed state, or local view state is TBD.

If separate URLs are introduced, the route structure and browser-history behaviour must be defined.

### 12.5 Animation library

TBD.

Select a library only after the required motion has been specified.

### 12.6 Deployment

**Decided:** GitHub Pages, deployed by a GitHub Actions workflow (`.github/workflows/deploy.yml`) on every push to `main`. The site is served at `ofcourseabhishek.github.io`.

A custom domain is TBD.

---

## 13. Content and Asset Requirements

The following assets and information must be prepared or verified.

| Asset or information | Status |
|---|---|
| Professional portrait | To be prepared |
| Project screenshots | To be prepared |
| Selected portfolio projects | TBD |
| GitHub profile URL | To be verified |
| LinkedIn profile URL | To be verified |
| Current resume file | To be supplied or confirmed |
| Project repository URLs | To be verified |
| Live project URLs | To be verified |
| Experience details | TBD |
| Opportunity-status wording | TBD |
| Certification details and links | TBD |
| Final hero introduction | TBD |
| Theme colours | TBD |
| Typography | TBD |

Do not use invented content or placeholder destinations in the production website.

---

## 14. Confirmed Requirements vs. Open Decisions

### Confirmed

- Personal developer portfolio.
- Primary purpose: personal brand and job opportunities.
- Primary audience: recruiters and developers.
- Professional and minimal visual style.
- Spacious composition.
- Inspiration from the supplied hero reference, without an exact copy.
- Central portrait with information on both sides.
- Professional photograph of the owner.
- Hero-first presentation of important information.
- Hero includes name, title, introduction, skills, featured project, contact action, GitHub, and LinkedIn.
- Two primary navigation tabs: Me and My projects.
- Navigation switches content without a full-page reload.
- Two or three selected projects.
- Editorial case-study presentation.
- Both light and dark themes.
- Theme toggle.
- Rich motion and interactive effects.
- Dedicated mobile layout.
- Contact action opens LinkedIn.
- Me view includes introduction, skills, education, experience, certifications, contact information, resume download, and current opportunities.

### Open decisions

- Default theme.
- Exact colour palette.
- Typography.
- Skill presentation format.
- Floating elements and their arrangement.
- Exact hero information placement.
- Project selection.
- Featured project.
- Project case-study content and visuals.
- Final hero copy.
- Contact button label.
- Final GitHub and LinkedIn URLs.
- Experience content.
- Whether to publish a phone number.
- Resume file and download path.
- Exact animation effects and library.
- Exact responsive breakpoints.
- Detailed mobile composition.
- Routing implementation.
- Final frontend stack.
- Hosting platform and domain.
- Final content and asset dimensions.

Open decisions must not be silently converted into implementation requirements.

---

## 15. Implementation Acceptance Criteria

The design can be considered implemented when the following requirements are met.

### Hero

- [ ] The hero has a central portrait with information on both sides on desktop.
- [ ] The display name is Abhishek Rai.
- [ ] The professional headline is AI/ML Engineer.
- [ ] The introduction communicates the supplied professional background.
- [ ] Technical skills are represented.
- [ ] A selected project is featured.
- [ ] GitHub and LinkedIn links are present and verified.
- [ ] The contact action opens the verified LinkedIn profile.
- [ ] The most important information is visible quickly.
- [ ] The hero remains readable and well-proportioned.

### Navigation

- [ ] The primary navigation contains Me and My projects.
- [ ] Navigation switches views without a full-page reload.
- [ ] The active view is visually identifiable.
- [ ] Navigation works on mobile.

### Me view

- [ ] Introduction is present.
- [ ] Skills are present.
- [ ] Education is present.
- [ ] Experience is represented without fabricated history.
- [ ] Certifications are present.
- [ ] Contact information is present.
- [ ] Resume download works.
- [ ] Opportunity information is accurate.

### My projects

- [ ] Two or three projects are selected.
- [ ] Projects use an editorial case-study presentation.
- [ ] Project content reflects verified information.
- [ ] Repository links work.
- [ ] Live links are included only where verified.
- [ ] Project visuals are prepared and displayed correctly.

### Visual system

- [ ] Light theme works.
- [ ] Dark theme works.
- [ ] Theme toggle works.
- [ ] The design is minimal and spacious.
- [ ] Typography and colours follow the approved design system.
- [ ] Motion does not obstruct content or navigation.

### Responsive behaviour

- [ ] Desktop composition works.
- [ ] Tablet layout works.
- [ ] Mobile uses a dedicated arrangement.
- [ ] Important content remains accessible at small widths.
- [ ] No unintended horizontal overflow occurs.

### Quality

- [ ] Interactive elements work.
- [ ] Keyboard navigation works.
- [ ] Focus states are visible.
- [ ] Reduced-motion preferences are respected.
- [ ] No fabricated credentials, project claims, or profile links are present.
- [ ] The final implementation has been checked across supported viewport sizes.

---

## 16. Final Design Direction

The portfolio should be a professional, minimal, spacious developer portfolio built around a strong central-portrait hero.

The hero should immediately communicate Abhishek Rai's identity as an AI/ML Engineer, his technical interests, and his selected work.

The two-view structure should keep personal and professional information separate from detailed project case studies while maintaining a consistent visual identity.

The supplied reference establishes the broad visual direction, but the final colour palette, typography, floating elements, animation details, and technical stack remain subject to confirmation.

**The specification is ready to guide design and implementation, provided unresolved decisions are confirmed before they become fixed requirements.**