<template>
  <v-app>
    <v-main>
      <v-app-bar density="compact">
        <v-app-bar-nav-icon v-if="$vuetify.display.xs" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer/>
        <v-tabs v-if="$vuetify.display.smAndUp">
          <v-tab v-for="(route, i) in routes" :key="i" :to="route.value" style="font-size: .825rem" class="px-2">{{ route.title }}</v-tab>
        </v-tabs>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer">
        <v-list>
          <v-list-item v-for="route in routes" :key="route.value" exact :to="route.value">
            <v-icon class="mb-1 mr-2">{{ route.icon }}</v-icon>
            {{ route.title }}
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <router-view />
      <v-snackbar
        v-model="snackbarService.snackbarInfo.display"
        :text="snackbarService.snackbarInfo.message"
        :color="snackbarService.snackbarInfo.color"
        close-delay="5000"
        close-on-content-click
      />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { snackbarService } from './services/instances/snackbarService.instance';

const routes = [
  {
    value: '/',
    title: 'Mes personnages',
    icon: 'mdi-pencil',
  },
  {
    value: '/items',
    title: 'Objets',
    icon: 'mdi-sack'
  },
  {
    value: '/encounter',
    title: 'Rencontres',
    icon: 'mdi-alert-decagram',
  },
  {
    value: '/room',
    title: 'Combat',
    icon: 'mdi-fencing'
  }
];

export default defineComponent({
  name: 'App',
  data: () => ({
    routes,
    drawer: false,
    snackbarService,
  }),
  watch: {
    drawer() {
      if (this.$vuetify.display.smAndUp) {
        this.drawer = false
      }
    },
    '$vuetify.display.smAndUp'() {
      if (this.$vuetify.display.smAndUp) {
        this.drawer = false
      }
    }
  }
});
</script>
