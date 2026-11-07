<script setup lang="ts">
import { Search, Clock, User, Globe, Bookmark, Wrench, MapPin, TriangleAlert, Info, Check, CircleAlert, Maximize, Minimize, House, Loader } from '@lucide/vue'
import type { IconName } from '@dallasurbanists/ui'
defineProps<{ name: IconName }>()
const icons = { search: Search, history: Clock, avatar: User, explore: Globe, saved: Bookmark, settings: Wrench, location: MapPin, warning: TriangleAlert, info: Info, success: Check, error: CircleAlert, expand: Maximize, collapse: Minimize, home: House, spinner: Loader }
</script>
<template><component :is="icons[name]" aria-hidden="true" :width="20" :height="20" /></template>
