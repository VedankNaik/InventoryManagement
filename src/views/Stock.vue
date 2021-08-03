<template>
  <div class="Items">
    <div class="blue darken-4" style="text-align:center; color:white;">
      <h1>STOCKS</h1>
    </div>

    <v-divider></v-divider>

    <div style="padding-left:200px;">
      <v-row>
        <div>
          <v-alert type="success" v-if="successMsg">{{ successMsg }}</v-alert>
          <v-alert type="error" v-if="errorMsg">{{ errorMsg }}</v-alert>
        </div>
      </v-row>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Quantity</th>
              <th class="text-left"></th>
              <th class="text-left"></th>
              <th class="text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.Name">
              <td>{{ item.Name }}</td>
              <td v-if="item.Quantity <= 0" class="red--text">Out of stock</td>
              <td
                v-else-if="item.Quantity > 0 && item.Quantity <= 10"
                class="red--text"
              >
                Few remaining: {{ item.Quantity }}
              </td>
              <td v-else>{{ item.Quantity }}</td>
              <td>
                <template>
                  <v-row justify="center">
                    <v-dialog v-model="adddialog" persistent max-width="600px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          v-bind="attrs"
                          v-on="on"
                          @click="selectitem(item)"
                          >ADD</v-btn
                        >
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">Add to stock</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  name="Name"
                                  v-model="currentitem.Name"
                                  readonly
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  name="Add"
                                  label="Enter Quantity*"
                                  v-model="currentitem.Add"
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
                          <v-btn color="blue darken-1" text @click="addstock"
                            >Add</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                </template>
              </td>
              <td>
                <template>
                  <v-row justify="center">
                    <v-dialog
                      v-model="removedialog"
                      persistent
                      max-width="600px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-if="item.Quantity > 0"
                          color="primary"
                          dark
                          v-bind="attrs"
                          v-on="on"
                          @click="selectitem(item)"
                          >Remove</v-btn
                        >
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">Remove from stock</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  name="Name"
                                  v-model="currentitem.Name"
                                  readonly
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  name="Remove"
                                  label="Enter Quantity*"
                                  v-model="currentitem.Remove"
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
                            @click="removedialog = false"
                            >Close</v-btn
                          >
                          <v-btn color="blue darken-1" text @click="removestock"
                            >Save</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                </template>
              </td>
              <td v-if="item.Quantity <= 10 || item.Quantity <= 0">
                <template>
                  <v-row justify="center">
                    <v-dialog
                      v-model="orderdialog"
                      persistent
                      max-width="600px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-if="item.Quantity > 0"
                          color="primary"
                          dark
                          v-bind="attrs"
                          v-on="on"
                          @click="selectitem(item)"
                          >Order</v-btn
                        >
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">Place order</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  name="Name"
                                  v-model="currentitem.Name"
                                  readonly
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  name="Order"
                                  label="Enter Quantity*"
                                  v-model="currentitem.Order"
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
                            @click="orderdialog = false"
                            >Close</v-btn
                          >
                          <v-btn color="blue darken-1" text @click="orderstock"
                            >Order</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                </template>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
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
document.title = "Inventory | STOCK";
export default {
  data() {
    return {
      adddialog: false,
      removedialog: false,
      orderdialog: false,
      items: [],
      currentitem: {},
      errorMsg: "",
      successMsg: "",
      snackbar: false,
      text: "",
      timeout: 2000,
      testnum: 0
    };
  },
  mounted: function() {
    this.getitems();
  },
  methods: {
    getitems() {
      const baseURI = "http://localhost/vuephp/config3.php?action=read";
      this.$http.get(baseURI).then(response => {
        this.items = response.data.items;
      });
    },
    addstock() {
      if (this.currentitem.Add != "") {
        this.testnum = this.currentitem.Add;
        if (isNaN(this.testnum) || this.testnum <= 0) {
          this.text = "Price should be a positive number";
          this.snackbar = true;
        } else {
          var formData = this.toFormData(this.currentitem);
          const baseURI = "http://localhost/vuephp/config3.php?action=add";
          this.$http.post(baseURI, formData).then(response => {
            this.currentitem = {};
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
        this.text = "Please enter price";
        this.snackbar = true;
      }
    },
    removestock() {
      if (this.currentitem.Remove != "") {
        this.testnum = this.currentitem.Remove;
        if (isNaN(this.testnum) || this.testnum <= 0) {
          this.text = "Price should be a positive number";
          this.snackbar = true;
        } else {
          var formData = this.toFormData(this.currentitem);
          const baseURI = "http://localhost/vuephp/config3.php?action=remove";
          this.$http.post(baseURI, formData).then(response => {
            this.currentitem = {};
            if (response.data.error) {
              this.errorMsg = response.data.message;
            } else {
              this.getitems();
              this.successMsg = response.data.message;
              this.removedialog = false;
            }
          });
        }
      } else {
        this.text = "Please enter price";
        this.snackbar = true;
      }
    },
    orderstock() {
      if (this.currentitem.Order != "") {
        this.testnum = this.currentitem.Order;
        if (isNaN(this.testnum) || this.testnum <= 0) {
          this.text = "Quantity should be a positive number";
          this.snackbar = true;
        } else {
          var formData = this.toFormData(this.currentitem);
          const baseURI = "http://localhost/vuephp/config3.php?action=order";
          this.$http.post(baseURI, formData).then(response => {
            this.currentitem = {};
            if (response.data.error) {
              this.errorMsg = response.data.message;
            } else {
              this.getitems();
              this.successMsg = response.data.message;
              this.orderdialog = false;
            }
          });
        }
      } else {
        this.text = "Please enter quantity";
        this.snackbar = true;
      }
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
    }
  }
};
</script>
