import React from "react";
import LightRays from "./components/LightRays";
import {
	ArrowLeftCircleIcon,
	ArrowRightCircleIcon,
	PauseIcon,
	PlayIcon,
	RewindIcon,
} from "lucide-react";

const App = () => {
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
							<h4>Break Length</h4>
							<div className="flex justify-center items-center gap-2">
								<button>
									<ArrowLeftCircleIcon className="size-7" />
								</button>
								<span>5</span>
								<button>
									<ArrowRightCircleIcon className="size-7" />
								</button>
							</div>
						</div>
						<div className="text-center">
							<h4>Session Length</h4>
							<div className="flex justify-center items-center gap-2">
								<button>
									<ArrowLeftCircleIcon className="size-7" />
								</button>
								<span>25</span>
								<button>
									<ArrowRightCircleIcon className="size-7" />
								</button>
							</div>
						</div>
					</div>

					<div className="text-center rounded-2xl p-4 bg-gray-100/1 border-2 border-gray-100/15 ">
						<h4 className="text-3xl">Session</h4>
						<h2 className="text-8xl">25:00</h2>
					</div>

					<div className="flex gap-2 justify-center">
						<button className="transition-transform hover:scale-120">
							<PlayIcon className="size-10" />
						</button>

						<button className="transition-transform hover:scale-120">
							<PauseIcon className="size-10" />
						</button>

						<button className="transition-transform hover:scale-120">
							<RewindIcon className="size-10" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
