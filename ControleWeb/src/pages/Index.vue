<template>
  <div :style="styleDivPrincipal">
    <h3 style="text-align: center" class="q-ma-xl"> Central de monitoramento </h3>
    <q-btn class="q-ma-sm" color="primary" label="Parar Alerta" @click="pararAlerta" />
    <GmapMap
      :center="center"
      :zoom="7"
      map-type-id="terrain"
      style="width: 100%; height: 700px"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      />
    </GmapMap>
  </div>
</template>

<style>
</style>

<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBHJxzPHD_egYnhxntqcvfem35YRjruzAg',
    libraries: 'places'
  }
})

export default {
  name: 'PageIndex',

  data () {
    return {
      alertando: false,
      styleDivPrincipal: {
        background: 'white'
      },
      center: { lat: -27.138209, lng: -52.601173 },
      markers: [{
        position: { lat: -27.138000, lng: -52.600092 }
      },
      {
        position: { lat: -27.137704, lng: -52.598558 }
      },
      {
        position: { lat: -27.136511, lng: -52.598762 }
      },
      {
        position: { lat: -27.135451, lng: -52.599556 }
      }]
    }
  },
  mounted () {
    this.checarAlerta()
    this.atualizarLocalizacao()
  },
  methods: {
    atualizarLocalizacao () {
      setTimeout(() => {
        if (this.alertando === false) {
          this.atualizarLocalizacaoBanco()
          this.atualizarLocalizacao()
        }
      }, 11000)
    },
    atualizarLocalizacaoBanco () {
      Vue.prototype.$axios.defaults.headers = {
        'Content-Type': 'application/json;charset=UTF-8'
      }
      Vue.prototype.$axios.get(`http://192.168.15.4:6001/localizacao/1`, {
      })
        .then((response) => {
          console.log(response)
          this.markers.push({ position: { lat: Number(response.data.localizacao[0].lat), lng: Number(response.data.localizacao[0].lon) } })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    checarAlertaBanco () {
      Vue.prototype.$axios.defaults.headers = {
        'Content-Type': 'application/json;charset=UTF-8'
      }
      Vue.prototype.$axios.get(`http://192.168.15.4:6001/alerta/1`, {
      })
        .then((response) => {
          if (response.data.message === 'Dados obtidos com sucesso') {
            this.$q.notify({
              color: 'primary',
              icon: 'check',
              message: 'ALERTA RECEBIDO!!!',
              position: 'center',
              timeout: 5000
            })
            this.alertando = true
            this.alerta()
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },

    checarAlerta () {
      if (this.alertando === false) {
        setTimeout(() => {
          if (this.alertando === false) {
            this.checarAlertaBanco()
            this.checarAlerta()
          }
        }, 4000)
      }
    },

    alerta () {
      setTimeout(() => {
        if (this.styleDivPrincipal.background === 'red') {
          this.styleDivPrincipal = {
            background: 'white'
          }
        } else {
          this.styleDivPrincipal = {
            background: 'red'
          }
        }
        if (this.alertando) {
          this.alerta()
        }
      }, 500)
    },
    pararAlerta () {
      this.alertando = false
      setTimeout(() => {
        this.styleDivPrincipal = {
          background: 'white'
        }
      }, 700)
    }
  }
}
</script>
