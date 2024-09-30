import Image from "next/image"
import { Dispatch, SetStateAction } from "react"

type URLShortenerHomeInputPop = {
    setUrl: Dispatch<SetStateAction<string>>,
    url: string,
    handleShorten: () => void,
}

const URLShortenerHomeInput = ({ setUrl, url, handleShorten }: URLShortenerHomeInputPop) => {

    return (
        <div className="">
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-1 lg:flex lg:w-[1048px]">
                    <nav className="lg:w-[265.83px] w-[80%] m-[10px]">
                        <div className="w-full  flex justify-center items-center mb-[20px]">
                            <h1 className="text-[34px] font-bold text-center">Shorten URLs for the Downloader App and more!</h1>
                        </div>
                        <div>
                            <p className="text-[20px] mb-1">The AFTVnews URL Shortener is the easiest and quickest way to load a URL in the <a href="" className="text-orange-400 hover:text-black">Downloader App</a> on Amazon Fire TV and Google Android TV devices. </p>
                            <h2 className="text-[20px] font-bold mt-5">How it works:</h2>
                            <p className="text-[20px]"> {`Enter any URL to get a short numeric code, like 12345, that can then be entered directly into the URL field in the Downloader App. You'll also get a matching short URL, like aftv.news/12345, that can be used and shared anywhere.`}</p>
                        </div>
                    </nav>
                    <nav className="max-w-[779px] w-full mx-auto flex justify-center items-center">
                        <div className="w-full aspect-[778.17/671.98] relative">
                            <Image
                                src="/images/img/hero_full.png"
                                alt="Background Image"
                                className="object-cover"
                                fill
                            />
                        </div>
                    </nav>

                </div>
            </div>
            <div className="bg-orange-500">
                <nav className="flex justify-center items-center py-5">
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Paste your long URL here"
                        className="w-[1024px] h-[77px] text-[24px] px-4 rounded-md"
                    />
                </nav>
                <nav className="flex justify-center items-center">
                    <button onClick={handleShorten} className="w-[1024px] h-[50px] bg-[#3d3d3d] text-white text-[24px] rounded-md hover:bg-white hover:text-black">Shorten URL</button>
                </nav>
                <nav className="flex justify-center items-center pb-5">
                    <p className="text-[14px]">All submitted URLs will be publicly viewable by anyone.</p>
                </nav>
            </div>
        </div>
    )
}
export default URLShortenerHomeInput
