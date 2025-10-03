import React from "react";
import LightRays from "./components/LightRays";

const App = () => {
	return (
		<div>
			<div style={{ width: '100%', height: '600px', position: 'fixed' }}>
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

      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-5xl font-bold">25 + 5 Clock</h1>
      </div>
		</div>
	);
};

export default App;
