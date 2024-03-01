import * as Styled from './Contacts.styled';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, deleteContact } from '../../redux/operations';
import {
  filterSelector,
  contactsSelector,
  contactsLoadingSelector,
  contactsErrorSelector,
} from '../../redux/selectors';
import Loader from 'components/Loader/Loader';

export const Contacts = () => {
  const dispatch = useDispatch();

  const filterState = useSelector(filterSelector);
  const contacts = useSelector(contactsSelector);

  const isLoading = useSelector(contactsLoadingSelector);
  const error = useSelector(contactsErrorSelector);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const filteredContacts = contacts.length
    ? contacts.filter(contact =>
        contact.name.toLowerCase().includes(filterState.toLowerCase())
      )
    : [];

  const handleDelete = event => {
    const deleteContactId = event.currentTarget.id;
    dispatch(deleteContact(deleteContactId));
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <h1>Error has occured: {error}</h1>
  ) : (
    <Styled.List>
      {filteredContacts.map(el => {
        return (
          <Styled.Item key={el.id}>
            <Styled.Text>
              {el.name}: {el.number}
            </Styled.Text>
            <Styled.DeleteBtn onClick={handleDelete} id={el.id}>
              Delete
            </Styled.DeleteBtn>
          </Styled.Item>
        );
      })}
    </Styled.List>
  );
};
