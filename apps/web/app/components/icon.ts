import type { Component, InjectionKey } from 'vue'

export type IconName = 'search' | 'history' | 'avatar' | 'explore' | 'saved' | 'settings' | 'location' | 'warning' | 'info' | 'success' | 'error' | 'expand' | 'collapse' | 'home' | 'spinner'

/** Provide a component accepting a semantic icon name to replace the default. */
export const uiIconComponentKey: InjectionKey<Component<{ name: IconName }>> = Symbol('UI icon component')
