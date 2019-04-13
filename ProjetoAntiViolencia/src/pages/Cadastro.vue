<template>
  <q-page padding style="background: rgba(100, 100, 100, 0.3);">
    <div class="q-ma-md">
      <p><b style="font-size: 25px">Cadastro</b></p>
      <div class="row">
        <img height="250px" width="100%" :src="imageSrc" />
      </div>
      <q-btn class="q-ma-lg" style="margin-left: 27%" color="primary" icon="camera" label="Alterar Imagem" @click="tirarFoto" />
      <q-input v-model="Nome" type="text" float-label="Nome Completo" placeholder="Digite o nome" />
      <q-input v-model="Email" type="text" float-label="Email" placeholder="Digite o email" />
      <q-input v-model="Senha" type="text" float-label="Senha" placeholder="Digite a senha" />
      <q-input v-model="telefone" type="text" float-label="Telefone" placeholder="Digite o telefone" />
      <q-input v-model="paisestadocidade" type="text" float-label="Pais/Estado/Cidade" placeholder="Brasil/SC/Chapecó" />
      <q-input v-model="datanasc" type="text" float-label="Data Nascimento" placeholder="Digite a Data Nascimento" />

      <q-btn class="q-ma-xl" style="margin-left: 25%; width: 50%" color="primary" label="Enviar" @click="enviar" />
    </div>
  </q-page>
</template>

<script>

export default {
  // name: 'PageName',
  data () {
    return {
      Nome: '',
      Email: '',
      Senha: '',
      telefone: '',
      paisestadocidade: '',
      datanasc: '',
      imageSrc: 'statics/logo.png'
    }
  },
  methods: {
    tirarFoto () {
      var instance = this
      navigator.camera.getPicture(instance.onSuccess, instance.onFail, {
        quality: 25,
        destinationType: navigator.camera.DestinationType.DATA_URL
      })
    },
    onSuccess (imageUri) {
      this.imageSrc = 'data:image/jpeg;base64,' + imageUri
    },
    onFail () {
      this.$q.notify('Não foi possível acessar a câmera.')
    },

    enviar () {

    }
  }
}
</script>

<style>
</style>
