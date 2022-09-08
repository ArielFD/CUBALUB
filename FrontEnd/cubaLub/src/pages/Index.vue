<template>
  <div>
    <q-btn
      class="q-pa-sm q-ma-md float-right"
      color="primary"
      label="Crear nueva seccion"
      @click="data.cardCrearSesion = true"
    />
    <q-dialog v-model="data.cardCrearSesion">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Crear Seccion</div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="data.titleSeccion"
            label="Nombre de la Seccion"
            class="my-input"
          />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            color="primary"
            label="Crear"
            @click="crearSeccion()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="q-pa-md" v-for="sesion in data.sesiones" :key="sesion.index">
      <h6>
        {{ sesion.Title }}
        <q-btn
          flat
          color="primary"
          icon="edit"
          size="sm"
          @click="editSesions(sesion)"
        />
        <q-dialog v-model="data.cardEditSesion">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-h6">Editar Seccion</div>
            </q-card-section>

            <q-card-section>
              <q-input
                v-model="data.editTitleSeccion"
                label="Nombre de la Seccion"
                class="my-input"
              />
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn
                flat
                color="primary"
                label="Crear Opcion"
                @click="data.cardCrearOpcion = true"
              />

              <q-btn
                v-close-popup
                flat
                color="primary"
                label="Edit"
                @click="EditSesion()"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="data.cardCrearOpcion">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-h6">Crear Opcion</div>
            </q-card-section>

            <q-card-section>
              <q-input
                v-model="data.titleOpcion"
                label="Nombre de la Opcion"
                class="my-input"
              />
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn
                v-close-popup
                flat
                color="primary"
                label="Crear"
                @click="crearOpcion(sesion.id)"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-btn
          flat
          color="primary"
          icon="delete"
          size="sm"
          @click="deletSesion(sesion.id)"
        />
      </h6>
      <q-list
        bordered
        separator
        v-for="opcion in sesion.Opcions"
        :key="opcion.index"
        class="row"
      >
        <q-item
          clickable
          v-ripple
          :href="opcion.Url"
          target="_blank"
          v-if="opcion.Title != null"
          class="col-10"
        >
          <q-item-section>
            {{ opcion.Title }}
          </q-item-section>
        </q-item>
        <q-btn
          flat
          color="primary"
          icon="edit"
          size="sm"
          @click="editOpcions(opcion)"
          v-if="opcion.Title != null"
          class="col-1"
        />
        <q-dialog v-model="data.cardEditOpcion">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-h6">Editar Opcion</div>
            </q-card-section>

            <q-card-section>
              <q-input
                v-model="data.editTitleOpcion"
                label="Nombre de la Opcion"
                class="my-input"
              />
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn
                v-close-popup
                flat
                color="primary"
                label="Edit"
                @click="EditOpcion()"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-btn
          flat
          color="primary"
          icon="delete"
          size="sm"
          @click="deletOpcion(opcion.id)"
          v-if="opcion.Title != null"
          class="col-1"
        />
      </q-list>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { api } from "boot/axios.js";
import { reactive, onMounted } from "vue";

let data = reactive({
  sesiones: [],
  host: "http://localhost:1337",
  titleSeccion: "",
  titleOpcion: "",

  editTitleSeccion: "",
  idSesion: "",
  cardEditSesion: false,

  cardCrearSesion: false,
  cardCrearOpcion: false,

  editTitleOpcion: "",
  editUrlOpcion: "",
  idOpcion: "",
  cardEditOpcion: false,
});

onMounted(() => {
  getSesions();
});

function editSesions(params) {
  (data.editTitleSeccion = params.Title),
    (data.idSesion = params.id),
    (data.cardEditSesion = true);
}

async function EditSesion(params) {
  await api
    .put(`/sesions/${data.idSesion}`, {
      // headers: {
      //   Authorization: "Bearer " + store.state.jwt,
      // },
      data: {
        Titulo: data.editTitleSeccion,
      },
    })
    .then(function (response) {
      console.log(response);
      getSesions();
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function deletSesion(params) {
  await api
    .delete(`/sesions/${params}`, {
      // headers: {
      //   Authorization: "Bearer " + store.state.jwt,
      // },
    })
    .then((response) => {
      getSesions();
    })
    .catch((error) => {
      console.log("An error occurred:", error.response);
    });
}

function editOpcions(params) {
  (data.editTitleOpcion = params.Title),
    (data.idOpcion = params.id),
    (data.cardEditOpcion = true);
}

async function EditOpcion(params) {
  await api
    .put(`/opcions/${data.idOpcion}`, {
      // headers: {
      //   Authorization: "Bearer " + store.state.jwt,
      // },
      data: {
        Titulo: data.editTitleOpcion,
      },
    })
    .then(function (response) {
      console.log(response);
      getSesions();
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function deletOpcion(params) {
  await api
    .delete(`/opcions/${params}`, {
      // headers: {
      //   Authorization: "Bearer " + store.state.jwt,
      // },
    })
    .then((response) => {
      getSesions();
    })
    .catch((error) => {
      console.log("An error occurred:", error.response);
    });
}

async function crearSeccion(params) {
  await api
    .post("/sesions", {
      data: {
        Titulo: data.titleSeccion,
      },
      // headers: {
      //   Authorization: "Bearer " + store.state.jwt,
      // },
    })
    .then((response) => {
      data.titleSeccion=""
      getSesions();
    })
    .catch((error) => {
      console.log("An error occurred:", error.response);
    });
}

async function crearOpcion(params) {
  await api
    .post("/opcions", {
      data: {
        Titulo: data.titleOpcion,
        sesion:{
           id:params
        }
      },
      // headers: {
      //   Authorization: "Bearer " + store.state.jwt,
      // },
    })
    .then((response) => {
      data.titleOpcion=""
      getSesions();
    })
    .catch((error) => {
      console.log("An error occurred:", error.response);
    });
}

async function getSesions() {
  data.sesiones = [];
  await api
    .get("/sesions?populate[opcions][populate][0]=Archivo")
    .then((response) => {
      console.log(response);
      for (let i = 0; i < response.data.data.length; i++) {
        data.sesiones.push({
          id: response.data.data[i].id,
          Title: response.data.data[i].attributes.Titulo,
          Opcions: [],
        });
        for (
          let j = 0;
          j < response.data.data[i].attributes.opcions.data.length;
          j++
        ) {
          if (
            response.data.data[i].attributes.opcions.data[j].attributes.Archivo
              .data != null
          ) {
            data.sesiones[i].Opcions.push({
              id: response.data.data[i].attributes.opcions.data[j].id,
              Title:
                response.data.data[i].attributes.opcions.data[j].attributes
                  .Titulo,
              Url: `${data.host}${response.data.data[i].attributes.opcions.data[j].attributes.Archivo.data[0].attributes.url}`,
            });
          } else {
            data.sesiones[i].Opcions.push({
              id: response.data.data[i].attributes.opcions.data[j].id,
              Title:
                response.data.data[i].attributes.opcions.data[j].attributes
                  .Titulo,
            });
          }
        }
      }
      console.log("dataSesiones", data.sesiones);
    })
    .catch((error) => {
      console.log("An error occurred:", error.response);
    });
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 500px

.my-input
  width: 100%
  max-width: 200px
</style>