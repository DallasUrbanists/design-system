<script setup lang="ts">
import { inject } from 'vue'
import { Search, Clock, User, Globe, Bookmark, Wrench, MapPin, TriangleAlert, Info, Check, CircleAlert, Maximize, Minimize, House, Loader } from '@lucide/vue'
import { uiIconComponentKey, type IconName } from './icon'

defineProps<{ name: IconName }>()
const renderer = inject(uiIconComponentKey, undefined)
const icons = { search: Search, history: Clock, avatar: User, explore: Globe, saved: Bookmark, settings: Wrench, location: MapPin, warning: TriangleAlert, info: Info, success: Check, error: CircleAlert, expand: Maximize, collapse: Minimize, home: House, spinner: Loader }
</script>
<template>
  <component :is="renderer" v-if="renderer" :name="name" />
  <component :is="icons[name]" v-else class="ui-icon" aria-hidden="true" :width="20" :height="20" />
</template>
<style scoped>
.ui-icon { display: inline-block; flex: none; pointer-events: none; }
</style>
