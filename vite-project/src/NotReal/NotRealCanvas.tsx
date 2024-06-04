import React, { useContext } from 'react';

import ShaderLab from "./ShaderLab";
import DynamicTorus from "./DynamicTorus";
import ShaderEngineFBO from './ShaderEngineFBO';
import ThreeFiberBasics from './ThreeFiberBasics';
import ParticleSimulator from "./ParticleSimulator";
import ThreeFiberDefault from "./ThreeFiberDefault";
import ThreeFiberDreiLeva from "./ThreeFiberDreiLeva";
import FBOParticlesChaotic from "./FBOParticlesChaotic";
import FBOParticlesGeometric from "./FBOParticlesGeometric";

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
            width: "100vw",
            height: "100vh",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        }}>
            {(() => {
                switch (selectedComponent) {
                    case 'ThreeFiberBasics':
                        return <ThreeFiberBasics />;
                    case 'ThreeFiberDreiLeva':
                        return <ThreeFiberDreiLeva />;
                    case 'ShaderEngineFBO':
                        return <ShaderEngineFBO />;
                    case 'ShaderLab':
                        return <ShaderLab />;
                    case 'DynamicTorus':
                        return <DynamicTorus />;
                    case 'ParticleSimulator':
                        return <ParticleSimulator />;
                    case 'FBOParticlesChaotic':
                        return <FBOParticlesChaotic />;
                    case 'FBOParticlesGeometric':
                        return <FBOParticlesGeometric />;
                    case 'x':
                        return <ThreeFiberDefault />;
                    default:
                        return <ShaderEngineFBO />;
                }
            })()}
        </div>
    );
}


export default NotRealCanvas;