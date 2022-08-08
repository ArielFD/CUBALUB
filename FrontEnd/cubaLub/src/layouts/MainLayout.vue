<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="q-pa-sm">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          GUIA DE AUTOCONTROL A CAPITAL HUMANO 2022
        </q-toolbar-title>
      </q-toolbar>
    </q-header>


    <q-page-container class="q-ma-md">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

import { defineComponent, ref, reactive, computed, watch } from "vue";
import { onMounted, onUpdated, onUnmounted, inject } from "vue";
import axios from "axios";
import { api } from "boot/axios.js";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {

    return {
    };
  },
});
</script>
