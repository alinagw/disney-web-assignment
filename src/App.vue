<template>
  <v-app>
    <people-table :people="people"></people-table>
  </v-app>
</template>

<script>
import PeopleTable from './components/PeopleTable';
// import AddPerson from './components/AddPerson';

export default {
  name: 'App',
  components: {
    PeopleTable
    // AddPerson
  },
  data: () => ({
    people: [
      {
        name: "Carlos",
        email: "carlos@gmail.com",
        zip: 27705,
        dob: "2/1/97"
      }
    ]
  }),
};
</script>
