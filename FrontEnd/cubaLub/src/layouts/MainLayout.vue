<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="q-pa-sm">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          GUIA DE AUTOCONTROL A CAPITAL HUMANO 2022
        </q-toolbar-title>
        
        <q-btn flat  label="Login" :to="{ name: 'login' }" v-if="store.state.jwt==''"/>
        <q-btn flat  label="Logout" @click="store.state.jwt=''" v-else/>
      </q-toolbar>
    </q-header>


    <q-page-container class="q-ma-md">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>

import { defineComponent, ref, reactive, computed, watch } from "vue";
import { onMounted, onUpdated, onUnmounted, inject } from "vue";
import axios from "axios";
import { api } from "boot/axios.js";
import { useRouter, useRoute } from "vue-router";

  const store = inject("store");

</script>
