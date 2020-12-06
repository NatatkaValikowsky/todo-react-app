import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './timer.css';

const Timer = ({ couldStart, isCurrentTimer, onStartTimer, elId }) => {
	const [ total, setTotal ] = useState(0);
	const [ isStarted, setIsStarted ] = useState(false);
	const [currIntervalId, setCurrIntervalId] = useState(null);

	const onStart = () => {
		const timer = setInterval(() => {
			setTotal((totalState) => totalState + 1);
		}, 1000);
		setCurrIntervalId(timer);
		setIsStarted(true);
		onStartTimer(elId);
	};

	const onPaused = () => {
		setIsStarted(false);
		clearInterval(currIntervalId);
	};

	useEffect(() => {
		if(!isCurrentTimer){
			clearInterval(currIntervalId);
			setIsStarted(false);
		}
	},[isCurrentTimer, currIntervalId]);

	const min = Math.floor(total / 60);
	const sec = Math.floor(total - min * 60);

	return (
		<span className="timer-block">
				<button
					onClick={ !isStarted && couldStart ? onStart : null }
					aria-label="play timer"
					type="button"
					className={`icon icon-play ${!isStarted && couldStart ? 'active' : null}`}
				/>
				<button
					onClick={ isStarted ? onPaused : null }
					aria-label="pause timer"
					type="button"
					className={`icon icon-pause ${isStarted && couldStart ? 'active' : null}`}
				/>
				<span>{`${min}:${sec < 10 ? `0${sec}` : sec}`}</span>
			</span>
	);
};

export default Timer;

Timer.propTypes = {
	couldStart: PropTypes.bool.isRequired,
	isCurrentTimer: PropTypes.bool.isRequired,
	onStartTimer:PropTypes.func.isRequired,
	elId: PropTypes.number.isRequired
};
