import React, { useEffect }from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

const alanKey='02c73ee0ad51271f7d61f45d31e434aa2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {

    useEffect(()=>{
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles}) => {
                    if(command === 'newHeadlines'){
                        console.log(articles);
                    }
            }
        });
    }, [])
    return(
        <div>
            <h1>Alan Ai News App</h1>
        </div>
    )
}

export default App;