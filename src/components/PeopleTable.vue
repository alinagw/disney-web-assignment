<template>
<v-data-table :headers="headers" :items="people">
  <template v-slot:item.action="{ item }">
    <v-icon class="mr-3">mdi-pencil</v-icon>
    <v-icon>mdi-delete</v-icon>
  </template>
  <template v-slot:footer="{ data }">
    <v-btn block text large>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </template>
</v-data-table>
</template>

<script>
export default {
  name: 'PeopleTable',
  props: [ "people", "editPerson", "deletePerson" ],
  data: () => ({
    headers: [
      { text: "Name", value: "name" },
      { text: "Email", value: "email" },
      { text: "Zip Code", value: "zip" },
      { text: "Birthday", value: "dob" },
      { text: "Actions", value: "action", sortable: false }
    ]
  })
};
</script>
