class Code {
  constructor ({log, axios}) {
    this.log = log
    this.axios = axios
  }

  async getRandomCode ({userID}) {
    const options = {
      headers: {uuid: `TELEGRAM-${userID}`}
    }
    const response = await this.axios.get(`/brocodes/random`, options)
    return response.data.data
  }

  async getDayCode ({userID}) {
    const options = {
      headers: {uuid: `TELEGRAM-${userID}`}
    }
    const response = await this.axios.get(`/brocodes/popular/day`, options)
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
