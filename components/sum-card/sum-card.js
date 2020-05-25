// 文章简介组件
const { formatTags } = require('../../utils/util.js')
Component({
  data: {
    // tags: 'Fontend--#108ee9,Nodejs--purple,Vue--seagreen'
    defDate: new Date().toLocaleString(),
    defSummary: '在vue项目的路由中默认是hash模式，又叫前端路由，根据浏览器url地址栏中的变化，使用onhashchange事件监听做出相应的操作，不会向服务器发送请求。但是若采用了history模式，就大大不同了，history不怕前进不怕后退就怕刷新，history模式是由浏览器提供的history api来处理。而且将vue项目（非ssr）打包后的静态资源部署到不同的服务器中，服务器的配置也不同。这里我首先使用了nodejs提供的koa网络服务框架来解决这一问题。'
  },
  properties: {
    createDate: String,
    tags: String,
    coverImgUrl: String,
    title: String,
    summary: String
  },
  methods: {
    formatTags
  }
})