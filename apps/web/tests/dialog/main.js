import { createApp, h } from 'vue'
import { Button } from '@dallasurbanists/ui'
import { Dialog } from '@dallasurbanists/ui'
import '../../../../dist/style.css'
import LayoutSpecimen from '../../stories/LayoutSpecimen.vue'
import NestedFixture from './NestedFixture.vue'

createApp({ render: () => location.search.includes('nested') ? h(NestedFixture) : location.search.includes('patterns') ? h(LayoutSpecimen) : h(Dialog, { title: 'Review idea', description: 'Check the details before continuing.' }, {
  trigger: () => h(Button, null, () => 'Open dialog'),
  default: () => h('button', 'First action'),
}) }).mount('#app')
