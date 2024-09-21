"use client";

import { useState, useEffect } from 'react';

type RedirectComponentProps = {
    url: string | null;
};

const RedirectComponent: React.FC<RedirectComponentProps> = ({ url }) => {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    window.location.href = url || '/';
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [url]);

    const handleRedirect = () => {
        window.location.href = url || '/';
    };

    return (
        <div className='w-[1024px] mx-auto'>
            <nav className='flex items-center justify-center'>
                <h1 className='text-[60px] font-bold'>Redirecting...</h1>
            </nav>
            <nav className="border-orange-400 border-[2px] rounded-xl mt-3 items-center ">
                <p className="text-[20px] my-2">Bạn sẽ được chuyển đến: <span className='font-bold'>{url} </span></p>
                <p className="text-[20px] my-2">Chuyển hướng sau <span className='font-bold'>{countdown}</span> giây...</p>
                <p className="text-[20px] my-2">Nhấn vào nút bên dưới để di chuyển ngay:</p>
                <button onClick={handleRedirect} className='bg-orange-500 h-[33px] p-[5px] rounded-[4px] m-[10px] text-[20px] flex items-center justify-center'>Di chuyển</button>
            </nav>
        </div>
    );
};

export default RedirectComponent;
