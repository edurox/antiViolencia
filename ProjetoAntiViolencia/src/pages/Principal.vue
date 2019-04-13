<template>
  <q-page padding :style="styleDivPrincipal">
    <p class="q-ma-md" style="font-size: 18px"><b>Aperte no botão vermelho para começar a enviar a sua localização para as autoridades.</b></p>
    <div style="text-align: center">
      <q-icon style="font-size: 40px" name="fas fa-hand-point-down"/>
      <br>
      <div v-if="enviando === false">
        <q-btn class="q-mt-xl" style="width: 54%; font-size: 40px;" size="xl" color="red" icon="fas fa-map-marker-alt" label="INICIAR" @click="iniciar" />
      </div>
      <div v-else>
        <q-btn class="q-mt-xl" style="width: 54%; font-size: 30px;" size="xl" color="green" icon="fas fa-map-marker-alt" label="ENVIANDO..." />
        <div class="q-mt-sm" style="color: red">Estamos enviando a sua localização para a central. Clique em cancelar para parar.</div>
        <q-btn class="q-mt-xs" color="red" label="Cancelar" @click="parar" />
        <br>
        <q-btn class="q-mt-xs" color="red" label="Pedir Ajuda" @click="onShake" />
      </div>
    </div>
    <div style="text-align: center">
      <p class="q-ma-md q-mt-xl" style="font-size: 18px"><b>Após inciado, chacoalhe o aparelho para pedir ajuda.</b></p>
      <img src="statics/shake.png" width="150px" height="150px"/>
    </div>
  </q-page>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'principal',
  data () {
    return {
      enviando: false,
      email: '',
      senha: '',
      styleDivPrincipal: {
        background: 'rgba(100, 100, 100, 0.3)'
      },
      alertando: false
    }
  },
  methods: {
    alerta () {
      setTimeout(() => {
        if (this.styleDivPrincipal.background === 'red') {
          this.styleDivPrincipal = {
            background: 'rgba(100, 100, 100, 0.3)'
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
          background: 'rgba(100, 100, 100, 0.3)'
        }
      }, 700)
    },
    onShake () {
      Vue.prototype.$axios.defaults.headers = {
        'Content-Type': 'application/json;charset=UTF-8'
      }
      Vue.prototype.$axios.get(`http://192.168.15.4:6001/alerta/1/true`, {
      })
        .then((response) => {
          console.log('Alertado')
          this.$q.notify({
            color: 'primary',
            icon: 'check',
            message: 'ALERTA ENVIADO!!!',
            position: 'center',
            timeout: 5000
          })
          this.alertando = true
          this.alerta()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    onError () {
      console.log('Ocorreu um problema')
    },
    iniciar () {
      // eslint-disable-next-line
      shake.startWatch(this.onShake, 40, this.onError)
      this.enviando = true
      this.enviarCordenadas()
    },
    onSuccess (position) {
      Vue.prototype.$axios.defaults.headers = {
        'Content-Type': 'application/json;charset=UTF-8'
      }
      Vue.prototype.$axios.get(`http://192.168.15.4:6001/localizacao/` + position.coords.latitude + `/` + position.coords.longitude, {
      })
        .then((response) => {
          console.log()
        })
        .catch((error) => {
          console.log(error)
        })
      this.$q.notify({
        color: 'primary',
        icon: 'check',
        message: 'Cordenadas: (LAT) ' + position.coords.latitude + '  | (LON) ' + position.coords.longitude,
        position: 'bottom',
        timeout: 2000
      })
    },
    enviarCordenadas () {
      navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError)
      setTimeout(() => {
        if (this.enviando) {
          this.enviarCordenadas()
        }
      }, 10000)
    },
    parar () {
      this.enviando = false
      // eslint-disable-next-line
      shake.stopWatch()
      this.pararAlerta()
    }
  }
}
</script>

<style>
</style>
