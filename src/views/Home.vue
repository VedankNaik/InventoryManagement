<template>
  <div>
    <div class="blue darken-4" style="text-align:center; color:white;">
      <h1>{{ title }}</h1>
    </div>

    <v-row>
      <v-col>
        <v-badge
          style="margin-left:1100px;"
          bordered
          color="error"
          icon="mdi-lock"
          overlap
        >
          <v-btn color="error" @click="overlay = !overlay">Lock</v-btn>
        </v-badge>
      </v-col>
      <v-col>
        <v-badge style="" color="green" :content="count">
          <v-btn v-on:click="getnotitems()"><v-icon>fas fa-bell</v-icon></v-btn>
        </v-badge>
      </v-col>
    </v-row>

    <div style="margin-left:1200px; padding-top:10px;">
      <template>
        <div class="text-center">
          <v-overlay :value="overlay">
            <v-card class="mx-auto" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4"></div>
                  <input
                    type="text"
                    name="username"
                    class="blue darken-2 text-center white--text"
                    v-model="input.username"
                    placeholder="Username"
                  />
                  <v-spacer></v-spacer>
                  <v-divider></v-divider>
                  <input
                    type="password"
                    name="password"
                    class="blue darken-2 text-center white--text"
                    v-model="input.password"
                    placeholder="Password"
                  />
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                </v-list-item-content>
              </v-list-item>
              <v-card-actions>
                <v-btn text v-on:click="login()">Unlock</v-btn>
              </v-card-actions>
            </v-card>
          </v-overlay>
        </div>
      </template>
    </div>

    <div>
      <template>
        <div class="text-center">
          <v-overlay :value="notioverlay">
            <v-card class="mx-auto" outlined>
              <v-list-item v-for="item in notitems" :key="item.Name">
                <v-list-item-content>
                  <v-list-item-title
                    >{{ item.Name }} is low on stocks:
                    {{ item.Quantity }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>

              <v-card-actions>
                <v-btn text @click="notioverlay = !notioverlay">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-overlay>
        </div>
      </template>
    </div>

    <div style="margin-left:200px; margin-right:200px;">
      <v-sheet tile height="54" color="grey lighten-3" class="d-flex">
        <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <div style="margin-left:300px; margin-top:10px;">
          {{ new Date().toLocaleString() }}
        </div>
        <v-spacer></v-spacer>
        <v-btn icon class="ma-2" @click="$refs.calendar.next()">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-sheet>
      <v-sheet height="300">
        <v-calendar
          ref="calendar"
          v-model="value"
          :weekdays="weekday"
          :type="type"
        ></v-calendar>
      </v-sheet>
    </div>

    <hr />
    <v-container class="grey lighten-5">
      <v-row>
        <v-col>
          <div class="spacing-playground">
            <template>
              <v-card max-width="700px">
                <v-card-title class="white--text blue darken-4"
                  >Recent Activities</v-card-title
                >

                <v-card-text class="pt-4"
                  >Today is {{ new Date().toLocaleString() }}</v-card-text
                >

                <v-divider></v-divider>

                <v-virtual-scroll :items="items" :item-height="50" height="300">
                  <template v-slot="{ item }">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-avatar class="white--text"></v-avatar>
                      </v-list-item-avatar>
                      <v-list-item-content style="margin-left:-60px;">
                        <v-list-item-title
                          >{{ item.Description }} --
                          {{ item.DateTime }}</v-list-item-title
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
              </v-card>
            </template>
          </div>
        </v-col>

        <v-col>
          <div class="spacing-playground">
            <template>
              <v-container style="max-width:500px">
                <v-text-field
                  v-model="task"
                  label="Add Task"
                  solo
                  @keydown.enter="create"
                >
                  <v-fade-transition>
                    <v-icon v-if="task" @click="create">add_circle</v-icon>
                  </v-fade-transition>
                </v-text-field>

                <h2 class="display-1 success--text pl-4">
                  Tasks:&nbsp;
                  <v-fade-transition leave-absolute>
                    <span :key="`tasks-${tasks.length}`">{{
                      tasks.length
                    }}</span>
                  </v-fade-transition>
                </h2>

                <v-divider class="mt-4"></v-divider>

                <v-row class="my-1" align="center">
                  <strong class="mx-4 info--text text--darken-2"
                    >Remaining: {{ remainingTasks }}</strong
                  >

                  <v-divider vertical></v-divider>

                  <strong class="mx-4 success--text text--darken-2"
                    >Completed: {{ completedTasks }}</strong
                  >

                  <v-spacer></v-spacer>

                  <v-progress-circular
                    :value="progress"
                    class="mr-2"
                  ></v-progress-circular>
                </v-row>

                <v-divider class="mb-4"></v-divider>

                <v-card v-if="tasks.length > 0">
                  <v-slide-y-transition class="py-0" group tag="v-list">
                    <template v-for="(task, i) in tasks">
                      <v-divider
                        v-if="i !== 0"
                        :key="`${i}-divider`"
                      ></v-divider>

                      <v-list-item :key="`${i}-${task.text}`">
                        <v-list-item-action>
                          <v-checkbox
                            v-model="task.done"
                            :color="(task.done && 'grey') || 'primary'"
                          >
                            <template v-slot:label>
                              <div
                                :class="
                                  (task.done && 'grey--text') || 'primary--text'
                                "
                                class="ml-4"
                                v-text="task.text"
                              ></div>
                            </template>
                          </v-checkbox>
                        </v-list-item-action>

                        <v-spacer></v-spacer>

                        <v-scroll-x-transition>
                          <v-icon v-if="task.done" color="success"
                            >check</v-icon
                          >
                        </v-scroll-x-transition>
                      </v-list-item>
                    </template>
                  </v-slide-y-transition>
                </v-card>
              </v-container>
            </template>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <div class="text-center">
      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false"
            >Close</v-btn
          >
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
document.title = "Inventory | HOME";
export default {
  data: () => ({
    items: [],
    notitems: [],
    title: "HOME",
    type: "month",
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
      { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
      { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
      { text: "Mon, Wed, Fri", value: [1, 3, 5] }
    ],
    value: "",
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1"
    ],
    tasks: [],
    task: null,
    overlay: false,
    notioverlay: false,
    input: {
      username: "",
      password: ""
    },
    snackbar: false,
    text: "",
    timeout: 2000,
    countob: [],
    count: 0
  }),
  computed: {
    completedTasks() {
      return this.tasks.filter(task => task.done).length;
    },
    progress() {
      return (this.completedTasks / this.tasks.length) * 100;
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks;
    }
  },
  mounted: function() {
    this.getitems();
    this.countitems();
  },
  methods: {
    countitems() {
      const baseURI = "http://localhost/vuephp/config.php?action=count";
      this.$http.get(baseURI).then(response => {
        this.countob = response.data.items;
        this.count = parseInt(this.countob[0].count);
      });
    },
    getitems() {
      const baseURI = "http://localhost/vuephp/config.php?action=readDesc";
      this.$http.get(baseURI).then(response => {
        this.items = response.data.items;
      });
    },
    getnotitems() {
      this.notioverlay = true;
      const baseURI = "http://localhost/vuephp/config.php?action=getnoti";
      this.$http.get(baseURI).then(response => {
        this.notitems = response.data.items;
      });
    },
    create() {
      this.tasks.push({
        done: false,
        text: this.task
      });
      this.task = null;
    },
    login() {
      if (this.input.username != "" && this.input.password != "") {
        if (this.input.username == "admin" && this.input.password == "admin") {
          this.overlay = false;
        } else {
          this.text = "Invalid credentials";
          this.snackbar = true;
        }
      } else {
        this.text = "Please fill all the data";
        this.snackbar = true;
      }
    }
  }
};
</script>
