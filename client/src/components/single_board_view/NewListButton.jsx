import React, { useState } from "react"
import { useDispatch } from "react-redux";
import * as actions from "../../actions/ListActions";

const NewListButton = ({ boardId }) => {
  const [selected, setSelected] = useState(false)
  const [typedTitle, setTypedTitle] = useState("")
  const toggleSelected = () => setSelected(!selected)

  const dispatch = useDispatch();

  const createList = () => {
    if (typedTitle === "") {
      return;
    }

    dispatch(actions.createList(typedTitle, boardId));
    toggleSelected();
    setTypedTitle("");
  }

  return (
    <div id="new-list" className={`new-list ${selected ? "selected" : null}`}>
      <span onClick={toggleSelected}>Add a list...</span>
      <input type="text" placeholder="Add a list..." value={typedTitle} onChange={(event) => setTypedTitle(event.target.value)} />
      <div>
        <input type="submit" className="button" value="Save" onClick={createList} />
        <i className="x-icon icon" onClick={toggleSelected}></i>
      </div>
    </div>
  )
}

export default NewListButton;
