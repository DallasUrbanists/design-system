<script setup>
import { ref } from 'vue'
import { Button } from '@dallasurbanists/ui'
import { Dialog } from '@dallasurbanists/ui'
import { Menu } from '@dallasurbanists/ui'
import { Toast } from '@dallasurbanists/ui'
const notice = ref(false)
const selected = ref('')
const items = [{ value: 'copy', label: 'Copy link' }]
</script>

<template>
  <Dialog placement="tray" title="Outer tray" description="A long panel for testing nested overlays.">
    <template #trigger><Button>Open outer tray</Button></template>
    <p v-for="n in 18" :key="n">Details for this synthetic idea, paragraph {{ n }}.</p>
    <Menu label="Nested tools" :items="items" @select="selected = $event" />
    <Dialog title="Inner dialog" description="A nested confirmation.">
      <template #trigger><Button>Open inner dialog</Button></template>
      <Button>Inner action</Button>
    </Dialog>
    <Button @click="notice = true">Show nested notice</Button>
    <Toast v-model:open="notice" title="Nested notice" :duration="Infinity" />
    <p role="status">{{ selected }}</p>
  </Dialog>
</template>
