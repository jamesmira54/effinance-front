# AGENTS.md

Instructions for AI coding agents working in this project.

AI tools must not add AI attribution to commits or pull requests, including AI
`Co-Authored-By` trailers or generated-by signatures. Preserve genuine human
attribution.

## What this is

Effinance (eFINAS) is the web front end of a local government scholarship and
financial-assistance system. Students register, build a profile, upload
requirements, and apply to sponsorships. Coordinators and admins move
applications through pooling, the application list, weighted-criteria ranking,
and FINAS Proper, then monitor grantees. Sponsors view their pools and grantees.
A public site lists available grants and announcements.

This repository is only the front end. All data comes from a separate REST API
configured by `NEXT_PUBLIC_API_URL` in `next.config.mjs`.

Stack: Next.js 15 App Router, React 18, TypeScript (strict), Tailwind CSS 3 on
the TailAdmin template, styled-components, Formik + Yup, Axios, npm.

## Proportional engineering

Build for established requirements, not hypothetical scale, threats, or future
flexibility. Reuse existing code, the standard library, native platform features,
and installed dependencies before adding machinery.

- Unknown scale or extensibility defaults to the smaller reversible design. Do
  not infer enterprise, multi-tenant, hostile-user, or compliance requirements.
- Derive trust and data-integrity boundaries from actual reachability: untrusted
  input, auth/session/ownership, shared persisted data, destructive operations,
  payments, secrets, and sensitive data.
- Ask only when an unknown materially changes behavior, architecture, persisted
  data, interoperability, a real security boundary, or cost. Otherwise choose the
  simplest repository-native implementation.
- Add an abstraction, dependency, service, configuration surface, compatibility
  layer, or security mechanism only for a current requirement.
- Simplicity never removes real trust-boundary validation, data-loss prevention,
  accessibility, explicit security requirements, configured tests, or project rules.

## Conventions

- Route groups: `src/app/(public)`, `(unprotected)` for login/signup,
  `(protected)` for the authenticated app.
- `page.tsx` files are thin async server components: `metadata`, fetch through
  an API service, render `Breadcrumb` plus one screen with a `serverData` prop.
- Client screens live in `src/screens/<feature>/` (`*Listing`, `*Form`, `*View`).
- Reusable UI lives in `src/components/<Component>/`; reuse it before adding more.
- One Axios service class per resource in `src/api/<resource>-api.ts`, extending
  `AxiosAPI`, exported from `src/api/index.ts`.
- Types in `src/types/<feature>.types.ts` or a sibling `<Name>.types.ts`.
- Forms use Formik + Yup; feedback via `Alert`, loading via `Throbber` or
  `useLoader()`.
- New protected pages need a `roles` entry in `src/lib/menu.ts`. New public
  pages go in both `publicRoutes` and the `matcher` in `src/middleware.ts`.
- Styling is Tailwind with TailAdmin tokens and `dark:` variants;
  styled-components only for small overrides.
- The backend enforces authorization; front-end role checks are UX only.

## Commands

Package manager: npm (`package-lock.json`).

- Dev server: `npm run dev` (http://localhost:3000, needs the backend API
  reachable at `NEXT_PUBLIC_API_URL`)
- Build: `npm run build`
- Production server: `npm run start`
- Lint: `npm run lint`

No test runner is configured. Testing is opt-in; when one is added, record its
command here as `Test`. There is no combined Verify command and no CI workflow.
