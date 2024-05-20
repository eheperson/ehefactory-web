import React, { useState, useEffect } from 'react';

interface HomeProps {
    handleClick: (yo: string, e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Home: React.FC<HomeProps> = () => {
    const [count, setCount] = useState(0);
    const [title, setTitle] = useState(". . . ehe . . .");
    const [yo, setYo] = useState('yo');

    const handleIncrement = () => {
        setCount(count + 1);
        const generateRandomString = () => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            const length = 10;
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                result += characters.charAt(randomIndex);
            }
            return result;
        };

        const randomString = generateRandomString();
        setTitle(randomString);
    };

    useEffect(() => {
        console.log('use effect ran - change in yo');
        // alert('use effect ran');
    }, [yo]);

    return (
        <div className='home'>
            <h2>Homepage</h2>
            <h2>{title}</h2>
            <h2>{yo}</h2>
            <p>Count: {count}</p>
            <button onClick={handleIncrement}>Increment</button>
            <button onClick={() => setYo('yooo')}>change yo</button>

        </div>
    );
};

export default Home;
