import { MapShell } from '@dallasurbanists/ui'
import SyntheticMapShell from './SyntheticMapShell.vue'

export default {
  title: 'Components/Map shell', component: MapShell, parameters: { layout: 'fullscreen' },
  render: args => ({ components: { SyntheticMapShell }, setup: () => ({ args }), template: '<SyntheticMapShell v-bind="args" />' }),
}
export const Default = {}
export const Desktop = { args: { presentation: 'desktop' } }
export const App = { args: { presentation: 'app' } }
export const InteractionFixture = {}
