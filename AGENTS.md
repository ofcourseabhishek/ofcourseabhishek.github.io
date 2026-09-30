
# AGENT.md — Portfolio Development Instructions

## 1. Project Overview

Build and maintain the personal portfolio website of Abhishek Rai, a Computer Science and Engineering student pursuing opportunities in AI/ML engineering and software development.

The portfolio is intended for:
- Recruiters
- Developers and software engineers

The website must communicate the owner's professional identity, technical capabilities, and project experience clearly.

The primary design objective is to present the most important professional information immediately through a well-structured hero section.

## 2. Source of Truth

Before making changes, read the following project documents:

- `design.md` — design requirements, content structure, visual direction, and interaction requirements.
- `AGENT.md` — development workflow, coding conventions, and implementation constraints.

### Rules

1. Treat `design.md` as the primary source of truth for the website's design.
2. Treat this file as the source of truth for development practices.
3. Do not silently introduce design decisions that have not been approved.
4. If a requirement is marked `TBD`, treat it as unresolved.
5. If requirements conflict, identify the conflict before implementing a potentially significant change.
6. Do not invent personal information, project details, credentials, URLs, or professional achievements.
7. If a decision is necessary to proceed, explain the options and ask for clarification.
8. Do not modify the design specification merely to justify an implementation decision.

## 3. Design Direction

The portfolio must follow these established requirements:

- Minimal and spacious visual design.
- Professional appearance.
- Central portrait with information on both sides in the desktop hero.
- Strong information hierarchy.
- A prominent professional introduction.
- Technical skills and selected project information visible in the hero.
- Two primary navigation tabs: `Me` and `My projects`.
- Light and dark themes.
- A theme toggle.
- Rich motion and interactive effects.
- A dedicated mobile layout.
- Editorial-style project case studies.

The supplied hero reference is an inspiration, not a specification to reproduce pixel-for-pixel.

Adapt its general composition to a developer and AI/ML engineering portfolio.

Do not introduce unnecessary visual complexity.

## 4. Unresolved Design Decisions

The following decisions must not be treated as finalized unless updated in `design.md`:

- Frontend technology stack.
- Colour palette.
- Typography.
- Default theme.
- Skill presentation format.
- Floating elements and their arrangement.
- Exact hero layout proportions.
- Featured project.
- Final project selection.
- Animation effects and animation library.
- Responsive breakpoints.
- Detailed mobile composition.
- Routing strategy.
- Deployment platform.
- Domain and hosting configuration.

When implementation depends on one of these decisions:

1. Check whether an existing project configuration already establishes the answer.
2. Check whether the decision has been documented elsewhere in the repository.
3. If the decision remains unresolved, ask the owner before making a consequential choice.
4. For minor reversible implementation details, choose a sensible default only when it does not conflict with documented requirements. Record the decision when it affects future work.

Do not repeatedly ask about decisions that have already been made.

## 5. Technology and Architecture

The frontend stack has not been finalized.

React with Vite is a candidate, but it is not an approved requirement until confirmed.

Before initializing the project:

- Inspect the existing repository.
- Identify the current framework and package manager, if any.
- Review existing dependencies and scripts.
- Check whether a project structure already exists.
- Avoid replacing working infrastructure without a clear reason.

If the repository is empty and the stack is still undecided, present the available options and their implications before initializing the application.

### Architecture principles

Regardless of the selected stack:

- Keep components focused and reusable.
- Separate content from presentation where practical.
- Avoid unnecessary abstraction.
- Keep the implementation understandable and maintainable.
- Avoid introducing dependencies without a clear benefit.
- Do not build backend infrastructure unless the approved requirements need it.
- Do not introduce a database, authentication system, or API merely because the portfolio presents AI/ML projects.

## 6. Required Website Structure

The website has two primary views.

### 6.1 Me

The Me view contains:

- Professional introduction.
- Technical skills.
- Education.
- Experience.
- Certifications.
- Contact information.
- Resume download.
- Current opportunity status.

The hero belongs to this view.

### 6.2 My projects

The My projects view presents two or three selected projects using editorial case studies.

Each case study may contain:

- Project name.
- Summary.
- Problem statement.
- Approach and implementation.
- Technical stack.
- Relevant technical decisions.
- Project visuals.
- Repository link.
- Live application link, where available.

