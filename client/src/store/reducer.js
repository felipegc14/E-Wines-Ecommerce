// import data from '../dataExample.json'

const initialState = {
  allPublications: [],
  publications: [],
  publicationsAdm: [],
  publicationBanned: {},
  products: [],
  allProducts: [],
  detailPublication: {},
  detailProduct: {},
  favorites: [],
  carrito: [],
  publicationsUserFavorites: [],
  recomendedPublication: [],
  user: '',
  users: [],
  userDetail: {},
  buy: {},
  buys: [],
  questions: [],
  login: true
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case 'GET_PUBLICATIONS':
      return { ...state, allPublications: action.payload, publications: action.payload, error: action.payload }
    case 'GET_BY_ID_PUBLICATION':
      return { ...state, detailPublication: action.payload }
    case 'POST_PUBLICATION':
      return { ...state, detailPublication: action.payload }
    case 'GET_PRODUCTS':
      return { ...state, allProducts: action.payload, products: action.payload }
    case 'GET_BY_ID_PRODUCT':
      return { ...state, detailProduct: action.payload }
    case 'POST_PRODUCT':
      return { ...state, detailProduct: action.payload }
    case 'SEARCH_PRODUCT_BY_NAME':
      return { ...state, detailProduct: action.payload }
    case 'FILTER_PUBLICATIONS':
      return { ...state, publications: action.payload }
    case 'CLEAR_FILTER':
      return { ...state, publications: state.allPublications }
    case 'GET_FAVORITES_ID':
      return { ...state, favorites: action.payload }
    case 'GET_PUBLICATIONS_USERFAVORITES':
      return { ...state, publicationsUserFavorites: [...state.publicationsUserFavorites, action.payload] }
    case 'REMOVE_PUBLICATIONS_USERFAVORITES':
      return { ...state, publicationsUserFavorites: [...state.publicationsUserFavorites.filter(p => p.id !== action.payload)] }
    case 'ADD_FAVORITE':
      return { ...state, favorites: action.payload }
    case 'REMOVE_FAVORITE':
      return { ...state, favorites: action.payload }
    case 'ADD_CARRITO':
      return { ...state, carrito: [...state.carrito.filter(p => p.id !== action.payload.id), action.payload].sort((a, b) => parseInt(a.price) - parseInt(b.price)) }
    case 'REMOVE_CARRITO':
      return { ...state, carrito: state.carrito.filter(item => item.id !== action.payload) }
    case 'CLEAR_CARRITO':
      return { ...state, carrito: [], buy: {} }
    case 'RECOMENDED_PUBLICATIONS':
      return { ...state, recomendedPublication: action.payload }
    case 'LOGIN_USER':
      return { ...state, user: action.payload }
    case 'LOGOUT_USER':
      return { ...state, user: '' }
    case 'POST_STRIPE':
      return { ...state, buy: action.payload }
    case 'GET_QUESTIONS':
      return { ...state, questions: action.payload }
    case 'ADD_QUESTION':
      return { ...state, questions: action.payload }
    case 'ADD_ANSWER':
      return { ...state, questions: action.payload }
    case 'RENDER_MODAL_LOGIN':
      return { ...state, login: !state.login }
    case 'GET_USERS':
      return { ...state, users: action.payload }
    case 'GET_USER_BUYS':
      return { ...state, buys: action.payload }
    case 'GET_ALL_BUYS':
      return { ...state, buys: action.payload }
    case 'GET_USER_BANNED':
      return { ...state, userDetail: action.payload }
    case 'GET_PUBLICATIONS_ALL':
      return { ...state, publicationsAdm: action.payload }
    case 'GET_PUBLICATION_BANNED':
      return { ...state, publicationBanned: action.payload }
    default:
      return { ...state }
  }
}