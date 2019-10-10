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
              id="people-table"
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
                :save-person="saveEditPerson"
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
    <v-snackbar v-model="showMsg" :timeout="4000">
      {{ msg }}
    </v-snackbar>
  </v-app>
</template>




<script>
import PeopleTable from "./components/PeopleTable";
import AddPerson from "./components/AddPerson";

export default {
  name: "App",
  components: {
    PeopleTable,
    AddPerson
  },
  data: () => ({
    people: [
      {
        name: "Carlos",
        email: "carlos@gmail.com",
        zip: 27705,
        birthday: "1997-02-01"
      }
    ],
    editing: null,
    showAddPerson: false,
    tablePage: 1,
    tablePageCount: 0,
    msg: "",
    showMsg: false
  }),
  methods: {
    addPerson(person) {
      this.people.push(person);
      this.showAddPerson = false;
      this.setMsg("🔥 Person added to burn book");
    },
    deletePerson(person) {
      this.people.splice(this.people.indexOf(person), 1);
      this.setMsg("🗑️ Person deleted from burn book");
    },
    saveEditPerson(newPerson) {
      this.people.splice(this.people.indexOf(this.editing), 1, newPerson);
      this.editing = null;
      this.showAddPerson = false;
      this.setMsg("💁 Changes to person saved to burn book");
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
        var p = this.people[person];
        if (p.hasOwnProperty("email")) {
          if (p.email === email) {
            return true;
          }
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
  background: #b24592; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    #f15f79,
    #b24592
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    #f15f79,
    #b24592
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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