Only include details supported by verified project information.

### 6.3 Navigation

The primary navigation must contain:

- Me
- My projects

Switching views must not require a full-page reload.

The final routing strategy remains subject to the approved technical design.

The active view must be visually identifiable.

Navigation must remain accessible on mobile and through keyboard interaction.

## 7. Hero Implementation

The hero is the highest-priority component of the website.

### Required content

- Name: Abhishek Rai
- Professional title: AI/ML Engineer
- Short professional introduction
- Technical skills
- Featured project
- Contact action
- GitHub link
- LinkedIn link

### Layout

On desktop, use a central portrait with information arranged on both sides.

Prioritize readability and balanced composition.

The hero should communicate the owner's professional identity and technical focus without requiring unnecessary scrolling.

Do not force every element into a single row if doing so damages readability.

On mobile, rearrange the composition into a dedicated responsive layout.

### Portrait

Use the approved portrait asset.

Do not substitute a stock photograph, unrelated image, or generated identity without authorization.

If the portrait has not been supplied, use an explicitly identified temporary placeholder during development.

Do not commit an unrelated placeholder as the final portrait.

### Featured project

The featured project must be selected by the owner.

Do not automatically assume that the first project in the repository is the featured project.

Ensure that the featured project links to the appropriate case study or project destination.

## 8. Content Integrity

The portfolio must use accurate, verifiable information.

The resume may be used as a source for professional information, but it must not be used to infer unlisted achievements or experience.

### Prohibited content fabrication

Never invent:

- Employment history.
- Internships.
- Job titles.
- Academic qualifications.
- Certifications.
- Project features.
- Project results.
- User counts.
- Performance statistics.
- Repository URLs.
- Live application URLs.
- Professional profile URLs.

Distinguish completed features from planned features.

If a project description contains an unverified metric, do not publish that metric until it has been confirmed.

### Contact information

Use only contact details approved for public display.

Do not expose private information from local files, environment variables, or development configuration.

The contact action should open the owner's verified LinkedIn profile.

The exact destination URL must be confirmed.

The resume must be available through a working download action once the approved file is provided.

## 9. Visual System

The visual system must be consistent across both primary views.

### Themes

Implement light and dark themes.

Provide a functional theme toggle.

Use centralized theme tokens rather than scattering hardcoded colours throughout components.

The exact palette and default theme must follow the approved design specification.

### Typography

Use a consistent type scale and clear hierarchy.

The final font families, weights, and sizes must follow the approved design specification.

### Spacing and layout

Use consistent spacing and alignment.

Maintain the minimal, spacious visual direction.

Avoid arbitrary spacing values when an established spacing system exists.

### Components

Create reusable components when they serve a clear purpose.

Potential shared components include:

- Navigation
- Theme toggle
- Hero
- Skill group
- Project preview
- Project case study
- Contact action
- Footer

These are implementation suggestions, not a requirement to create a separate component for every item.

## 10. Animation and Interaction

The website should support rich motion and interactive effects.

However, animation must not compromise usability.

Requirements:

- Keep interactions responsive.
- Do not delay access to important content.
- Avoid excessive movement that distracts from the portfolio.
- Keep text readable during transitions.
- Provide appropriate hover, focus, and active states.
- Respect the user's reduced-motion preference.
- Ensure the site remains functional when animations are disabled.

The specific animation library and effects must follow the approved design decisions.

Do not add a dependency solely to implement a trivial transition.

## 11. Responsive Design

Develop and test the website across desktop, tablet, and mobile layouts.

### Desktop

Preserve the central-portrait hero composition and information on both sides.

### Tablet

Adapt spacing, typography, and element placement to the available width.

### Mobile

Use a dedicated layout rather than simply shrinking the desktop design.

Ensure that:

- The portrait remains appropriately framed.
- The introduction is readable.
- Important hero information remains accessible.
- Navigation works.
- Project case studies are readable.
- Interactive controls are usable.
- No unintended horizontal overflow occurs.

Use responsive CSS rather than maintaining separate duplicated implementations unless there is a clear reason to do so.

## 12. Accessibility

Follow accessibility best practices.

