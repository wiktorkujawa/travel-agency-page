import { combineReducers } from 'redux';
import announcementReducer from './announcementReducer';
import slideReducer from './slideReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import contentReducer from './contentReducer';
import contactReducer from './contactReducer';
import offerReducer from './offerReducer';
import galleryReducer from './galleryReducer';
import insuranceReducer from './insuranceReducer';
import questionReducer from './questionReducer';

export default combineReducers({
  announcement: announcementReducer,
  content: contentReducer,
  contact: contactReducer,
  slide: slideReducer,
  error: errorReducer,
  auth: authReducer,
  offer: offerReducer,
  photo: galleryReducer,
  insurance: insuranceReducer,
  question: questionReducer
});