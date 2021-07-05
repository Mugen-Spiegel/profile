<template>
  <v-app>
    <v-main>
      <ProfileForm/>
    </v-main>
  </v-app>
</template>

<script>
import ProfileForm from './components/ProfileForm';

export default {
  name: 'App',

  components: {
    ProfileForm,
  },

  data: () => ({
    //
  }),
};
</script>
