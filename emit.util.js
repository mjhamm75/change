module.exports = socket => {
  return (value) =>) {
    socket.emit('result', {
      key: value
    })
  }
}
