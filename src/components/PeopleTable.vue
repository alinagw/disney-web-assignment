<template>
<v-data-table :headers="headers" :items="people" :page.sync="page" hide-default-footer v-on="$listeners">
  <template v-slot:item.birthday="{ item }">
    {{ formatDate(item.birthday) }}
  </template>
  <template v-slot:item.action="{ item }">
    <v-icon class="action-btn mr-3" @click="editPerson(item)">mdi-pencil</v-icon>
    <v-icon class="action-btn" @click="deletePerson(item)">mdi-delete</v-icon>
  </template>
  <template v-slot:footer>
    <v-divider />
  </template>
  <template v-slot:no-data>
    <div class="grey--text text--darken-3">Looks like no one has burned you yet! Time to make some enemies. 😈</div>
  </template>
</v-data-table>
</template>

<script>
export default {
  name: 'PeopleTable',
  props: [ "people", "editPerson", "deletePerson", "page" ],
  data: () => ({
    headers: [
      { text: "Name", value: "name" },
      { text: "Email", value: "email" },
      { text: "Zip Code", value: "zip" },
      { text: "Birthday", value: "birthday" },
      { text: "Actions", value: "action", sortable: false, width: 96 }
    ]
  }),
  methods: {
    formatDate(date) {
      if (!date) return "";
      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    }
  }
};
</script>

<style scoped>
.action-btn:hover {
  color: #F06292;
}

.no-data {
  color: #212121;
}
</style>
