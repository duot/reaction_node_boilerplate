import React from "react"
import { useSelector } from "react-redux"
import CardLabel from "./CardLabel"

export default function Card({ cardId }) {
	const card = useSelector(state => state.cards.find((card) => {
    return card._id === cardId
  }))

	return (
		<div className="card-background">
			<div className="card ">
					<i className="edit-toggle edit-icon sm-icon"></i>
					<div className="card-info">
						{card.labels.map((label) => <CardLabel key={label} label={label} />)}
						<p>
							Cards do many cool things. Click on this card to
							open it and learn more...
						</p>
					</div>
					<div className="card-icons">
						<i className="clock-icon sm-icon overdue-recent completed">
							Aug 4
						</i>
						<i className="description-icon sm-icon"></i>
						<i className="comment-icon sm-icon"></i>
					</div>
				</div>
			</div>
	)
}