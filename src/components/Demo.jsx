import { useState } from "react";


const Demo = () => {
    const [article, setArticle] = useState({
        url: "",
        summary: "",
    });

   

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
        
    );
};

export default Demo;
