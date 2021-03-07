import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';

import NewsCards from './components/NewsCards/NewsCards'
import useStyles from './styles';

const App = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: '02c73ee0ad51271f7d61f45d31e434aa2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'instructions') {
          setIsOpen(true);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
        {/* <img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt="logo" /> */}
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      
      
    </div>
  );
};


// import React, { useState, useEffect }from 'react';
// import alanBtn from '@alan-ai/alan-sdk-web';
// import NewsCards from './components/NewsCards/NewsCards'
// import useStyles from './styles';
// import wordsToNumbers from 'words-to-numbers';

// const alanKey='02c73ee0ad51271f7d61f45d31e434aa2e956eca572e1d8b807a3e2338fdd0dc/stage';


// const App = () => { 
//     const[newsArticles,setNewsArticles] = useState([]);
//     const[activeArticle,setActiveArticle]=useState(-1);            // index of active article while reading
//     const classes = useStyles();

//     useEffect(()=>{
//         alanBtn({
//             key: alanKey,
//             onCommand: ({ command, articles, number}) => {
//                     if(command === 'newHeadlines'){
//                         setNewsArticles(articles);
//                         setActiveArticle(-1);
//                     }
//                     else if(command === 'highlight'){
//                         setActiveArticle((prevActiveArticle)=> prevActiveArticle + 1);
//                     }
//                     else if (command === 'open') {
//                         const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
//                         const article = articles[parsedNumber - 1];
              
//                         if (parsedNumber > articles.length) {
//                           alanBtn().playText('Please try that again...');
//                         } else if (article) {
//                           window.open(article.url, '_blank');               // open the url of that news in new page
//                           alanBtn().playText('Opening...');
//                         } else {
//                           alanBtn().playText('Please try that again...');
//                         }
//                       }
//             }
//         });
//     }, []);


//     return(
//         <div>
//             <div className={classes.logoContainer}>
//                 {/* <img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt="logo" /> */}
//                 <h1>Find news using voice command</h1>
//             </div>

//             <h1>Alan AI News App</h1>
//             <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
//         </div>
//     )

// }


export default App;