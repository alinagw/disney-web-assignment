<template>
  <v-app>
    <people-table :people="people" :edit-person="editPerson" :delete-person="deletePerson"></people-table>
    <v-dialog width="500" v-model="showAddPerson" persistent>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">open</v-btn>
      </template>
      <add-person :editing="editing" :create-person="addPerson" :save-person="saveEditPerson" :cancel="cancel"></add-person>
    </v-dialog>
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
    showAddPerson: false
  }),
  methods: {
    addPerson(person) {
      this.people.push(person);
      this.showAddPerson = false;
    },
    deletePerson(person) {
      this.people.splice(this.people.indexOf(person), 1);
    },
    saveEditPerson(newPerson) {
      this.people.splice(this.people.indexOf(this.editing), 1, newPerson);
      this.editing = null;
      this.showAddPerson = false;
    },
    editPerson(person) {
      this.editing = person;
      this.showAddPerson = true;
    },
    cancel() {
      this.editing = null;
      this.showAddPerson = false;
    }
  }
};
</script>
