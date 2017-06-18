class Root {
  root () {
    return (req, res) => {
      res.status(200).json({ hello: 'world' })
    }
  }
}

module.exports = Root
