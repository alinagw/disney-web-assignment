<template>
  <v-card>
    <v-card-title>
      <!-- <span v-show="editing">Edit</span>
      <span v-show="!editing">Add New</span> -->
      Person
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Name" prepend-icon="mdi-account" v-model="newPerson.name"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Email" prepend-icon="mdi-email" v-model="newPerson.email"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Zip Code" prepend-icon="mdi-map-marker" v-model="newPerson.zip"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-menu ref="menu" v-model="datePicker" :close-on-content-click="false" offset-y>
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="Birthday"
                  v-on="on"
                  placeholder="MM/DD/YYYY"
                  v-model="newPerson.birthday"
                  autocomplete="false"
                  type="date"
                  required
                  prepend-icon="mdi-cake-variant"
                />
              </template>
              <v-date-picker
                ref="picker"
                no-title
                :max="new Date().toISOString().substr(0, 10)"
                v-model="newPerson.birthday"
                @change="save"
              />
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn>Cancel</v-btn>
      <v-btn>Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AddPerson",
  props: ["person", "editing", "createPerson", "savePerson"],
  data: () => ({
    datePicker: false,
    newPerson: {
      name: "",
      email: "",
      zip: "",
      birthday: null
    }
  }),
  watch: {
    datePicker(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    }
  }
};
</script>

<style>
input::-webkit-calendar-picker-indicator,
input::-webkit-inner-spin-button {
  display: none;
}
</style>