import axios from 'axios'
const urlApi = 'https://e-winespf.herokuapp.com'
// const urlApi = 'http://localhost:3001'

export function getPublications () {
  return async function (dispatch) {
    try {
      const api = await axios.get(`${urlApi}/publications`)
      return dispatch({
        type: 'GET_PUBLICATIONS',
        payload: api.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getByPublication (id) {
  return async function (dispatch) {
    try {
      const api = await axios.get(`${urlApi}/publications/${id}`)
      return dispatch({
        type: 'GET_BY_ID_PUBLICATION',
        payload: api.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}
export const getPublicationsAdm = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${urlApi}/publications/all`)

      return dispatch({
        type: 'GET_PUBLICATIONS_ALL',
        payload: res.data
      })
    } catch (error) {
      return error.message
    }
  }
}
export const bannedPublication = (id, isBanned) => {
  return async function (dispatch) {
    try {
      console.log(isBanned)
      console.log('Llegue')
      const res = await axios.put(`${urlApi}/publications/${id}?banned=${!isBanned}`)
      console.log(res)
      return dispatch({
        type: 'GET_PUBLICATION_BANNED',
        payload: res.data
      })
    } catch (error) {
      return error.message
    }
  }
}

export function postPublication (data, token) {
  return async function (dispatch) {
    try {
      const api = await axios.post(`${urlApi}/publications`, data)
      return dispatch({
        type: 'POST_PUBLICATION',
        Headers: { 'content-type': 'application/json' },
        payload: api.data
      })
    } catch (error) {
      console.log(error.response)
      throw new Error(error.response.data)
    }
  }
}

export function getProducts () {
  return async function (dispatch) {
    try {
      const api = await axios.get(`${urlApi}/products`)
      return dispatch({
        type: 'GET_PRODUCTS',
        payload: api.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getByIdProduct (id) {
  return async function (dispatch) {
    try {
      const api = await axios.get(`${urlApi}/products/${id}`)
      return dispatch({
        type: 'GET_BY_ID_PRODUCT',
        payload: api.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function postProduct (data) {
  return async function (dispatch) {
    try {
      const api = await axios.post(`${urlApi}/products`, data)
      return dispatch({
        type: 'POST_PRODUCT',
        payload: api.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

// pending
export const searchByNameProduct = (name) => {
  return async function (dispatch) {
    return fetch(`${urlApi}/products?name=${name}`)
      .then((respuesta) => respuesta.json())
      .then((infoProductName) => {
        dispatch({ type: 'SEARCH_PRODUCT_BY_NAME', payload: infoProductName })
      })
  }
}

// /publications/filter
export const filterPublications = ({ varietal, type, origin, opt }) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${urlApi}/publications/filter?varietal=${varietal}&type=${type}&origin=${origin}&opt=${opt}`)
      return dispatch({
        type: 'FILTER_PUBLICATIONS',
        payload: data
      })
    } catch (error) {
      console.log(error)
    }
  }
}
export const clearFilter = () => {
  return { type: 'CLEAR_FILTER', payload: null }
}

// Search Publication by Name

export const searchPublicationByName = (name) => {
  return async function (dispatch) {
    return fetch(`${urlApi}/publications?name=${name}`).then((respuesta) =>
      respuesta.json().then((dataP) => {
        dispatch({ type: 'GET_PUBLICATIONS', payload: dataP })
      })
    )
  }
}

// Favorites

export const getFavorites = (id) => {
  return async function (dispatch) {
    try {
      const api = await axios.get(`${urlApi}/favorites/${id}`)
      return dispatch({
        type: 'GET_FAVORITES_ID',
        payload: api.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const getPublicationsUserFavorites = (ids) => {
//   return async function (dispatch) {
//     try {
//       // const publications = ids.map(async (idP) => await axios.get(`${urlApi}/favorites/${idP}`))
//       // const api = await axios.get(`${urlApi}/favorites/${id}`)
//       return dispatch({
//         type: 'GET_PUBLICATIONS_USERFAVORITES',
//         payload: api.data
//       })
//     } catch (error) {
//       console.log(error)
//     }
//   }
}

export const removePublicationsUserFavorites = (id) => {
  return async function (dispatch) {
    try {
      const api = await axios.get(`${urlApi}/favorites/${id}`)
      return dispatch({
        type: 'REMOVE_PUBLICATIONS_USERFAVORITES',
        payload: api.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const addFavorites = (data) => {
  return async function (dispatch) {
    try {
      const api = await axios.post(`${urlApi}/favorites`, data)
      return dispatch({
        type: 'ADD_FAVORITE',
        payload: api.data
      })
    } catch (error) {
      console.log(error.response)
      throw new Error(error.response.data)
    }
  }
}

export const removeFavorites = (userId, publicationId) => {
  return async function (dispatch) {
    try {
      const api = await axios.get(`${urlApi}/favorites/delete/${userId}?publicationId=${publicationId}`)
      return dispatch({
        type: 'REMOVE_FAVORITE',
        payload: api.data
      })
    } catch (error) {
      console.log(error.response)
      throw new Error(error.response.data)
    }
  }
}

// CARRITO

export const addCarrito = (publication) => {
  return {
    type: 'ADD_CARRITO',
    payload: publication
  }
}

export const removeCarrito = (id) => {
  return {
    type: 'REMOVE_CARRITO',
    payload: id
  }
}

export const clearCarrito = (id) => {
  return {
    type: 'CLEAR_CARRITO',
    payload: id
  }
}

// RECOMENDED PUBLICATIONS

export const getRecomendedPublications = (type, varietal, origin) => {
  return async function (dispatch) {
    try {
      console.log(type, varietal, origin)
      const recPub = await axios(`${urlApi}/publications/filter?type=${type || null}&varietal=${varietal || null}&origin=${origin || null}`)
      console.log(recPub)
      return dispatch({
        type: 'RECOMENDED_PUBLICATIONS',
        payload: recPub.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

// USER

export const loginUser = (user) => {
  return {
    type: 'LOGIN_USER',
    payload: user
  }
}

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER'
  }
}

export const getUsers = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${urlApi}/users`)

      return dispatch({
        type: 'GET_USERS',
        payload: res.data
      })
    } catch (error) {
      return error.message
    }
  }
}

export const bannedUser = (id, isBanned) => {
  return async function (dispatch) {
    try {
      console.log(isBanned)
      console.log('Llegue')
      const res = await axios.put(`${urlApi}/users/${id}?banned=${!isBanned}`)
      console.log(res)
      return dispatch({
        type: 'GET_USER_BANNED',
        payload: res.data
      })
    } catch (error) {
      return error.message
    }
  }
}
// STRIPE

export const postStripe = (idStripe, totalAmount, carrito, userId) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${urlApi}/stripe`, {
        idStripe,
        totalAmount,
        carrito,
        userId
      })
      console.log(res)
      return dispatch({
        type: 'POST_STRIPE',
        payload: res.data
      })
    } catch (error) {
      console.log('Error action post Stripe')
      return dispatch({
        type: 'POST_STRIPE',
        payload: error.response.data
      })
    }
  }
}

// QUESTIONS

export const getQuestions = (id) => {
  return async function (dispatch) {
    try {
      const api = await axios.get(`${urlApi}/questions/${id}`)
      return dispatch({
        type: 'GET_QUESTIONS',
        payload: api.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const addQuestion = (data) => {
  return async function (dispatch) {
    try {
      const api = await axios.post(`${urlApi}/questions`, data)
      return dispatch({
        type: 'ADD_QUESTION',
        payload: api.data
      })
    } catch (error) {
      console.log(error.response)
      throw new Error(error.response.data)
    }
  }
}

export const addAnswer = (data, id) => {
  return async function (dispatch) {
    try {
      const api = await axios.post(`${urlApi}/questions/answer/${id}`, data)
      return dispatch({
        type: 'ADD_QUESTION',
        payload: api.data
      })
    } catch (error) {
      console.log(error.response)
      throw new Error(error.response.data)
    }
  }
}
// Render Modal Login
export const modalRender = () => {
  return {
    type: 'RENDER_MODAL_LOGIN'
  }
}

// BUYS
export const getUserBuys = (userId) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${urlApi}/buys/user/${userId}`)
      return dispatch({
        type: 'GET_USER_BUYS',
        payload: res.data
      })
    } catch (error) {
      return error.message
    }
  }
}

export const getBuys = () => {
  return async function (dispatch) {
    try {
      const res = axios.get(`${urlApi}/buys`)
      return dispatch({
        type: 'GET_ALL_BUYS',
        payload: res.data
      })
    } catch (error) {
      return error.message
    }
  }
}