---
name: component-scaffolder
description: This skill should be used when the user asks to "create a component", "add a component", "new component", "scaffold a component", "generate a component", or names a specific piece of UI to build (e.g. "add a tag list component", "build a footer") in this Angular frontend. Generates a new component in the correct folder using the Angular CLI and wires it up per this repo's conventions.
version: 0.1.0
---

# Component Scaffolder

Scaffold new Angular components for this repo consistently, using the Angular CLI rather than hand-written boilerplate, and place them in the correct folder.

## Step 1: Choose the folder

Classify the component by responsibility before generating it:

| Folder | Use for | Examples |
|---|---|---|
| `src/app/ui/` | Small, presentational primitives with no business logic or app-state dependencies. Reusable anywhere. | `badge`, `region` |
| `src/app/components/` | Feature-specific components that compose `ui/` primitives and carry some logic. | `link-table`, `link-table-item`, `featured-links` |
| `src/app/layout/` | Structural/chrome components shared across pages, part of the app shell. | `navbar` |
| `src/app/pages/` | Routed, top-level containers registered in `app.routes.ts`. Compose `components/`, `layout/`, `ui/`. Not imported by other components. | `home` |

If the request doesn't clearly fit one bucket, ask which folder before generating rather than guessing — moving a component after the fact means updating every import.

## Step 2: Generate with the CLI

Run from the `frontend` project root:

```
npx ng generate component <folder>/<kebab-case-name>
```

e.g. `npx ng generate component ui/tag-list` or `npx ng generate component pages/character/character-detail`.

Do not pass flags that change the output shape (`--inline-template`, `--inline-style`, `--change-detection`, etc.) and do not hand-write the files instead. The CLI defaults in this repo (driven by `angular.json`) already produce the correct shape:

- Class name has no `Component` suffix (e.g. `TagList`, not `TagListComponent`)
- Separate `.ts` / `.html` / `.css` / `.spec.ts` files (external `templateUrl`/`styleUrl`)
- No explicit `standalone: true` or `changeDetection` in the decorator
- Selector prefixed `app-` automatically (from `angular.json` `prefix`)
- A default `.spec.ts` with a `TestBed`-based "should create" test

If any generated file doesn't match this shape, `angular.json` schematics defaults have likely changed — fix the config rather than patching each generated component by hand.

## Step 3: Fill in the component

Follow `.claude/CLAUDE.md` while implementing the body:

- Use `input()` / `output()` functions for props and events, not decorators.
- Use `computed()` for any derived state; keep state transformations pure.
- Use native control flow (`@if`, `@for`, `@switch`) in the template, never `*ngIf`/`*ngFor`/`*ngSwitch`.
- Bind `class`/`style` directly, never `ngClass`/`ngStyle`.
- Put host bindings/listeners in the `host` object of the `@Component` decorator, never `@HostBinding`/`@HostListener`.
- Use `NgOptimizedImage` for static images (not inline base64).
- Use full descriptive names for any lambda parameters (e.g. `character => character.name`, not `c => c.name`).
- Meet WCAG AA: label interactive elements, manage focus, keep contrast compliant — the component must pass AXE checks.
- If the component needs a data shape, define a plain interface in `src/app/models/`, not inline in the component.

## Step 4: Wire it up

- For `ui/`, `components/`, `layout/` components: add the new component class to the `imports` array of every `@Component` that uses it in its template.
- For `pages/` components: register the route in `src/app/app.routes.ts` (and `app.routes.server.ts` if it needs an explicit SSR rendering mode).

## Step 5: Verify

Run the generated spec to confirm the scaffold is healthy before building on it:

```
npx ng test --include='**/<kebab-case-name>.spec.ts'
```
