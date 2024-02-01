<template>
  <v-app>
    <v-app-bar app dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app dark>
      <template #img="props">
        <v-img :gradient="gradient" v-bind="props"></v-img>
      </template>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Three.js </v-list-item-title>
          <v-list-item-subtitle> 3D Examples </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-spacer></v-spacer>

      <v-list density="compact">
        <v-list-item-group active-class="white--text">
          <template v-for="menu in items">
            <template v-if="menu.childrens">
              <v-list-group :key="menu.id">
                <template v-slot:activator>
                  <v-icon>{{ menu.icon }}</v-icon>
                  <v-list-item-title class="ml-2">{{ menu.title }}</v-list-item-title>
                </template>
                <template v-for="children in menu.childrens">
                  <v-list-item :to="children.to" class="ml-2" :key="children.id" :active-class="`accent-4 white--text`">
                    <v-list-item-icon :active-class="`accent-4`">
                      <v-icon>{{ children.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      {{ children.title }}
                    </v-list-item-title>
                  </v-list-item>
                </template>
              </v-list-group>
            </template>
            <template v-else>
              <v-list-item :key="menu.id" :to="menu.to">
                <v-icon>{{ menu.icon }}</v-icon>
                <v-list-item-title class="ml-2">{{ menu.title }}</v-list-item-title>
              </v-list-item>
            </template>
          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-bottom-navigation v-bind:input-value="canBottomMenu" color="indigo">
      <v-btn v-for="bt_itm in bottom_items" v-bind:key="bt_itm.title" :to="bt_itm.to">
        <v-icon>{{ bt_itm.icon }}</v-icon>
        {{ bt_itm.title }}
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      drawer: true,
      items: [
        { title: "Cube", icon: "mdi-cube", to: "/", id: 1 },
        { title: "Car", icon: "mdi-car", to: "/section2", id: 2 },
        { title: "AroundView", icon: "mdi-view-dashboard", to: "/section3", id: 3 },
        { title: "EarthMoon", icon: "mdi-earth", to: "/earth", id: 4 },
        {
          title: "Gallary", icon: "mdi-panorama-variant",
          childrens: [
            { title: "2D", icon: "mdi-cone", to: "/gallary", id: 501 },
            { title: "3D", icon: "mdi-cone", to: "/3d_gallary", id: 502 },
          ],
          id: 5
        },
      ],
      bottom_items: [
        { title: "Cube", icon: "mdi-cube", to: "/" },
        { title: "Car", icon: "mdi-car", to: "/section2" },
        { title: "AroundView", icon: "mdi-view-dashboard", to: "/section3" },
        { title: "EarthMoon", icon: "mdi-earth", to: "/earth" },
        { title: "Gallary", icon: "mdi-panorama-variant", to: "/gallary" },
        { title: "3D_Gallary", icon: "mdi-view-split-horizontal", to: "/3d_gallary" },
      ],
      gradient: "rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)",
    };
  },
  computed: {
    canBottomMenu() {
      return window.innerWidth < 768;
    }
  }
};
</script>
