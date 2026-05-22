# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About

TotoLocator is an Angular 19 admin dashboard for managing school bus tracking. It covers organizations, schools, staff, students, guardians, drivers, vehicles, trips, terminals, invoices, and notifications. The app is geographically centered on Nairobi, Kenya.

## Commands

```bash
# Development server (default port 4200)
ng serve

# Production build (output: dist/totolocator/)
ng build

# Serve the built app with Express (used in production/Heroku)
npm start

# Build with file watching
npm run watch

# Run unit tests (Karma + Jasmine)
ng test

# Run a single test file
ng test --include='**/students.component.spec.ts'
```

## Environments

| File | Usage | API URL |
|------|-------|---------|
| `environment.ts` | Dev | `http://localhost:8080/api/` |
| `environment.staging.ts` | Staging | Heroku instance |
| `environment.prod.ts` | Prod | (configure before deploy) |

The Angular CLI environment replacement is configured in `angular.json`. Import from `../../../../../environment` (relative to the component depth) — not from `@environments/`.

## Architecture

### Layouts

Two top-level layouts in `src/app/layouts/`:
- **FullComponent** — authenticated shell with sidebar/header. All app pages use this.
- **BlankComponent** — bare shell for auth pages (login, register) and landing page.

`AuthGuard` (`pages/authentication/auth-guard/AuthGuard.ts`) protects all `FullComponent` routes by checking `localStorage.getItem('token')`.

### Authentication

The active login component is `pages/authentication/boxed-login/`. It POSTs to `{apiUrl}authenticate`, stores the JWT in `localStorage` under the key `token`, and stores `username` separately. `side-login` does not call the API.

### CRUD Pattern

Every entity page (students, drivers, schools, etc.) follows the same pattern:

1. **Component** extends `CrudActions` (`pages/apps/reusable/CrudActions.ts`) and calls its inherited methods: `getRecord`, `onAddRecord`, `onUpdateRecord`, `onDeleteRecord`, `onViewRecord`, `onFilterRecord`.
2. **CrudActions** injects `HttpClient` and `MatDialog`. It reads the JWT from `localStorage` on each call to build `Authorization: Bearer <token>` headers. API calls go to `{environment.apiUrl}{entityName}`.
3. **SchoolViewComponent** (`pages/apps/schools/school-view/`) is the universal dialog used for all CRUD actions (Add, Update, View, Delete, Notification) across every entity — despite its name it is not school-specific.
4. **CrudDataTableComponent** (`pages/apps/reusable/crud-data-table/`) is the reusable table with pagination and action buttons. It emits events (`onAddItem`, `onViewItem`, `onUpdateItem`, `onDeleteItem`, `onFilterValue`) that the parent entity component handles.
5. **DynamicFormComponent** (`pages/apps/reusable/dynamic-form/`) renders a form from an `IForm` config object. It supports field types: `text`, `date`, `datetime-local`, `select`, `file`, and `map`.

### Form Configuration

Forms are defined as `IForm` objects in `pages/apps/forms/`. Each entity has a `*-form-config.ts` file (e.g. `student-registration-form-config.ts`). The `IForm` interface:

```typescript
interface IForm {
  formTitle: string;
  saveBtnTitle: string;
  resetBtnTitle: string;
  formControls: FormControls[];
  displayColumns: string[];  // columns shown in CrudDataTableComponent
}
```

`FormControls` supports a `displayInput: boolean` flag — set to `false` to hide a field from the rendered form (used for `longitude`/`latitude` fields populated by the map).

To add a new entity, create a form config, add the component extending `CrudActions`, declare it in `pages/apps/apps.module.ts`, and add a route to `pages/apps/apps.routing.ts`.

### Maps

The Google Maps API key is loaded synchronously in `src/index.html` with the `places` library. The `DynamicFormComponent` integrates Google Places Autocomplete for form fields with `type: "map"`. `TripViewerComponent` (`pages/apps/trips/trip-viewer/`) polls bus location every 10 seconds and renders a route using `DirectionsService`.

### Navigation

Nav items are configured in `src/app/services/nav.service.ts`. App-wide settings (theme, direction, language) are managed by `CoreService` using `AppSettings` from `src/app/app.config.ts`.
