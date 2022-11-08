<template>
  <div class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <span class="navbar-brand">{{ locale.title }}</span>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" @click.prevent="changeLang('en')" href="#">{{ locale.langs.english }}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click.prevent="changeLang('pt_br')" href="#">{{ locale.langs.portuguese }}</a>
          </li>
        </ul>
        <ul class="navbar-nav ms-md-auto">
          <li class="nav-item" v-for="(info, index) in social" :key='index'>
            <a
              target="_blank"
              rel="noopener"
              class="nav-link"
              :href="info.link"
              ><i :class="'bi '+info.icon"></i> {{ info.label }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'NavBar',
    props:{
        locale:{
            required: true
        }
    },
    data:() => ({
        social:[
            {
                icon: 'bi-github',
                label: 'GitHub',
                link: 'https://github.com/luizfnunes'
            },
            {
                icon: 'bi-youtube',
                label: 'Youtube',
                link: 'https://youtube.com/@zona-fantasma'
            }
        ]
    }),
    methods:{
      changeLang(lang){
        this.$emit('changeLang', lang)
      }
    }
}
</script>