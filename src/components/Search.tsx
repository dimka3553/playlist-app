import { useState } from 'react'

type SearchProps = {
    search: string;
    setSearch: (search: string) => void;
}

export default function Search(
    { search, setSearch }: SearchProps
) {

    return (
        <div>
            <div className='flex items-center border border-n200 rounded-[4px] h-[32px] gap-[10px] relative w-full'>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="none"
                    viewBox="0 0 14 14"
                    className='z-[4] absolute ml-[10px]'
                >
                    <path
                        fill="#8A90B6"
                        d="M13.788 12.769L10.58 9.56l.12-.167a5.915 5.915 0 10-1.31 1.312l.166-.12 3.21 3.205a.74.74 0 001.023 0 .724.724 0 000-1.022zm-7.862-2.382a4.46 4.46 0 110-8.918 4.46 4.46 0 010 8.918z"
                    ></path>
                </svg>
                <input type="text" placeholder='Search' className='w-full h-full absolute pl-[34px] rounded-[4px]' value={search} onChange={
                    (e) => { setSearch(e.target.value) }
                } />
            </div>
        </div>
    )
}
