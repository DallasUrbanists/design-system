<script setup lang="ts">
import { ref } from 'vue'
import { Button, MapSearchBar, MapShell, NavigationRail, Tray } from '@dallasurbanists/ui'
import type { MapPresentation } from '@dallasurbanists/ui'
withDefaults(defineProps<{ presentation?: MapPresentation }>(), { presentation: 'auto' })
const open = ref(true)
const maximize = ref(false)
const query = ref('')
const destinations = [{ value: 'map', label: 'Explore' }, { value: 'saved', label: 'Saved ideas' }]
</script>
<template>
  <MapShell :presentation="presentation" :foreground-open="open">
    <template #map><div class="synthetic-map" role="img" aria-label="Synthetic map preview"><span>Map preview</span></div></template>
    <template #navigation><NavigationRail current="map" :items="destinations" /></template>
    <template #search><MapSearchBar v-model="query" :destinations="destinations" /></template>
    <template #foreground="{ placement, maxHeight, onGeometry }">
      <Tray v-model:open="open" v-model:maximize="maximize" label="Community ideas" :placement="placement" :max-height="maxHeight" @geometry="onGeometry">
        <div class="content"><p>A synthetic foreground surface over a persistent map.</p><Button variant="secondary">Review idea</Button></div>
      </Tray>
    </template>
  </MapShell>
</template>
<style scoped>
.synthetic-map { width: 100%; height: 100%; background: repeating-linear-gradient(35deg, var(--map-ground) 0 36px, var(--color-surface) 37px 40px); color: var(--color-text); }
.synthetic-map span { position: absolute; right: 1rem; top: 6rem; }
.content { padding: var(--gap-standard); }
</style>
