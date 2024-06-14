import React, { useContext } from 'react';

import Generative2D from "./Generative2D";
import RayMarchingExample from "./RayMarchingExample";
import DynamicTorus from "./DynamicTorus";
import ShaderEngineFBO from './ShaderEngineFBO';
import ThreeFiberBasics from './ThreeFiberBasics';
import ParticleSimulator from "./ParticleSimulator";
import ThreeFiberDefault from "./ThreeFiberDefault";
import ThreeFiberDreiLeva from "./ThreeFiberDreiLeva";
import FBOParticlesChaotic from "./FBOParticlesChaotic";
import FBOParticlesGeometric from "./FBOParticlesGeometric";
import ShaderLab from './ShaderLab';

interface CanvasContextProps {
    selectedComponent: string;
    setSelectedComponent: (value: string) => void;
}

export const CanvasContext = React.createContext<CanvasContextProps>({
    selectedComponent: '',
    setSelectedComponent: () => { },
});

const NotRealCanvas: React.FC = () => {
    const { selectedComponent } = useContext(CanvasContext);

    return (
        <div style={{
            zIndex: -99,
            background: "black",
            // width: 600*0.9,
            // height: 600*0.9,
            position: "absolute",
        }}>
            {(() => {
                switch (selectedComponent) {
                    case 'ThreeFiberBasics':
                        return <ThreeFiberBasics />;
                    case 'ThreeFiberDreiLeva':
                        return <ThreeFiberDreiLeva />;
                    case 'ShaderEngineFBO':
                        return <ShaderEngineFBO />;
                    case 'Generative2D':
                        return <Generative2D />;
                    case 'DynamicTorus':
                        return <DynamicTorus />;
                    case 'ParticleSimulator':
                        return <ParticleSimulator />;
                    case 'FBOParticlesChaotic':
                        return <FBOParticlesChaotic />;
                    case 'FBOParticlesGeometric':
                        return <FBOParticlesGeometric />;
                    case 'FBOParticlesGeometric':
                        return <FBOParticlesGeometric />;
                    case 'RayMarchingExample':
                        return <RayMarchingExample />;
                    case 'x':
                        return <ThreeFiberDefault />;
                    case 'ShaderLab':
                        return <ShaderLab />;
                    default:
                        return <ShaderLab />;
                }
            })()}
        </div>
    );
}


export default NotRealCanvas;