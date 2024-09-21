import Image from "next/image";

const Header = () => {
    return (
        <header className="flex items-center justify-center h-[60px] bg-[#585858] text-white shadow-md ">
            <div className="lg:w-[1024px] w-[90%] max-w-6xl mx-auto flex items-center justify-between">
                <a href="/" className="flex items-center space-x-2">
                    <div className="relative w-[200px] aspect-[200/31]">
                        <Image
                            src={'/images/img-header/logo-aftvnews-200x31-1.png'}
                            alt="Logo"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span className="text-[42px] font-semibold ml-4">URL Shortener</span>
                </a>
            </div>
        </header>
    );
};

export default Header;
