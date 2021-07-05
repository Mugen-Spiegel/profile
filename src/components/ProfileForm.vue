<template>
  <div>
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="form_data.first_name"
      :counter="10"
      :rules="name_rules"
      label="First Name"
      required
      autofocus
    ></v-text-field>

    <v-text-field
      v-model="form_data.last_name"
      :counter="10"
      :rules="name_rules"
      label="Last Name"
      required
    ></v-text-field>

    <v-text-field
          type="number" 
          v-model="form_data.phoneNumber"
          :counter="7"
          :error-messages="errors"
          label="Phone Number"
          required
          :rules="phone_number_rules"
    ></v-text-field>

    <v-text-field
      v-model="form_data.email"
      :rules="email_rules"
      label="E-mail"
      required
    ></v-text-field>


    <v-radio-group v-model="form_data.group">
      <v-radio
        v-for="n in group_item"
        :key="n"
        :label="`${n}`"
        :value="n"
      ></v-radio>
    </v-radio-group>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      v-on:click="submit()"
    >
      Save
    </v-btn>
  </v-form>
    <v-card-title>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
    ></v-text-field>
      <v-spacer></v-spacer>
      <v-row class="light--text">
         <v-checkbox v-model="search_group"
          v-for="n in group_item"
          :key="n"
          :label="`${n}`"
          :value="n"
        ></v-checkbox>
        </v-row>
    </v-card-title>
     
    <v-data-table
      :search="search"
      :headers="headers"
      :items="rows"
      :items-per-page="5"
      class="elevation-1"
    >
    </v-data-table>
    
  </div>
  
</template>

<script>
import { mapMutations,mapGetters } from 'vuex'
  export default {
    data: () => ({
      search: '',
      search_group: [],
      
      valid: true,
      form_data: {
        first_name: '',
        last_name: '',
        phone_number: '',
        group: '',
      },
      
      phone_number_rules: [
        v => !!v || 'Required',
        v => (v && v.length >= 7 ) || 'Input must be greater than 7 characters',
      ],
      name_rules: [
        v => !!v || 'Required',
        v => (v && v.length <= 10) || 'NamInpute must be less than 10 characters',
      ],
      email: '',
      email_rules: [
        v => !!v || 'Required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      group_item: [
        'Family',
        'Friend',
        'Coworker',
      ],
      checkbox: false,
    }),

    methods: {
      submit () {
        if (!this.unique(`${this.form_data.first_name} ${this.form_data.last_name}`)) {
          this.addRows({
          full_name: `${this.form_data.first_name} ${this.form_data.last_name}`,
          email: `${this.form_data.email}`,
          group: `${this.form_data.group}`,
          })
        } else {
          alert("Full name should be unique")
        }
        console.log(this.rows)
        return true
      },
      validate () {
        this.$refs.form.validate()
      },
      ...mapMutations([
        'addRows',
      ]),
    },
    computed: {
      ...mapGetters([
      'getRows',
      'unique',
      'rows',
      ]),
      headers() {
          return [
            {
            text: 'Full Name',
            align: 'start',
            sortable: false,
            value: 'full_name',
            filterable: false,
            },
            { text: 'Email', value: 'email' },
            { 
              text: 'Group',
              value: 'group',
              filter: value => {
                if (!this.search_group) return true
                if (this.search_group.length == 0) return true
                return this.search_group.includes(value)  
              },
            }
          ]
        },
    }

  }
</script>