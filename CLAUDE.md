# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**siyuan-alist** is a SiYuan Note plugin that integrates with [Alist](https://alist.nn.ci/) file management server. It enables large attachment management, file uploads to Alist, scheduled backups, and embedded Alist web UI within SiYuan's dock panel.

- Plugin ID: `siyuan-alist`
- Platform: SiYuan Note (desktop, mobile, browser)
- Based on: [sy-plugin-template-vite](https://github.com/frostime/sy-plugin-template-vite)

## Build & Dev Commands

```bash
pnpm install          # Install dependencies
pnpm build            # Production build → dist/ + package.zip
pnpm dev              # Dev build with watch + livereload → dev/
pnpm make-link        # Create symlink for local SiYuan dev testing
pnpm make-install     # Build + install to local SiYuan
```

No test framework or linter is configured.

## Architecture

```
src/
├── index.ts              # Plugin entry: lifecycle, event wiring, link interception
├── core/
│   ├── state.ts          # Centralized state singleton (PluginConfig + runtime state)
│   ├── logger.ts         # Conditional logging (outLog, toggleLog)
│   └── scheduler.ts      # Daily backup scheduler (scheduleDailyTask)
├── services/
│   └── alist-client.ts   # Alist REST API client (auth, upload, delete, rename, sign, mkdir)
├── features/
│   ├── backup.ts         # Full data export + upload to Alist
│   ├── upload.ts         # File/image upload with link insertion into notes
│   └── block-menu.ts     # Right-click menu: upload/delete attachment via Alist
├── ui/
│   ├── settings.ts       # Plugin settings registration + config loading
│   ├── dock.ts           # Alist iframe dock panel
│   ├── toolbar.ts        # Top-bar drag-and-drop upload area
│   └── templates.ts      # All HTML template strings
├── utils/
│   ├── mime.ts           # MIME type lookup (single source of truth)
│   ├── url.ts            # URL comparison and parsing helpers
│   └── date.ts           # Date/timestamp formatting
├── api.ts                # SiYuan kernel API wrapper (blocks, notebooks, files, SQL)
├── svgIconsDefinition.ts # SVG icon definitions
├── libs/                 # Third-party utilities (setting-utils, dialog)
├── types/                # TypeScript type definitions
├── MyVue/                # Vue components (FileTree)
└── index.scss            # Plugin styles
```

### Key Design Decisions

- **Centralized state** (`core/state.ts`): All plugin config and runtime state lives in a single exported `state` object, replacing scattered global `let` variables.
- **Service layer** (`services/alist-client.ts`): All Alist API calls go through this module with automatic token management (`ensureToken()`).
- **Feature modules** (`features/`): Each user-facing feature (backup, upload, block-menu) is self-contained.
- **UI separation** (`ui/`): Settings registration, dock panel, toolbar, and HTML templates are isolated from business logic.

### SiYuan API Layer

`src/api.ts` — Wraps SiYuan kernel REST APIs via `fetchSyncPost`. Covers blocks, notebooks, file tree, attributes, SQL, templates, export, and notifications. Forked from frostime's template.

### Build System

- **Vite** with `vite.config.ts` — Builds as CJS library (`src/index.ts` → `index.js`)
- Externals: `siyuan`, `process`
- Dev mode: inline sourcemaps, livereload, no minification
- Production: minified, zipped to `package.zip`
- Custom `yaml-plugin.js` converts YAML i18n to JSON during build
- Path alias: `@/` → `src/`

### CI/CD

GitHub Actions (`.github/workflows/release.yml`): On push to `main` with commit message containing `v*`, auto-creates git tag, builds with pnpm, and publishes `package.zip` as GitHub Release.

## Key Conventions

- Plugin version is tracked in both `package.json` (npm) and `plugin.json` (SiYuan marketplace) — keep them in sync.
- Alist authentication uses username/password → JWT token flow. Token is cached in `alist-client.ts` and auto-refreshed.
- File uploads use streaming PUT to `/api/fs/put` (non-beta) or form upload to `/api/fs/form` (beta mode with progress).
- `state.displayUrl` returns `alistExternalUrl` (if set) or `alistUrl` — used for links inserted into notes.
- The plugin disables itself in readonly mode (`window.siyuan.config.readonly`).
- Settings keys in storage maintain backward compatibility with old key names (e.g., `alistToken` for password, `kuai` for autoInsertVideo).
- Static methods on `SiYuanAlist` class (`handleFileUpload`, `handleFileUploadwithoutlink`) are preserved for STtools plugin compatibility.
- i18n: Chinese is primary (YAML source at `public/i18n/zh_CN.yaml`), English is JSON.
