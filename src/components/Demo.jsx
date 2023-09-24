import { useEffect, useState } from "react";

import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
    const [article, setArticle] = useState({
        url: "",
        summary: "",
    });

    const [allArticles, setAllArticles] = useState([]);
    const [copied, setCopied] = useState("");

    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

    // Load data from localStorage on mount
    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(
            localStorage.getItem("articles")
        );

        if (articlesFromLocalStorage) {
            setAllArticles(articlesFromLocalStorage);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const existingArticle = allArticles.find(
            (item) => item.url === article.url
        );

        if (existingArticle) return setArticle(existingArticle);

        const { data } = await getSummary({ articleUrl: article.url });
        if (data?.summary) {
            const newArticle = { ...article, summary: data.summary };
            const updatedAllArticles = [newArticle, ...allArticles];

            // update state and local storage
            setArticle(newArticle);
            setAllArticles(updatedAllArticles);
            localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
        }





    };

    const handleCopy = (copyUrl) => {
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        setTimeout(() => setCopied(false), 3000);
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSubmit(e);
        }
    };

    return (
        <section className='mt-16 w-full max-w-xl'>
            {/* Search */}
            <div className='flex flex-col w-full gap-2'>
                <form
                    className='relative flex justify-center items-center'
                    onSubmit={handleSubmit}
                >
                    <img
                        src={linkIcon}
                        alt='link-icon'
                        className='absolute left-0 my-2 ml-3 w-5'
                    />

                    <input
                        type='url'
                        placeholder='Paste the article link'
                        value={article.url}
                        onChange={(e) => setArticle({ ...article, url: e.target.value })}
                        onKeyDown={handleKeyDown}
                        required
                        className='url_input peer'
                    />
                    <button
                        type='submit'
                        className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 '
                    >
                        <p>↵</p>
                    </button>
                </form>
            </div>


        </section>
    );
};

export default Demo;
