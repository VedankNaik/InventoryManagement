<template>
  <div>
    <div class="blue darken-4" style="text-align:center; color:white;">
      <h1>TRACK SUPPLIES</h1>
    </div>

    <div style="padding-top:80px; ">
      <v-card class="mt-4 mx-auto" max-width="1000">
        <div v-for="t in tracking" :key="t.ID" style="padding-top:10px;">
          <div v-if="t.diff > 0">
            <v-progress-linear :value="t.diff" height="50"
              >{{ t.diff }} days remaining for arrival of
              {{ t.info }} stocks</v-progress-linear
            >
          </div>
          <div v-else-if="!t.arrival">
            <v-progress-linear color="red" height="50"
              >{{ t.info }} not confirmed</v-progress-linear
            >
          </div>
          <div v-else>
            <v-progress-linear color="green" :value="100" height="50"
              >{{ t.info }} stock arrived on {{ t.arrival }}</v-progress-linear
            >
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
document.title = "Inventory | TRACKING";
export default {
  data: () => ({
    tracking: []
  }),
  mounted: function() {
    this.track();
  },
  methods: {
    track() {
      const baseURI = "http://localhost/vuephp/config.php?action=track";
      this.$http.get(baseURI).then(response => {
        this.tracking = response.data.items;
      });
    }
  }
};
</script>
