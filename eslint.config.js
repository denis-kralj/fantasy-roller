import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs([
    {
        name: 'app/files-to-lint',
        files: ['**/*.{ts,mts,tsx,vue}'],
    },
    {
        name: 'app/files-to-ignore',
        ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/generated/**'],
    },
    ...pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,
    {
        ...pluginVitest.configs.recommended,
        files: ['src/**/__tests__/*', 'src/**/*.test.ts'],
    },
    skipFormatting,
])
