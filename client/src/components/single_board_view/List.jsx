import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from "./Card"

export default function List({ listId }) {
  const [titleEditable, setTitleEditable] = useState(false);
  const [editedTitle, setEditedTitle] = useState("")
  //^change so default value is current list title
  const cards = useSelector(state => state.cards.filter((card) => {
    return card.listId === listId
  }))

  const list = useSelector(state => state.lists.find((list) => {
    return list._id === listId
  }))

  const titleClicked = () => {
    setTitleEditable(true)
  }

  const titleUnclicked = () => {
    setTitleEditable(false)
  }

  return (
    <div className="list-wrapper">
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            {titleEditable ?
              <input className="list-title" autoFocus="autofocus" type="text" value={editedTitle}
                onBlur={titleUnclicked} onChange={(e) => setEditedTitle(e.target.value)}></input> :
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
          <div className="add-dropdown add-bottom">
            <div className="card">
              <div className="card-info"></div>
              <textarea name="add-card"></textarea>
              <div className="members"></div>
            </div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div className="add-card-toggle" data-position="bottom">
            Add a card...
          </div>
        </div>
      </div>
    </div>
  )
}
