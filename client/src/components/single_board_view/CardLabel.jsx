import React from "react"

export default function CardLabel({ label }) {
	const validColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

	if (!validColors.includes(label)) return null

	return (
		<div className={`card-label colorblindable ${label}`}></div>
	)
}