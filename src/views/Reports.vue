<template>
  <div>
    <div class="blue darken-4" style="text-align:center; color:white;">
      <h1>REPORT</h1>
    </div>

    <v-divider></v-divider>

    <div style="padding-top:80px; padding-left:50px; ">
      <v-card class="mt-4 mx-auto" max-width="1000">
        <v-sheet
          class="v-sheet--offset mx-auto"
          elevation="12"
          max-width="calc(100% - 32px)"
        >
          <v-sparkline
            :labels="labels"
            :fill="fill"
            :gradient="gradient"
            :line-width="width"
            :padding="padding"
            :smooth="radius || false"
            :value="value"
            auto-draw
          ></v-sparkline>
        </v-sheet>

        <v-card-text class="pt-0">
          <div class="title font-weight-light mb-2">Activities per day</div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
document.title = "Inventory | REPORT";

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"]
];

export default {
  data: () => ({
    labelsob: [],
    valueob: [],
    labels: [],
    value: [],
    i: 0,
    fill: true,
    gradient: gradients[4],
    gradients,
    padding: 8,
    radius: 10,
    width: 2
  }),
  mounted: function() {
    this.getcount();
    this.getdate();
  },
  methods: {
    getcount() {
      const baseURI = "http://localhost/vuephp/config3.php?action=count";
      this.$http.get(baseURI).then(response => {
        this.valueob = response.data.items;
        for (let j = 0; j < this.valueob.length; j++) {
          this.value.push(parseInt(this.valueob[j].vals));
        }
      });
    },
    getdate() {
      const baseURI = "http://localhost/vuephp/config3.php?action=date";
      this.$http.get(baseURI).then(response => {
        this.labelsob = response.data.items;
        for (let j = 0; j < this.labelsob.length; j++) {
          this.labels.push(this.labelsob[j].datelabel);
        }
      });
    }
  }
};
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
