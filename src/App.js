import React, { useState, useEffect }from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards'
import useStyles from './styles';

const alanKey='02c73ee0ad51271f7d61f45d31e434aa2e956eca572e1d8b807a3e2338fdd0dc/stage';


const App = () => { 
    const[newsArticles,setNewsArticles] = useState([]);
    const[activeArticle,setActiveArticle]=useState(-1);            // index of active article while reading
    const classes = useStyles();

    useEffect(()=>{
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles}) => {
                    if(command === 'newHeadlines'){
                        setNewsArticles(articles);
                        setActiveArticle(-1);
                    }
                    else if(command === 'highlight'){
                        setActiveArticle((prevActiveArticle)=> prevActiveArticle + 1);
                    }
            }
        });
    }, []);


    return(
        <div>
            <div className={classes.logoContainer}>
                {/* <img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt="logo" /> */}
                <h1>Find news using voice command</h1>
            </div>

            <h1>Alan AI News App</h1>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    )

}


export default App;