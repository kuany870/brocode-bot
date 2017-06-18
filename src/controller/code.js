class Code {
  constructor ({log, axios}) {
    this.log = log
    this.axios = axios
  }

  async getRandomCode () {
    const response = await this.axios.get(`/brocodes/random`)
    return response.data.data
  }

  async upvote ({codeID, userID, messageID}) {
    const options = {
      headers: {uuid: `TELEGRAM-${userID}`}
    }
    const response = await this.axios.post(`/brocodes/${codeID}/upvote`, {message_id: `${messageID}`}, options)
    return response.data.data
  }

  async downvote ({codeID, userID, messageID}) {
    const options = {
      headers: {uuid: `TELEGRAM-${userID}`}
    }
    const response = await this.axios.post(`/brocodes/${codeID}/downvote`, {message_id: `${messageID}`}, options)
    return response.data.data
  }
}

module.exports = Code
