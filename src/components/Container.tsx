import React from 'react'
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function Container(
    {
        children
    }: Props
) {
    return (
        <main className="w-full flex items-center justify-center">
            <div className='max-w-[1200px] w-full'>
                {children}
            </div>
        </main>
    )
}
