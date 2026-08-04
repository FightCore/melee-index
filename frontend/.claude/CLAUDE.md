
You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Do NOT set `changeDetection: ChangeDetectionStrategy.OnPush` explicitly. `OnPush` is the default in Angular v22+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Always use external `templateUrl`/`styleUrl` files, even for small components. This repo overrides the generic Angular guidance to prefer inline templates, to stay consistent with every existing component and with the `ng generate component` default.
- Prefer Signal Forms (`@angular/forms/signals`) for new forms. They are stable in Angular v22+ and provide signal-based state, type-safe field access, and schema-based validation
- When not using Signal Forms, prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Prefer the `@Service` decorator over `@Injectable({providedIn: 'root'})` for new singleton services (Angular v22+)
- Use the `inject()` function instead of constructor injection

## Project Conventions

### Folder structure

Place new code by responsibility, not by feature:

- `src/app/ui/` — small, presentational primitives with no business logic and no dependencies on app state (e.g. `badge`, `region`). Reusable anywhere.
- `src/app/components/` — feature-specific components that compose `ui/` primitives and carry some logic (e.g. `link-table`, `link-table-item`, `featured-links`).
- `src/app/layout/` — structural/chrome components shared across pages, wired into the app shell (e.g. `navbar`).
- `src/app/pages/` — routed, top-level containers registered in `app.routes.ts`. Pages compose `components/`, `layout/`, and `ui/`; they should not be imported by other components.
- `src/app/models/` — plain TypeScript interfaces/types only. No classes, no logic.

### Generating components

Always scaffold new components with `ng generate component <path>` rather than hand-writing the files. The CLI defaults already match this repo's conventions (no `Component` suffix on the class name, external `templateUrl`/`styleUrl`, no explicit `standalone`/`changeDetection`) — do not pass flags that change this. Pick `<path>` using the folder structure above, e.g. `ng generate component ui/badge` or `ng generate component pages/home`.

### Naming

- Lambda/callback parameters use full descriptive words, never single letters or abbreviations — e.g. `character => character.name`, not `c => c.name`.
