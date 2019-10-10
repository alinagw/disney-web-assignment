<template>
  <v-app id="app">
    <v-container id="content" class="pa-8">

      <!-- Title -->
      <v-row justify="center">
        <v-col class="text-center">
          <h1 id="title" class="mb-5">🔥 Burn Book 🔥</h1>
          <p id="subtitle" class="body-2 mb-2 grey--text text--lighten-3">
            Let's face it. You've been burned in life. You've been backstabbed. You've made some enemies. Now it's time for you to take note and take names, because one day you'll get your revenge. Save their info right here in your burn book so you never forget. You can add people, edit them, or even remove them from your burn book if you've had a change of heart. What you do is up to you, but don't let yourself get burned again.
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="mb-5" elevation="8">

            <!-- People Table -->
            <people-table
              :people="people"
              :edit-person="editPerson"
              :delete-person="deletePerson"
              :page="tablePage"
              @page-count="tablePageCount = $event"
            ></people-table>

            <!-- Add Person Dialog and Activator Button -->
            <v-dialog width="500" v-model="showAddPerson" persistent>
              <template v-slot:activator="{ on }">
                <v-btn id="add-person-btn" v-on="on" block text large color="pink darken-2">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <add-person
                :editing="editing"
                :create-person="addPerson"
                :update-person="updatePerson"
                :cancel="cancel"
                :email-exists="emailExists"
                :set-msg="setMsg"
              ></add-person>
            </v-dialog>
          </v-card>

          <!-- Pagination -->
          <v-pagination
            class="pagination"
            v-if="tablePageCount"
            v-model="tablePage"
            :length="tablePageCount"
            circle
            color="pink darken-4"
          />
        </v-col>
      </v-row>
    </v-container>

    <!-- Messages -->
    <v-snackbar v-model="showMsg" :timeout="4000">{{ msg }}</v-snackbar>
  </v-app>
</template>

<script>
const axios = require("axios");
const API_URL = "http://localhost:3000/api/people";

// import components
import PeopleTable from "./components/PeopleTable";
import AddPerson from "./components/AddPerson";

export default {
  name: "App",
  components: {
    PeopleTable,
    AddPerson
  },
  data: () => ({
    people: [],
    editing: null,
    showAddPerson: false,
    tablePage: 1,
    tablePageCount: 0,
    msg: "",
    showMsg: false
  }),

  // fetch all people stored in database on creation of Vue instance
  created: function() {
    axios.get(API_URL)
      .then((res) => this.people = res.data)
      .catch((error) => {
        console.log(error);
        this.setMsg("Error fetching people");
      });
  },

  methods: {
    addPerson(person) {
      axios.post(API_URL, person)
        .then((res) => {
          this.people.push(res.data);
          this.showAddPerson = false;
          this.editing = null;
          this.setMsg("🔥 Person added to burn book");
        })
        .catch((error) => {
          console.log(error);
          this.setMsg("Error adding person");
        });
    },
    deletePerson(person) {
      if (confirm("Are you sure you want to delete this person?")) {
        axios.delete(`${API_URL}/${person.id}`)
          .then(() => {
            this.people.splice(this.people.indexOf(person), 1);
            this.setMsg("🗑️ Person deleted from burn book");
          })
          .catch((error) => {
            console.log(error);
            this.setMsg("Error deleting person");
          });
      }
    },
    updatePerson(newPerson) {
      axios.put(`${API_URL}/${this.editing.id}`, newPerson)
        .then((res) => {
          this.people.splice(this.people.indexOf(this.editing), 1, res.data);
          this.editing = null;
          this.showAddPerson = false;
          this.setMsg("😎 Changes to person saved to burn book");
        })
        .catch((error) => {
          console.log(error);
          this.setMsg("Error updating person");
        });
    },
    editPerson(person) {
      this.editing = person;
      this.showAddPerson = true;
    },
    cancel() {
      this.editing = null;
      this.showAddPerson = false;
    },
    emailExists(email) {
      for (var person in this.people) {
        if (this.people[person].hasOwnProperty("email")) {
          if (this.people[person].email === email) return true;
        }
      }
      return false;
    },
    setMsg(msg) {
      this.msg = msg;
      this.showMsg = true;
    }
  }
};
</script>

<style scoped>
#app {
  background: #b24592;
  background: -webkit-linear-gradient(#f15f79,#b24592);
  background: linear-gradient(#f15f79,#b24592);
}

#content {
  height: 100%;
}

#add-person-btn {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}

#title {
  font-size: 56px;
  font-family: "Homemade Apple";
  letter-spacing: 2px;
  color: white;
}

.v-pagination::v-deep .v-pagination__navigation .v-icon {
  font-size: 24px;
}
</style>
