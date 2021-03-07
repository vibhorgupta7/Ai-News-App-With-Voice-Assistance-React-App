import React from 'react';
import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import NewsCard from '../NewsCard/NewsCard';
import useStyles from './styles.js';

const infoCards = [
    { color: '#00838f', title: 'Latest News', text: 'Give me the latest news' },
    { color: '#1565c0', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
    { color: '#4527a0', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...etc', text: 'What\'s up with PlayStation 5' },
    { color: '#283593', title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...etc', text: 'Give me the news from CNN' },
  ];

const NewsCards = ({articles, activeArticle}) => {
    const classes = useStyles();

    if (!articles.length) {
        return (
          <Grow in>
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">AI News App with Voice Assistance</Typography>
            </AppBar>
              {infoCards.map((infoCard) => (
                <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoCard}>
                  <div className={classes.card} style={{ backgroundColor: infoCard.color }}>
                    <Typography variant="h5" component="h5"><b>{infoCard.title}</b></Typography>
                    {infoCard.info ? <Typography variant="h6" component="h6"><strong>{infoCard.title.split(' ')[2]}</strong>: <br /><i>{infoCard.info}</i></Typography> : null}
                    <Typography variant="h5" component="h6"><b>Try saying:</b> <br /> <i>{infoCard.text}</i></Typography>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grow>
        );
      }

    return (
        <Grow in>
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            
            {articles.map((article, index)=> (
                    <Grid item xs={12} sm={8} md={4} lg={3} style={{display:'flex'}}>
                        <NewsCard article={article} activeArticle={activeArticle}i={index}/>
                    </Grid>
                    
                ))
            }
            </Grid>
            
        </Grow>
    ) 
}

export default NewsCards;