<template>
  <v-app>
    <people-table :people="people"></people-table>
    <v-dialog width="500">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">open</v-btn>
      </template>
      <add-person></add-person>
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
        dob: "2/1/97"
      }
    ],
    showAddPerson: false,
    open: false
  }),
  methods: {}
};
</script>
