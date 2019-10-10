<template>
  <v-card class="pa-1">
    <v-card-title class="headline">
      {{ title }}
    </v-card-title>
    <v-card-text class="pb-0">
      <div>
        {{ subtitle }}
      </div>
      <v-form v-model="valid" ref="form">
        <v-container class="pb-0">
          <v-row>
            <v-col cols="12" class="pb-0">
              <v-text-field
                label="Name"
                prepend-icon="mdi-account"
                v-model="newPerson.name"
                :rules="[rules.required]"
                validate-on-blur
                outlined
                color="pink lighten-2"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-text-field
                label="Email"
                prepend-icon="mdi-email"
                v-model="newPerson.email"
                type="email"
                :rules="[rules.required, rules.email]"
                validate-on-blur
                outlined
                color="pink lighten-2"
              ></v-text-field>
            </v-col>
            <v-col cols="6" class="py-0">
              <v-text-field
                label="Zip Code"
                prepend-icon="mdi-map-marker"
                v-model="newPerson.zip"
                :rules="[rules.required, rules.zip]"
                validate-on-blur
                outlined
                color="pink lighten-2"
              ></v-text-field>
            </v-col>
            <v-col cols="6" class="py-0">
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
                    :rules="[rules.required]"
                    prepend-icon="mdi-cake-variant"
                    validate-on-blur
                    outlined
                    color="pink lighten-2"
                  />
                </template>
                <v-date-picker
                  ref="picker"
                  no-title
                  :max="new Date().toISOString().substr(0, 10)"
                  v-model="newPerson.birthday"
                  @change="saveDate"
                />
              </v-menu>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn @click="cancel" text color="grey darken-2">Cancel</v-btn>
      <v-btn @click="submit" depressed dark color="pink lighten-2">
        <span v-show="isEditing">Save</span>
        <span v-show="!isEditing">Add</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AddPerson",
  props: ["editing", "createPerson", "savePerson", "cancel"],
  data: () => ({
    datePicker: false,
    newPerson: null,
    valid: true,
    rules: {
      required: value => !!value || "Required",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid email address";
      },
      zip: value => /^\d{5}$/.test(value) || "Invalid zip code"
    }
  }),
  computed: {
    isEditing() {
      return this.editing !== null;
    },
    title() {
      return "🔥 " + (this.isEditing ? "Edit the Burner" : "Who burned you?");
    },
    subtitle() {
      return (this.isEditing ? "Update" : "Keep track of") + " their info so you can eventually get your rightful revenge.";
    }
  },
  created() {
    this.setNewPerson();
  },
  watch: {
    datePicker(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    editing() {
      this.setNewPerson();
      this.$refs.form.resetValidation();
    }
  },
  methods: {
    saveDate(date) {
      this.$refs.menu.save(date);
    },
    submit() {
      if (this.valid) {
        if (this.editing === null) this.createPerson(this.newPerson);
        else this.savePerson(this.newPerson);
        this.setNewPerson();
      } else {
        this.$refs.form.validate();
      }
    },
    setNewPerson() {
      if (this.isEditing) {
        this.newPerson = {
          name: this.editing.name,
          email: this.editing.email,
          zip: this.editing.zip,
          birthday: this.editing.birthday
        };
      } else {
        this.newPerson = {
          name: "",
          email: "",
          zip: "",
          birthday: null
        };
      }
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