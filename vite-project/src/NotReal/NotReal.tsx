import React, { useState } from 'react';
import NotRealMenu from "./NotRealMenu";
import NotRealCanvas from "./NotRealCanvas";
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