- Use semantic HTML.
- Provide meaningful alternative text for informative images.
- Provide accessible names for controls.
- Support keyboard navigation.
- Maintain visible focus indicators.
- Ensure adequate text contrast in both themes.
- Do not rely exclusively on colour to communicate state.
- Ensure the theme toggle is accessible.
- Respect reduced-motion preferences.
- Use appropriate heading hierarchy.
- Ensure interactive elements have suitable target sizes.

Do not sacrifice accessibility for visual effects.

## 13. Performance

Keep the portfolio lightweight and responsive.

- Optimize image assets.
- Use appropriate image formats.
- Avoid unnecessarily large dependencies.
- Avoid loading large assets before they are needed.
- Prevent layout shifts where practical.
- Use animation techniques that avoid unnecessary layout recalculation.
- Avoid unnecessary client-side state and rendering complexity.
- Keep the initial hero experience responsive.

Do not add performance optimizations that introduce unnecessary complexity without a measurable benefit.

## 14. Code Quality

Follow the conventions of the selected framework and existing repository.

General requirements:

- Use clear, descriptive names.
- Keep functions and components focused.
- Avoid duplicated logic.
- Avoid unnecessary global state.
- Keep configuration separate from application content.
- Remove unused imports and dead code.
- Avoid unexplained magic numbers.
- Handle errors appropriately.
- Do not suppress warnings without understanding their cause.
- Do not leave debugging statements in production code.
- Do not commit secrets, API keys, or credentials.

Use the existing formatter, linter, and type checker when configured.

Do not introduce a new toolchain without a clear reason.

## 15. Development Workflow

Before implementing a task:

1. Read the relevant sections of `design.md`.
2. Inspect the existing implementation.
3. Identify the components and files affected.
4. Check whether the task depends on an unresolved decision.
5. Plan the smallest coherent change.

During implementation:

1. Follow existing project conventions.
2. Reuse existing components where appropriate.
3. Preserve unrelated functionality.
4. Avoid broad rewrites when a focused change is sufficient.
5. Keep design and implementation aligned.
6. Do not modify unrelated files.

After implementation:

1. Run the available checks.
2. Run the build.
3. Fix errors introduced by the change.
4. Check the affected interactions.
5. Check responsive behaviour where relevant.
6. Summarize the changes and any remaining issues.

Do not claim that a test, build, or validation passed unless it was actually executed and its result was checked.

## 16. Dependency Management

Before adding a dependency:

- Determine whether the existing stack already provides the required capability.
- Evaluate the dependency's purpose and maintenance implications.
- Prefer established, appropriately scoped libraries.
- Avoid installing multiple libraries for overlapping functionality.
- Keep package versions consistent with the project's package manager.

Do not replace the package manager or regenerate the lockfile without a specific reason.

## 17. Documentation

Keep project documentation accurate.

Update documentation when a change materially affects:

- Architecture.
- Setup instructions.
- Dependencies.
- Environment variables.
- Deployment.
- Design decisions.
- Development workflow.

If an unresolved design decision is approved, update `design.md` accordingly.

Do not modify `design.md` simply to make an unapproved implementation appear compliant.

## 18. Git and Change Management

Keep changes focused and reviewable.

- Do not discard existing user changes.
- Do not reset or overwrite unrelated work.
- Do not commit secrets or generated build artifacts.
- Do not create commits unless requested or explicitly required by the workflow.
- Do not perform destructive Git operations without explicit authorization.

## 19. Definition of Done

A task is complete when:

- The requested functionality is implemented.
- The implementation follows `design.md`.
- No unapproved design decisions have been introduced.
- The code follows the project's conventions.
- Relevant checks have been executed.
- The build succeeds, where applicable.
- Responsive behaviour has been checked where relevant.
- Accessibility has been considered.
- No fabricated content or placeholder destinations remain in the affected production features.
- Documentation has been updated when necessary.

If a requirement cannot be completed, explain what remains and why.

## 20. Final Operating Principle

Build the portfolio to communicate Abhishek Rai's professional identity and technical work clearly.

Prioritize:

1. Accurate content.
2. Clear information hierarchy.
3. Faithfulness to the approved design.
4. Responsive usability.
5. Accessibility.
6. Maintainable implementation.
7. Performance.

Do not confuse creative implementation freedom with permission to invent requirements.

When in doubt, inspect the project documentation, preserve existing decisions, and ask before making consequential changes.