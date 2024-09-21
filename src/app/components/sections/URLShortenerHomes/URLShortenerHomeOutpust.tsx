type URLShortenerHomeOutpustPops = {
    shortCode: string,
    shortUrl: string,
    url: string,
    isExist: boolean
}
const URLShortenerHomeOutpust = ({ shortCode, shortUrl, url, isExist }: URLShortenerHomeOutpustPops) => {
    return (
        <div className="lg:w-[1048px] mx-auto w-[80%] min-h-[800px] text-[#171717]">
            <nav className="border-orange-400 border-[2px] rounded-xl mt-3 flex items-center bg-[#ffffE0]">
                {isExist ? (
                    <p className="text-20px p-[20px] m-[5px]">Captcha could not be verified. Please try again.</p>
                ) : (
                    <p className="text-20px p-[20px] m-[5px]">Your URL has been saved. Here is your new code and short URL.</p>
                )}
            </nav>
            <nav className="border-orange-500 border-[2px] rounded-xl p-2 mt-5">
                <h1 className="text-20px">Code for Downloader App</h1>
                <div className="flex justify-between items-center ml-[40px]">
                    <p className="text-[60px]"> {shortCode}</p>
                    <div className="flex items-end justify-end h-[90px] w-50%">

                        <button
                            className="bg-orange-500 h-[33px] p-[5px] rounded-[4px] m-[10px] text-[20px] flex items-center justify-center "
                            onClick={() => {
                                navigator.clipboard.writeText(shortCode)
                                    .then(() => {
                                        alert("Mã đã được sao chép vào clipboard!");
                                    })
                                    .catch(err => {
                                        console.error("Không thể sao chép mã: ", err);
                                    });
                            }}
                        >Copy Code</button>

                    </div>
                </div>
            </nav>
            <nav className="border-orange-500 border-[2px] rounded-xl p-2 mt-5">
                <h1 className="text-20px">Short URL</h1>
                <div className="flex justify-between items-center ml-[40px]">
                    <p className="text-[38px]"> {shortUrl}</p>
                    <div className="flex items-end justify-end h-[90px] w-50%">

                        <button
                            className="bg-orange-500 h-[33px] p-[5px] rounded-[4px] m-[10px] text-[20px] flex items-center justify-center "
                            onClick={() => {
                                navigator.clipboard.writeText(shortUrl)
                                    .then(() => {
                                        alert("URL đã được sao chép vào clipboard!");
                                    })
                                    .catch(err => {
                                        console.error("Không thể sao chép URL: ", err);
                                    });
                            }}
                        >Copy URL</button>

                    </div>
                </div>
            </nav>
            <nav className="border-orange-500 border-[2px] rounded-xl p-2 mt-5">
                <h1 className="text-20px">Destination URL</h1>
                <div className="flex justify-between items-center ml-[40px]">
                    <p className="text-[20px]"> {url}</p>
                    <div className="flex items-end justify-end h-[90px] w-[160px]">
                        <button
                            className="bg-orange-500 h-[33px] p-[5px] rounded-[4px] m-[10px] text-[20px] flex items-center justify-center "
                            onClick={() => {
                                navigator.clipboard.writeText(url)
                                    .then(() => {
                                        alert("URL đã được sao chép vào clipboard!");
                                    })
                                    .catch(err => {
                                        console.error("Không thể sao chép URL: ", err);
                                    });
                            }}
                        >Copy URL</button>
                    </div>
                </div>
            </nav>
            <nav>
                <div className="mt-5 ml-2">
                    <p className="text-[20px]">Usage</p>
                </div>
                <div className="mt-5 ml-2">
                    <p className="text-[20px]" >Enter the code <span className="font-bold">{shortCode}</span> in the <a href="https://www.aftvnews.com/downloader" className="text-orange-500 hover:text-black">Downloader app</a> to load the destination URL.</p>
                </div>
                <div className="mt-5 ml-2">
                    <p className="text-[20px]" >Enter <span className="font-bold">{shortUrl}</span> in any browser to load the destination URL.</p>
                </div>
                <div className="mt-5 ml-2 mb-5">
                    <p className="text-[20px]" >The permalink for this info page is <span className="font-bold">{shortUrl}</span></p>
                </div>
            </nav>
        </div >
    )
}
export default URLShortenerHomeOutpust;