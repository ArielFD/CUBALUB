<template>
  <q-page>
    <h5>Reset Password</h5>
    <q-input
      class="q-mt-md"
      v-model="data.newPass"
      prefix="New Password:"
      filled
      :type="data.isPwd ? 'password' : 'text'"
    >
      <template v-slot:append>
        <q-icon
          :name="data.isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="data.isPwd = !data.isPwd"
        />
      </template>
    </q-input>
    <q-input
      class="q-mt-md"
      v-model="data.confirmationPass"
      prefix="Confirm Password:"
      filled
      :type="data.isPwd ? 'password' : 'text'"
    >
      <template v-slot:append>
        <q-icon
          :name="data.isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="data.isPwd = !data.isPwd"
        />
      </template>
    </q-input>
    <div class="row q-pa-md">
      <q-btn
        color="primary"
        label="Aceptar"
        class="col q-ma-md"
        @click="resetPass"
      />
      <q-btn color="primary" label="Cancelar" class="col q-ma-md" to="/" />
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, onUpdated, onUnmounted } from "vue";
import { ref, reactive,inject } from "vue";
import { api } from 'boot/axios.js'
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { useQuasar } from "quasar";

    const router = useRouter();
    const route = useRoute();
    const store = inject("store");
    const $q = useQuasar();

    let data = reactive({
      isPwd: true,
      ph: "",
      newPass: "",
      confirmationPass: "",
    });

    async function resetPass() {
      api
        .post("/auth/reset-password", {
          code: route.query.code,
          password: data.newPass,
          passwordConfirmation: data.confirmationPass,
        })
        .then((response) => {
          console.log(response);
          store.state.alerts[1].message="Password Reiniciado!"
          $q.notify(store.state.alerts[1])
          router.push("/login");
        })
        .catch((error) => {
          console.log("An error occurred:", error.response);
          store.state.alerts[1].message="Error con Reinicio de contrase??a!"
          $q.notify(store.state.alerts[1])
        });
    }
</script>

<style lang="sass">
</style>