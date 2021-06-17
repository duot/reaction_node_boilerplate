import React from "react"
import { useSelector } from "react-redux"
import CardLabel from "./CardLabel"

export default function Card({ cardId }) {
	const card = useSelector(state => state.cards.find((card) => {
		return card._id === cardId
	}))

	const date = new Date(card.dueDate)
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	]

	const dateString = months[date.getMonth()] + " " + date.getDate()

	return (
		<div className="card-background">
			<div className="card ">
				<i className="edit-toggle edit-icon sm-icon"></i>
				<div className="card-info">
					{card.labels.map((label) => <CardLabel key={label} label={label} />)}
					<p>{card.description}</p>
				</div>
				<div className="card-icons">
					<i className="clock-icon sm-icon overdue-recent completed">
						{dateString}
					</i>
					<i className="description-icon sm-icon"></i>
					<i className="comment-icon sm-icon"></i>
				</div>
			</div>
		</div>
	)
}