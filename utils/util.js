const formatTime = date => {
  date = new Date(typeof date === 'string' ? parseInt(date) : date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 格式化父组件传递来的tags
const formatTags = (tagStr) => {
  if (!tagStr) return []
  let tags = tagStr.split(',')
  tags = tags.map(item => {
    let tag = item.split('--')
    item = { name: tag[0], color: tag[1] }
    return item
  })
  return tags
}

module.exports = {
  formatTime,
  formatTags
}
