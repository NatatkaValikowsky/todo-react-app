import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './timer.css';

export default class Timer extends Component {
	timer = null;

	state = {
		total: 0,
		isStarted: false,
	};

	onStart = () => {
		this.setState({
			isStarted: true,
		});

		this.timer = setInterval(() => {
			const { isCurrentTimer } = this.props;
			if (isCurrentTimer) {
				this.setState(({ total }) => {
					return {
						total: total + 1,
					};
				});
			} else {
				this.setState({
					isStarted: false,
				});
				clearInterval(this.timer);
			}
		}, 1000);

		const { onStartTimer, elId } = this.props;
		onStartTimer(elId);
	};

	onPaused = () => {
		this.setState({
			isStarted: false,
		});

		clearInterval(this.timer);
	};

	render() {
		const { total, isStarted } = this.state;

		const { couldStart } = this.props;

		const min = Math.floor(total / 60);
		const sec = Math.floor(total - min * 60);

		return (
			<span className="timer-block">
				<button
					onClick={!isStarted && couldStart ? this.onStart : null}
					aria-label="play timer"
					type="button"
					className={`icon icon-play ${!isStarted && couldStart ? 'active' : null}`}
				/>
				<button
					onClick={isStarted ? this.onPaused : null}
					aria-label="pause timer"
					type="button"
					className={`icon icon-pause ${isStarted && couldStart ? 'active' : null}`}
				/>
				<span>{`${min}:${sec < 10 ? `0${sec}` : sec}`}</span>
			</span>
		);
	}
}

Timer.propTypes = {
	onStartTimer: PropTypes.func.isRequired,
	elId: PropTypes.number.isRequired,
	isCurrentTimer: PropTypes.bool.isRequired,
	couldStart: PropTypes.bool.isRequired,
};
