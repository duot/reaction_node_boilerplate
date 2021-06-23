import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import * as actions from "../../actions/CardActions";

const SingleCard = (props) => {
	const cardId = props.match.params.id
	const card = useSelector(state => state.cards.find((card) => {
		return card._id === cardId;
	}));
	const list = useSelector(state => state.lists.find((list) => {
		return list._id === card.listId;
	}))
	const dispatch = useDispatch();
	useEffect(() => {
		if (!cardId) return;
		dispatch(actions.fetchCard(cardId));
	}, [dispatch, cardId]);

	if (!card) {
		return null;
	}
	if (!list) {
		return null;
	}

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

	function formatAMPM(date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0' + minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
	}
	const dateString = (
		months[date.getMonth()] +
		" " +
		date.getDate() +
		" at " +
		formatAMPM(date)
	)
	const pastDue = date > Date.now() ? "" : "(past due)";

	if (!card) {
		return null;
	}
	return (
		<div id="modal-container">
			<div className="screen"></div>
			<div id="modal">
				<Link to={`/boards/${card.boardId}`}>
					<i className="x-icon icon close-modal"></i>
				</Link>
				<header>
					<i className="card-icon icon .close-modal"></i>
					<textarea className="list-title" style={{ height: "45px" }}>
						{card.title}
					</textarea>
					<p>
						in list <a className="link" href={`/boards/${card.boardId}`}>{list.title}</a>
						<i className="sub-icon sm-icon"></i>
					</p>
				</header>
				<section className="modal-main">
					<ul className="modal-outer-list">
						<li className="details-section">
							<ul className="modal-details-list">
								<li className="labels-section">
									<h3>Labels</h3>
									{card.labels.map((color) => {
										return (
											<div className="member-container">
												<div className={`${color} label colorblindable`}></div>
											</div>
										)
									})}
									<div className="member-container">
										<i className="plus-icon sm-icon"></i>
									</div>
								</li>
								<li className="due-date-section">
									<h3>Due Date</h3>
									<div id="dueDateDisplay" className="overdue completed">
										<input
											id="dueDateCheckbox"
											type="checkbox"
											className="checkbox"
											checked={card.completed}
										/>
										{dateString} <span>{pastDue}</span>
									</div>
								</li>
							</ul>
							<form className="description">
								<p>{card.description}</p>
								<span id="description-edit" className="link">
									Edit
								</span>
								<p id="description-edit-options" className="hidden">
									You have unsaved edits on this field.{" "}
									<span className="link">View edits</span> -{" "}
									<span className="link">Discard</span>
								</p>
							</form>
						</li>
						<li className="comment-section">
							<h2 className="comment-icon icon">Add Comment</h2>
							<div>
								<div className="member-container">
									<div className="card-member">TP</div>
								</div>
								<div className="comment">
									<label>
										<textarea
											required=""
											rows="1"
											placeholder="Write a comment..."
										></textarea>
										<div>
											<a className="light-button card-icon sm-icon"></a>
											<a className="light-button smiley-icon sm-icon"></a>
											<a className="light-button email-icon sm-icon"></a>
											<a className="light-button attachment-icon sm-icon"></a>
										</div>
										<div>
											<input
												type="submit"
												className="button not-implemented"
												value="Save"
											/>
										</div>
									</label>
								</div>
							</div>
						</li>
						<li className="activity-section">
							<h2 className="activity-icon icon">Activity</h2>
							<ul className="horiz-list">
								<li className="not-implemented">Show Details</li>
							</ul>
							<ul className="modal-activity-list">
								<li>
									<div className="member-container">
										<div className="card-member">TP</div>
									</div>
									<h3>Taylor Peat</h3>
									<div className="comment static-comment">
										<span>The activities are not functional.</span>
									</div>
									<small>
										22 minutes ago - <span className="link">Edit</span> -{" "}
										<span className="link">Delete</span>
									</small>
									<div className="comment">
										<label>
											<textarea required="" rows="1">
												The activities have not been implemented yet.
											</textarea>
											<div>
												<a className="light-button card-icon sm-icon"></a>
												<a className="light-button smiley-icon sm-icon"></a>
												<a className="light-button email-icon sm-icon"></a>
											</div>
											<div>
												<p>You haven&apos;t typed anything!</p>
												<input
													type="submit"
													className="button not-implemented"
													value="Save"
												/>
												<i className="x-icon icon"></i>
											</div>
										</label>
									</div>
								</li>
								<li>
									<div className="member-container">
										<div className="card-member small-size">VR</div>
									</div>
									<p>
										<span className="member-name">Victor Reyes</span> changed the
										background of this board <small>yesterday at 4:53 PM</small>
									</p>
								</li>
								<li className="activity-comment">
									<div className="member-container">
										<div className="card-member">VR</div>
									</div>
									<h3>Victor Reyes</h3>
									<div className="comment static-comment">
										<span>Example of a comment.</span>
									</div>
									<small>
										22 minutes ago - <span className="link">Edit</span> -{" "}
										<span className="link">Delete</span>
									</small>
									<div className="comment">
										<label>
											<textarea required="" rows="1">
												Example of a comment.
											</textarea>
											<div>
												<a className="light-button card-icon sm-icon"></a>
												<a className="light-button smiley-icon sm-icon"></a>
												<a className="light-button email-icon sm-icon"></a>
											</div>
											<div>
												<p>You haven&apos;t typed anything!</p>
												<input
													type="submit"
													className="button not-implemented"
													value="Save"
												/>
												<i className="x-icon icon"></i>
											</div>
										</label>
									</div>
								</li>
							</ul>
						</li>
					</ul>
				</section>
				<aside className="modal-buttons">
					<h2>Add</h2>
					<ul>
						<li className="member-button">
							<i className="person-icon sm-icon"></i>Members
						</li>
						<li className="label-button">
							<i className="label-icon sm-icon"></i>Labels
						</li>
						<li className="checklist-button">
							<i className="checklist-icon sm-icon"></i>Checklist
						</li>
						<li className="date-button not-implemented">
							<i className="clock-icon sm-icon"></i>Due Date
						</li>
						<li className="attachment-button not-implemented">
							<i className="attachment-icon sm-icon"></i>Attachment
						</li>
					</ul>
					<h2>Actions</h2>
					<ul>
						<li className="move-button">
							<i className="forward-icon sm-icon"></i>Move
						</li>
						<li className="copy-button">
							<i className="card-icon sm-icon"></i>Copy
						</li>
						<li className="subscribe-button">
							<i className="sub-icon sm-icon"></i>Subscribe
							<i className="check-icon sm-icon"></i>
						</li>
						<hr />
						<li className="archive-button">
							<i className="file-icon sm-icon "></i>Archive
						</li>
					</ul>
					<ul className="light-list">
						<li className="not-implemented">Share and more...</li>
					</ul>
				</aside>
			</div>
		</div>
	);
};

export default SingleCard;

