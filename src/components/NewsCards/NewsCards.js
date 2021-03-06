import React from 'react';
import { Grid, Grow, Typography } from '@material-ui/core';
import NewsCard from '../NewsCard/NewsCard';
import useStyles from './styles.js';


export const NewsCards = ({articles}) => {
    const classes = useStyles();

    return (
        <Grow in>
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {articles.map((article, index)=> (
                    <Grid item xs={12} sm={8} md={4} lg={3} style={{display:'flex'}}>
                        <NewsCard article={article} i={index}/>
                    </Grid>
                    
                ))
            }
            </Grid>
            
        </Grow>
    ) 
}

export default NewsCards;