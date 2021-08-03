<template>
  <div id="myapp" class="Items">
    <div class="blue darken-4" style="text-align:center; color:white;">
      <h1>ITEMS</h1>
    </div>

    <div style="padding-left:180px; margin-right:20px;">
      <template>
        <v-container fluid>
          <v-data-iterator
            :items="items"
            :items-per-page.sync="itemsPerPage"
            :page="page"
            :search="search"
            :sort-by="sortBy"
            :sort-desc="sortDesc"
            hide-default-footer
          >
            <template v-slot:header>
              <v-toolbar dark color="blue darken-1" class="mb-1 blue darken-2">
                <v-text-field
                  v-model="search"
                  clearable
                  flat
                  solo-inverted
                  hide-details
                  prepend-inner-icon="search"
                  label="Search"
                ></v-text-field>
                <template v-if="$vuetify.breakpoint.mdAndUp">
                  <v-spacer></v-spacer>
                  <v-select
                    v-model="sortBy"
                    flat
                    solo-inverted
                    hide-details
                    :items="keys"
                    prepend-inner-icon="search"
                    label="Sort by"
                  ></v-select>
                  <v-spacer></v-spacer>
                  <v-btn-toggle v-model="sortDesc" mandatory>
                    <v-btn large depressed color="blue" :value="false">
                      <v-icon>mdi-arrow-up</v-icon>
                    </v-btn>
                    <v-btn large depressed color="blue" :value="true">
                      <v-icon>mdi-arrow-down</v-icon>
                    </v-btn>
                  </v-btn-toggle>
                  <v-spacer></v-spacer>

                  <v-row justify="center">
                    <v-dialog
                      transition="scale-transition"
                      v-model="adddialog"
                      persistent
                      max-width="600px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark v-bind="attrs" v-on="on"
                          >Add Item</v-btn
                        >
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">Item Details</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  name="Brand"
                                  label="Brand*"
                                  required
                                  v-model="newitem.Brand"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  name="Name"
                                  label="Name*"
                                  required
                                  v-model="newitem.Name"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  name="Price"
                                  label="Price*"
                                  required
                                  v-model="newitem.Price"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                          <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="adddialog = false"
                            >Close</v-btn
                          >
                          <v-btn color="blue darken-1" text @click="additems"
                            >Add</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                </template>
              </v-toolbar>
            </template>

            <template v-slot:default="props">
              <v-row>
                <div>
                  <v-alert type="success" v-if="successMsg">{{
                    successMsg
                  }}</v-alert>
                  <v-alert type="error" v-if="errorMsg">{{ errorMsg }}</v-alert>
                </div>
              </v-row>
              <v-row>
                <v-col
                  v-for="item in props.items"
                  :key="item.Name"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                >
                  <v-card>
                    <v-card-title class="subheading font-weight-bold">{{
                      item.Name
                    }}</v-card-title>
                    <div>
                      <v-row style="padding-left:20px;">
                        <v-col cols="12" sm="6" md="4">
                          <div class="my-2">
                            <v-row justify="center">
                              <v-dialog
                                transition="scale-transition"
                                v-model="editdialog"
                                persistent
                                max-width="600px"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn
                                    depressed
                                    small
                                    color="green"
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="selectitem(item)"
                                    >Edit</v-btn
                                  >
                                </template>
                                <v-card>
                                  <v-card-title>
                                    <span class="headline">Edit Details</span>
                                  </v-card-title>
                                  <v-card-text>
                                    <v-container>
                                      <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                          <v-text-field
                                            name="Brand"
                                            v-model="currentitem.Brand"
                                            readonly
                                          ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                          <v-text-field
                                            name="Name"
                                            v-model="currentitem.Name"
                                            readonly
                                          ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                          <v-text-field
                                            name="Price"
                                            v-model="currentitem.Price"
                                          ></v-text-field>
                                        </v-col>
                                      </v-row>
                                    </v-container>
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      color="blue darken-1"
                                      text
                                      @click="editdialog = false"
                                      >Close</v-btn
                                    >
                                    <v-btn
                                      color="blue darken-1"
                                      text
                                      @click="updateitems"
                                      >Save</v-btn
                                    >
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </v-row>
                          </div>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <div class="my-2">
                            <v-row justify="center">
                              <v-dialog
                                v-model="deletedialog"
                                persistent
                                max-width="290"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn
                                    depressed
                                    small
                                    color="error"
                                    @click="selectitem(item)"
                                    v-bind="attrs"
                                    v-on="on"
                                    >Remove</v-btn
                                  >
                                </template>
                                <v-card>
                                  <v-card-title class="headline"
                                    >Confirm</v-card-title
                                  >
                                  <v-card-text
                                    name="Name"
                                    v-model="currentitem.Name"
                                    >Are you sure you want to remove '{{
                                      currentitem.Name
                                    }}'?</v-card-text
                                  >
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      color="green darken-1"
                                      text
                                      @click="deletedialog = false"
                                      >NO</v-btn
                                    >
                                    <v-btn
                                      color="green darken-1"
                                      text
                                      @click="deleteitems"
                                      >YES</v-btn
                                    >
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </v-row>
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                    <v-divider></v-divider>

                    <v-list dense>
                      <v-list-item
                        v-for="(key, index) in filteredKeys"
                        :key="index"
                      >
                        <v-list-item-content
                          :class="{ 'blue--text': sortBy === key }"
                          >{{ key }}:</v-list-item-content
                        >
                        <v-list-item-content
                          class="align-end"
                          :class="{ 'blue--text': sortBy === key }"
                          >{{ item[key] }}</v-list-item-content
                        >
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
              </v-row>
            </template>

            <template v-slot:footer>
              <v-row class="mt-2" align="center" justify="center">
                <span class="grey--text">Items per page</span>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      dark
                      text
                      color="primary"
                      class="ml-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      {{ itemsPerPage }}
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(number, index) in itemsPerPageArray"
                      :key="index"
                      @click="updateItemsPerPage(number)"
                    >
                      <v-list-item-title>{{ number }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>

                <v-spacer></v-spacer>

                <span class="mr-4 grey--text"
                  >Page {{ page }} of {{ numberOfPages }}</span
                >
                <v-btn
                  fab
                  dark
                  color="blue darken-3"
                  class="mr-1"
                  @click="formerPage"
                >
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn
                  fab
                  dark
                  color="blue darken-3"
                  class="ml-1"
                  @click="nextPage"
                >
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-row>
            </template>
          </v-data-iterator>
        </v-container>
      </template>
    </div>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
  </div>
</template>

<script>
document.title = "Inventory | ITEMS";
import axios from "axios";

export default {
  data() {
    return {
      editlink: "",
      deletelink: "",
      users: [],
      items: [],
      newitem: { Brand: "", Name: "", Price: "" },
      currentitem: {},
      adddialog: false,
      editdialog: false,
      deletedialog: false,
      errorMsg: "",
      successMsg: "",
      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "name",
      keys: ["Name", "Brand", "Price"],
      snackbar: false,
      text: "",
      timeout: 2000,
      testnum: 0
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter(key => key !== `Name`);
    }
  },
  mounted: function() {
    this.getitems();
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    fetchUsers() {
      const baseURI = "https://jsonplaceholder.typicode.com/users";
      this.$http.get(baseURI).then(result => {
        this.users = result.data;
      });
    },
    getitems() {
      const baseURI = "http://localhost/vuephp/config.php?action=read";
      this.$http.get(baseURI).then(response => {
        this.items = response.data.items;
      });
    },
    additems() {
      if (
        this.newitem.Name != "" &&
        this.newitem.Brand != "" &&
        this.newitem.Price != ""
      ) {
        this.testnum = this.newitem.Price;
        if (isNaN(this.testnum) || this.testnum <= 0) {
          this.text = "Price should be a positive number";
          this.snackbar = true;
        } else {
          var formData = this.toFormData(this.newitem);
          const baseURI = "http://localhost/vuephp/config.php?action=create";
          this.$http.post(baseURI, formData).then(response => {
            this.newitem = { Brand: "", Name: "", Price: "" };
            if (response.data.error) {
              this.errorMsg = response.data.message;
            } else {
              this.getitems();
              this.successMsg = response.data.message;
              this.adddialog = false;
            }
          });
        }
      } else {
        this.text = "Please fill all the fields";
        this.snackbar = true;
      }
    },
    updateitems() {
      if (this.currentitem.Price != "") {
        this.testnum = this.currentitem.Price;
        if (isNaN(this.testnum) || this.testnum <= 0) {
          this.text = "Price should be a positive number";
          this.snackbar = true;
        } else {
          var formData = this.toFormData(this.currentitem);
          const baseURI = "http://localhost/vuephp/config.php?action=update";
          this.$http.post(baseURI, formData).then(response => {
            this.currentitem = {};
            if (response.data.error) {
              this.errorMsg = response.data.message;
            } else {
              this.getitems();
              this.successMsg = response.data.message;
              this.editdialog = false;
            }
          });
        }
      } else {
        this.text = "Please enter price";
        this.snackbar = true;
      }
    },
    deleteitems() {
      var formData = this.toFormData(this.currentitem);
      const baseURI = "http://localhost/vuephp/config.php?action=delete";
      this.$http.post(baseURI, formData).then(response => {
        this.currentitem = {};
        if (response.data.error) {
          this.errorMsg = response.data.message;
        } else {
          this.getitems();
          this.successMsg = response.data.message;
          this.deletedialog = false;
        }
      });
    },
    toFormData(obj) {
      var fd = new FormData();
      for (var i in obj) {
        fd.append(i, obj[i]);
      }
      return fd;
    },
    selectitem(item) {
      this.currentitem = item;
    },
    clearMsg() {
      this.errorMsg = "";
      this.successMsg = "";
    },

    getitems2() {
      axios
        .get("http://localhost/vuephp/config.php?action=read")
        .then(function(response) {
          if (response.data.error) {
            console.log(response.data);
          } else {
            this.items = response.data.items;
          }
        });
    }
  }
};
</script>
