# Dallas Urbanists UI

Use the shared Vue controls and layouts in an application with Vue 3. Install
`@dallasurbanists/ui`, then import the stylesheet once at the application root:

```ts
import '@dallasurbanists/ui/style.css'
import { Button, Card } from '@dallasurbanists/ui'
```

The full stylesheet includes Figtree, tokens, and component rules. Framework
integrations that need only tokens can import `@dallasurbanists/ui/tokens.css`.
The optional `uiIconComponentKey` accepts a Vue component with a semantic
`name: IconName` prop; without a provider the controls use static Lucide icons.
Vue is a peer dependency. Reka UI and Lucide are runtime dependencies.

For development use Node 26.13.0 and pnpm 11.25.0, run `pnpm install
--frozen-lockfile`, then `pnpm build` and `pnpm dev:storybook`. Run
`pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build:storybook`,
and `pnpm test:storybook` before review. The static catalog builds from the
compiled package. The source and its extraction record identify asset terms.
