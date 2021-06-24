import React, { useState } from "react";
import { useSelector } from "react-redux";
import List from "./List";
import NewListButton from "./NewListButton";

const Lists = ({ boardId }) => {
  const lists = useSelector((state) => state.lists.filter((list) => {
    return list.boardId === boardId;
  }))

  const [ activeList, setActiveList ] = useState(null);

  return (
    <div id="list-container" className="list-container">
      <div id="existing-lists" className="existing-lists">
        {lists.map((list) => <List key={list._id} listId={list._id}
          setActiveList={setActiveList} isActive={list._id === activeList} />)}
      </div>
      <NewListButton boardId={boardId} />
    </div>
  );
};

export default Lists;
