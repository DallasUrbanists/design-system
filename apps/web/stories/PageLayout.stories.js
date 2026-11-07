import { PageLayout } from '@dallasurbanists/ui'
import LayoutSpecimen from './LayoutSpecimen.vue'
export default { title: 'Components/Page layout', component: PageLayout, parameters: { layout: 'fullscreen' }, render: () => ({ components: { LayoutSpecimen }, template: '<LayoutSpecimen />' }) }
export const DocumentLayout = { name: 'Document layout (non-map)' }
