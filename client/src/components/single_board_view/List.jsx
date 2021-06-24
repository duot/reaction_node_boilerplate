import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from "./Card";
import { updateList } from '../../actions/ListActions';
import { addCard } from '../../actions/CardActions'
import useInput from "../../hooks/useInput"

export default function List({ listId, setActiveList, isActive }) {
  const dispatch = useDispatch();

  const list = useSelector(state => state.lists.find((list) => {
    return list._id === listId;
  }))

  const [titleEditable, setTitleEditable] = useState(false);
  const [editedTitle, setEditedTitle] = useState(list.title);
  const cards = useSelector(state => state.cards.filter((card) => {
    return card.listId === listId;
  }));

  const titleClicked = () => {
    setTitleEditable(true);
  };

  const titleUnclicked = () => {
    updateListIfChanged();
  };

  const handleListTitleKeyPresses = (event) => {
    switch (event.key) {
      case 'Escape':
        setEditedTitle(list.title);
        return setTitleEditable(false);
      case 'Enter':
      case 'Tab':
        return updateListIfChanged();
    }
  };

  const handleNewCardKeyPresses = (event) => {
    switch (event.key) {
      case 'Escape':
        newCardTitle.reset();
        return setActiveList(null);
      case 'Enter':
      case 'Tab':
        return handleAddCard();
    }
  };

  const updateListIfChanged = () => {
    setTitleEditable(false);
    if (list.title === editedTitle || editedTitle === '') {
      setEditedTitle(list.title);
      return;
    }
    dispatch(updateList(list._id, editedTitle, list.position));
  };

  const showAddCardForm = (event) => {
    newCardTitle.reset();
    setActiveList(listId);
  };

  const closeAddCardForm = (event) => {
    newCardTitle.reset();
    setActiveList(null);
  };

  const handleAddCard = (event) => {
    dispatch(addCard(list._id, newCardTitle.value));
    newCardTitle.reset();
    setActiveList(null);
  };

  const newCardTitle = useInput("");

  return (
    <div className={`list-wrapper ${isActive ? "add-dropdown-active" : ""}`}>
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            {titleEditable ?
              <input className="list-title" autoFocus="autofocus" type="text" value={editedTitle}
                onBlur={titleUnclicked} onChange={(e) => setEditedTitle(e.target.value)}
                onKeyDown={handleListTitleKeyPresses}></input> :
              <p className="list-title" onClick={titleClicked}>{list.title}</p>}
          </div>
          <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div id="cards-container" data-id="list-1-cards">
            {cards.map(card => <Card key={card._id} cardId={card._id} />)}
          </div>
          <div className={`add-dropdown add-bottom ${isActive ? "active-card" : ""}`}>
            <div className="card">
              <div className="card-info"></div>
              <textarea name="add-card" value={newCardTitle.value}
                onChange={(e) => newCardTitle.setValue(e.target.value)}
                onKeyDown={handleNewCardKeyPresses}>
              </textarea>
              <div className="members"></div>
            </div>
            <a className="button" onClick={handleAddCard}>Add</a>
            <i className="x-icon icon" onClick={closeAddCardForm}></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div className="add-card-toggle" data-position="bottom"
            onClick={showAddCardForm}>
            Add a card...
          </div>
        </div>
      </div>
    </div>
  )
}
