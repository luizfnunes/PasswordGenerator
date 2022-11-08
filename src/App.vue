<template>
  <nav-bar :locale="locale[lang]" @changeLang="changeLang($event)"/>
  <div class="container mt-3">
    <main-form :locale="locale[lang]" />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import MainForm from '@/components/MainForm.vue'
import pt_br from "@/locale/pt_br"
import en from "@/locale/en"
export default {
  name: 'App',
  data: () => ({
    lang: 'en',
    locale:{
      en,
      pt_br
    },
  }),
  components:{
    NavBar,
    MainForm
  },
  methods:{
    changeLang(lang){
      this.lang = lang;
    }
  }
}
</script>

<style>

</style>
