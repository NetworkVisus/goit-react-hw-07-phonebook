import { contactsReducer } from './slices/ContactsSlice/contactsSlice';
import { filterReducer } from './slices/FilterSlice/filterSlice';

export const reducer = {
  contacts: contactsReducer,
  filter: filterReducer,
};
