<template>
  <div id="app" class="app">
    <section class="hero is-primary is-medium">
    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <div class="container has-text-centered">
        <figure class="image is-128x128" style="margin:auto;">
          <img src="https://github.com/vuejs/awesome-vue/raw/master/logo.svg?sanitize=true">
        </figure>
        
        <h1 class="title">
          awesome-vue-list
        </h1>
        <h2 class="subtitle">
          A curated list of awesome things related to Vue.js based on awesome-vue repository
        </h2>
        <a class="button is-primary is-inverted is-outlined" 
            href="https://github.com/mazipan/awesome-vue-list/issues/new">
            Add New Item
        </a>
      </div>
    </div>
  </section>

    <div class="container is-fluid" style="margin-top: 20px;">
      
      <div class="columns is-centered">
        <div class="column is-8">

          <div class="control has-icons-right">
            <input class="input is-large" 
              type="text" 
              placeholder="Type and search by keyword"
              v-model="searchText">

            <span class="icon is-medium is-right">
              <i class="fa fa-search"></i>
            </span>
          </div>

          <div>
            <b class="has-text-info">{{filteredList.length}}</b> item was found     
          </div>
      
        </div>
      </div>

      <div class="columns is-centered">
        <div class="column item" v-for="item in filteredList" :key="item.name">
          <div class="item__block">
            <a :href="item.link" v-if="item.link" target="_blank">
              <i class="fa fa-github"></i>&nbsp;
            </a>
            
            <span v-html="highlightText(item.name, searchText)"></span>
          </div>
          
          <div v-html="highlightText(item.description, searchText)" v-if="item.description"></div>
          
          <div class="tags" v-if="item.group">
            <span class="tag is-primary" v-if="item.groupParent">
              {{item.groupParent.groupName}}
            </span>
            <span class="tag is-info">
              {{item.groupName}}
            </span>
          </div>          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import groups from '../data/groups.js'
import items from '../data/components.js'

export default {
  name: 'app',
  data() {
    return {
      searchText: '',
      groups: groups.groups,
      items: items.items
    }
  },
  mounted () {
    this.items = this.getGroupDetail()
  },  
  computed: {
    filteredList() {
      let self = this
      return self.items.filter(item => {
        let objAfterFilter = item.name.toLowerCase().includes(self.searchText.toLowerCase())
        
        if (item.description) {        
          objAfterFilter = item.name.toLowerCase().includes(self.searchText.toLowerCase()) || 
          item.description.toLowerCase().includes(self.searchText.toLowerCase())
        }

        return objAfterFilter
      })
    }
  },
  methods: {
    getGroupDetail: function() {
      let self = this
      let newItems = self.items.map(function(item){
        let groups = self.groups.filter(function (group){
          return item.group === group.groupId
        })
        let groupObj = groups[0]
        let obj = Object.assign({}, item, groupObj)
        return obj
      })

      return newItems
    },
    searchAnything: function(query){

    },
    highlightText: function (words, query) {
      function pregQuote (str) {
        return (str.trim() + '').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1")
      }
      var iQuery = new RegExp(pregQuote(query), 'ig')
      return words.toString().replace(iQuery, function (matchedTxt, a, b) {
        return ('<b class=\'z\'>' + matchedTxt + '</b>')
      })
    }
  }
}
</script>

<style lang="css" src="./app.css"></style>
