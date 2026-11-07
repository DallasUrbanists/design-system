# Contribute to the shared design system

Use Node 26.13.0 and pnpm 11.25.0. Run `pnpm install --frozen-lockfile`,
`pnpm build`, and `pnpm dev:storybook` from the repository root. Source-mode
Storybook reflects the components in this repository; the static catalog uses
the built package. For a quick visual experiment, open a live Storybook Canvas
in Chrome, use DevTools to test a CSS rule, then make the intended focused edit
in the component or token source and save it. Check nested uses, focus,
disabled/loading states, light and dark themes, and narrow reflow. Review the
source diff; DevTools experiments are temporary and do not save source files.

The Vue Designer 1.6 trial wrote a padding change but reformatted the complete
Button single-file component when saved. It did not satisfy the focused-diff
criterion, so this repository does not depend on the trial integration. The
trial did not produce the requested ten timing samples or a complete state and
write-back comparison; do not infer an editor latency from that result.

Before review run `pnpm lint`, `pnpm build`, `pnpm typecheck`, `pnpm test`,
`pnpm build:storybook`, and `pnpm test:storybook`. Review the catalog checklist
in `apps/web/stories/foundations/ComponentReview.mdx`; record screen-reader and
physical-device gaps. Submit the exact revision, screenshots, checks, results,
asset changes, and any intended static-default-icon differences for design
approval. Add a Changeset for package changes. Keep provider-specific Maps and
licensed Lordicon artwork in the consuming application.

The Storybook tests normally use the development server. CI sets
`STORYBOOK_TEST_STATIC=1` to run the same tests against the built catalog and
avoid development-server reloads during accessibility scans. To reproduce
that check, run `pnpm build` and `pnpm build:storybook`, then set
`STORYBOOK_TEST_STATIC` to `1` before running `pnpm test:storybook`.

Publication requires an authorized maintainer. CI checks forks without secrets.
After catalog asset review and explicit upload authorization, set the repository
variable `STATIC_CATALOG_UPLOAD_APPROVED` to `true` to retain the built catalog. The manually dispatched release workflow is a
candidate that must be reviewed and configured only after the scope, remote,
release tag, catalog URL, archive digest, and trusted publisher are approved.
Chromatic's project must have UI tests disabled for publish-only operation;
configure its secret only after authorization. Never store credentials in Git.
