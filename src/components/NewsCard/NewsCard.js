import React, { useState, useEffect, createRef} from 'react';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import useStyles from './styles';



export const NewsCard = ({article:{ description, publishedAt, source, title, url, urlToImage }, i,activeArticle }) => {
    const classes = useStyles();
    const [elRefs,setElRefs] = useState([]);        // element ref for scrolling automatically
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop -50);   // this will get the active article's ref and will scrol over top of that card

    useEffect(()=> {
      setElRefs((refs)=> Array(20).fill().map((_,j) => refs[j] || createRef()));        // creating refs for all cards when page is loaded, 20 because there are 20 articles
    },[]);

    useEffect(()=> {
        if( i === activeArticle && elRefs[activeArticle])     // if i=== active artciles and we have ref to active article
        {
          scrollToRef(elRefs[activeArticle]);
        }
    
      },[i, activeArticle,elRefs]);
    
    return (
        <Card ref={elRefs[i]}  className={ activeArticle === i ? classes.activeCard : classes.card}>
          <CardActionArea href={url} target="_blank">       
            <CardMedia className={classes.media} image={urlToImage || 'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png'} title={title} />
            <div className={classes.details}>
              <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
              <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{title}</Typography>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.cardActions}>
            <Button size="small" color="primary" href={url}>Learn More</Button>
            <Typography variant="h5" color="textSecondary" component="h2">{i + 1}</Typography>
          </CardActions>
        </Card>
      );
}

export default NewsCard;