<template>
<v-dialog>
  <v-card>
    hey
  </v-card>
</v-dialog>
</template>

<script>
export default {
  name: 'Add Person',
  props: ["person", "editing", "createPerson", "saveEdit"],
  data: () => ({
    newPerson: {
        name: "",
        email: "",
        zip: "",
        dob: ""
      }
  }),
};
</script>
