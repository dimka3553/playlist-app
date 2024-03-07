import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full flex items-center justify-center">
            <div className="max-w-[1200px] w-full h-[42px] flex items-center justify-between">
                <Link href="/" >
                    <p className="text-[16px] font-bold">Playlist App</p>
                </Link>
            </div>
        </nav>
    )
}