<template>
  <v-container>
    <v-navigation-drawer
      v-model="drawer"
      :color="color"
      :expand-on-hover="expandOnHover"
      :mini-variant="miniVariant"
      :right="right"
      :permanent="permanent"
      :src="bg"
      absolute
      dark
    >
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item v-bind:href="homelink">
            <v-list-item-content>
              <v-list-item-title>Inventory</v-list-item-title>
              <v-list-item-subtitle>Management</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item>

        <v-divider></v-divider>

        <v-list>
          <v-list-item style="padding-bottom:10px;" v-bind:href="homelink">
            <v-list-item-content>
              <v-icon>home</v-icon>
              <v-list-item-title align="center">Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item style="padding-bottom:10px;" :href="itemslink">
            <v-list-item-content>
              <v-icon>fas fa-list</v-icon>
              <v-list-item-title align="center">Items</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item style="padding-bottom:10px;" :href="stockslink">
            <v-list-item-content>
              <v-icon>fas fa-tachometer-alt</v-icon>
              <v-list-item-title align="center">Stocks</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item style="padding-bottom:10px;" :href="reportlink">
            <v-list-item-content>
              <v-icon>fas fa-edit</v-icon>
              <v-list-item-title align="center">Report</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item style="padding-bottom:10px;" :href="tracklink">
            <v-list-item-content>
              <v-icon>fas fa-circle-notch fa-spin</v-icon>
              <v-list-item-title align="center"
                >Track supplies</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      homelink: "/",
      itemslink: "/items",
      stockslink: "/stock",
      reportlink: "/report",
      tracklink: "/track",
      drawer: true,
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", route: "/" },
        { title: "Items", icon: "fas fa-list", route: "/" },
        { title: "Stock", icon: "fas fa-tachometer-alt", route: "/" }
      ],
      color: "primary",
      colors: ["primary", "blue", "success", "red", "teal"],
      right: false,
      permanent: true,
      miniVariant: false,
      expandOnHover: true,
      background: true
    };
  },
  computed: {
    bg() {
      return this.background
        ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        : undefined;
    }
  }
};
</script>
