class API {
  constructor({ API_URL, token }) {
    this.Axios = axios;
    this.API_URL = API_URL;

    this.data = {};
    if (token) {
      this.config = {
        headers: {
          "access-token": token,
        },
      };
    }
  }

  hasQuery(url = "") {
    return url.split("?").length ? true : false;
  }

  async _read(endpoint = "/", config = null) {
    try {
      const { Axios, API_URL } = this;
      if (config) this.config = { ...this.config, config };
      const item = await Axios.get(`${API_URL}${endpoint}`, this.config);
      this.data = item.data?.response?.item || item.data?.response?.items || item.data;
      return this.data
    } catch (error) {
      console.error(error.message);
      if (error.response.data && error.response.data.error)
        throw new Error(error.response.data.error);
      else throw new Error("Something went wrong");
    }
  }

  async _add(endpoint = "/", data = {}, config = null) {
    try {
      const { Axios, API_URL } = this;
      if (config) this.config = { ...this.config, config };
      const item = await Axios.post(`${API_URL}${endpoint}`, data, this.config);
      this.data = item.data.response.item;
    } catch (error) {
      console.error(error.message);
      if (error.response.data && error.response.data.error)
        throw new Error(error.response.data.error);
      else throw new Error("Something went wrong");
    }
  }

  async _edit(endpoint = "/", data = {}, config = null) {
    try {
      const { Axios, API_URL } = this;
      if (config) this.config = { ...this.config, config };
      const item = await Axios.put(`${API_URL}${endpoint}`, data, this.config);
      this.data = item.data.response.item;
    } catch (error) {
      console.error(error.message);
      if (error.response.data && error.response.data.error)
        throw new Error(error.response.data.error);
      else throw new Error("Something went wrong");
    }
  }

  async _remove(endpoint = "/", config = null) {
    try {
      const { Axios, API_URL } = this;
      if (config) this.config = { ...this.config, config };
      const item = await Axios.delete(`${API_URL}${endpoint}`, this.config);
      this.data = item.data.response.item;
    } catch (error) {
      console.error(error.message);
      if (error.response.data && error.response.data.error)
        throw new Error(error.response.data.error);
      else throw new Error("Something went wrong");
    }
  }
}

export default API;
