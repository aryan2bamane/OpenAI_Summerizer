import { useState } from "react";


const Demo = () => {
    const [article, setArticle] = useState({
        url: "",
        summary: "",
    });

   

   

        




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
