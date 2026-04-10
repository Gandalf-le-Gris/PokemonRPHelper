# Guidelines du projet PokemonRPHelper

## Stack technique

- **Vue 3** (Composition API, `<script setup>`)
- **Vuetify 3** pour les composants UI
- **TypeScript** strict
- **Vite** comme bundler
- **unplugin-vue-components** + **unplugin-auto-import** : les composants et les APIs Vue (`ref`, `computed`, etc.) sont auto-importés — ne pas les importer manuellement

## Conventions Vue — Template

### Ordonnancement des attributs

Respecter cet ordre dans les templates, conforme au Style Guide officiel Vue :

1. `v-if` / `v-else-if` / `v-else` / `v-show`
2. `v-for`
3. `v-model`
4. Props et bindings (`:prop`)
5. Événements (`@event`)
6. Contenu (`v-html`, `v-text`)

```vue
<!-- ✅ Bon -->
<MonComposant
  v-if="condition"
  v-model="value"
  :ma-prop
  @mon-event="handler"
/>
```

### Shorthand de liaison (Vue 3.4+)

Quand le nom de la prop correspond exactement à la variable liée, utiliser la syntaxe courte :

```vue
<!-- ✅ Préféré -->
<MonComposant :character-mods :attack-types :is-player-sheet />

<!-- ❌ Verbeux si la variable a le même nom -->
<MonComposant :character-mods="characterMods" :attack-types="attackTypes" />
```

Fonctionne avec la conversion kebab-case → camelCase : `:is-player-sheet` est un raccourci pour `:is-player-sheet="isPlayerSheet"`.

## Conventions Vue — Script

### defineModel

Utiliser `defineModel` pour les composants qui mutent une prop parente :

```ts
const character: ModelRef<Character> = defineModel<Character>({ required: true });
```

### Props et emits typés

```ts
defineProps<{
  characterMods: Mod;
  isPlayerSheet?: boolean;
}>();

defineEmits<{
  'level-up': [];
  'open-status-dialog': [index: number];
}>();
```

## Architecture des composants

`PokemonSheet.vue` est le composant orchestrateur — il contient la logique métier et les dialogs. Les sections visuelles sont extraites en sous-composants dédiés (`PokemonSheetHeader`, `PokemonSheetStats`, etc.) qui reçoivent `character` via `v-model` et émettent des événements pour les actions nécessitant une logique parente.
