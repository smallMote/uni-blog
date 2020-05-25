const { formatTags } = require('../../utils/util.js')
Component({
  data: {
    tagList: []
  },
  properties: {
    tags: String
  },
  lifetimes: {
    attached() {
      this.setData({
        tagList: this.formatTags(this.properties.tags)
      })
    }
  },
  methods: {
    formatTags
  }
})