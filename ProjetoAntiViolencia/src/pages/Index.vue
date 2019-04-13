<template>
  <q-page class="flex" style="background: rgba(100, 100, 100, 0.3); text-align: center">
    <div>
      <img src="statics/logo.png" height="200px"  class="q-ma-md"/>
      <div class="q-ma-xl row">
        <div class="col-11 q-mb-md">
          <q-input style="background: white" v-model="login" type="text" placeholder=" Email" />
        </div>
        <div class="col-1">
          <q-icon style="font-size: 38px; margin-left: 5px" name="fas fa-user"/>
        </div>
        <div class="col-11">
          <q-input style="background: white" v-model="senha" type="password" placeholder=" senha" />
        </div>
        <div class="col-1">
          <q-icon style="font-size: 38px; margin-left: 5px" name="fas fa-lock"/>
        </div>
        <div style="float: right" class="q-mt-xs">
          <b style="color: blue; padding-left: 104px">Esqueci a senha</b>
        </div>
      </div>
      <div style="text-align: center">
        <q-btn color="primary" label="Entrar" @click="logar" />
        <q-btn color="primary" class="q-ml-md" label="Cadastrar" @click="$router.push('/cadastro')" />
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import Vue from 'vue'
export default {
  name: 'pagelogin',
  data () {
    return {
      login: '',
      senha: ''
    }
  },
  methods: {
    logar () {
      var instance = this
      Vue.prototype.$axios.defaults.headers = {
        'Content-Type': 'application/json;charset=UTF-8'
      }
      Vue.prototype.$axios.get(`http://192.168.15.4:6001/usuario/` + this.login + `/` + this.senha, {
      })
        .then((response) => {
          if (response.data.message === 'Login feito') {
            instance.$router.push('/principal')
            instance.$q.notify({
              color: 'primary',
              icon: 'check',
              message: 'Login Efetuado com sucesso.',
              position: 'center',
              timeout: 1500
            })
          } else {
            instance.$q.notify({
              color: 'warning',
              icon: 'error',
              message: 'Conta não encontrada',
              position: 'center',
              timeout: 3000
            })
          }
        })
        .catch((error) => {
          instance.$q.notify({
            color: 'warning',
            icon: 'error',
            message: 'Conta não encontrada',
            position: 'center',
            timeout: 3000
          })
          console.log(error)
        })
    }
  }
}
</script>
