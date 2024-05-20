import React, { useState } from 'react';
import NotRealCanvas from "./NotRealCanvas";
import NotRealMenu from "./NotRealMenu";
import { CanvasContext } from './NotRealCanvas';

const NotReal: React.FC = () => {
    const [selectedComponent, setSelectedComponent] = useState<string>('');

    return (
        <CanvasContext.Provider value={{ selectedComponent, setSelectedComponent }}>
            <NotRealMenu />
            <NotRealCanvas />
        </CanvasContext.Provider>
    );
}
 
export default NotReal;