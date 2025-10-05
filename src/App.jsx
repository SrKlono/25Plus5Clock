import { useState } from "react";
import LightRays from "./components/LightRays";
import {
	ArrowLeftCircleIcon,
	ArrowRightCircleIcon,
	PauseIcon,
	PlayIcon,
	RewindIcon,
} from "lucide-react";
import { useTimer } from "react-timer-hook";
import { formatTime } from "./lib/utils";

const App = () => {
	const [breakLength, setBreakLength] = useState(5);
	const [sessionLength, setSessionLength] = useState(25);
	const [inBreak, setInBreak] = useState(false);

	const getTime = () => {
		let time = new Date();
		time.setSeconds(time.getSeconds() + sessionLength * 60);
		return time;
	};

	const setTime = (value) => {
		let time = new Date();
		time.setSeconds(time.getSeconds() + value * 60);
		return time;
	};

	const handleTimeout = async () => {
		document.getElementById("beep").play();
		await new Promise((r) => setTimeout(r, 1000));
		setInBreak(!inBreak);
		!inBreak
			? restart(setTime(breakLength))
			: restart(setTime(sessionLength));
	};

	const {
		totalSeconds,
		milliseconds,
		seconds,
		minutes,
		hours,
		days,
		isRunning,
		start,
		pause,
		resume,
		restart,
	} = useTimer({
		expiryTimestamp: getTime,
		onExpire: handleTimeout,
		autoStart: false,
		interval: 20,
	});

	const reset = () => {
		setBreakLength(5);
		setSessionLength(25);
		setInBreak(false);
		let sound = document.getElementById("beep");
		sound.pause();
		sound.currentTime = 0;

		restart(setTime(25));
		pause();
	};

	return (
		<div>
			<div style={{ width: "100%", height: "600px", position: "fixed" }}>
				<LightRays
					raysOrigin="top-center"
					raysColor="#00ffff"
					raysSpeed={1.5}
					lightSpread={0.8}
					rayLength={1.2}
					followMouse={false}
					mouseInfluence={0.1}
					noiseAmount={0.1}
					distortion={0.05}
					className="h-screen"
				/>
			</div>

			<div className="min-h-screen flex flex-col justify-center items-center">
				<div className="px-12 py-8 flex flex-col gap-6 rounded-2xl backdrop-filter backdrop-blur-2xl border-2 border-gray-100/15">
					<div className="flex justify-center gap-6 [&>*]:text-2xl">
						<div className="text-center">
							<h4
								id="break-label"
								className=" text-white/30 font-semibold"
							>
								Break Length
							</h4>
							<div className="flex justify-center items-center gap-2">
								<button
									id="break-decrement"
									className="btn-sm"
									onClick={() =>
										setBreakLength(
											Math.max(breakLength - 1, 1)
										)
									}
								>
									<ArrowLeftCircleIcon className="size-7" />
								</button>
								<span id="break-length">{breakLength}</span>
								<button
									id="break-increment"
									className="btn-sm"
									onClick={() =>
										setBreakLength(
											Math.min(breakLength + 1, 60)
										)
									}
								>
									<ArrowRightCircleIcon className="size-7" />
								</button>
							</div>
						</div>
						<div className="text-center">
							<h4
								id="session-label"
								className=" text-white/30 font-semibold"
							>
								Session Length
							</h4>
							<div className="flex justify-center items-center gap-2">
								<button
									id="session-decrement"
									className="btn-sm"
									onClick={() => {
										let value = Math.max(
											sessionLength - 1,
											1
										);
										setSessionLength(value);
										if (!isRunning) {
											restart(setTime(value));
											pause();
										}
									}}
								>
									<ArrowLeftCircleIcon className="size-7" />
								</button>
								<span id="session-length">{sessionLength}</span>
								<button
									id="session-increment"
									className="btn-sm"
									onClick={() => {
										let value = Math.min(
											sessionLength + 1,
											60
										);
										setSessionLength(value);
										if (!isRunning) {
											restart(setTime(value));
											pause();
										}
									}}
								>
									<ArrowRightCircleIcon className="size-7" />
								</button>
							</div>
						</div>
					</div>

					<div className="text-center rounded-2xl p-4 bg-gray-100/1 border-2 border-gray-100/15 ">
						<h4
							id="timer-label"
							className="text-3xl text-white/30 font-bold"
						>
							{inBreak ? (
								<span>Break</span>
							) : (
								<span>Session</span>
							)}
						</h4>
						<h2 id="time-left" className="text-8xl">
							{formatTime(totalSeconds)}
						</h2>
						<audio id="beep" src="/alarm_clock.mp3" />
					</div>

					<div className="flex gap-2 justify-center">
						<button
							id="start_stop"
							className="btn"
							onClick={() => (isRunning ? pause() : resume())}
						>
							{isRunning ? (
								<PlayIcon className="size-10" />
							) : (
								<PauseIcon className="size-10" />
							)}
						</button>

						<button id="reset" className="btn" onClick={reset}>
							<RewindIcon className="size-10" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
