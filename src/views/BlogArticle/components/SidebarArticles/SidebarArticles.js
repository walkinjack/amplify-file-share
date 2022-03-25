/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { StaticQuery, graphql } from 'gatsby';
import ArticleCard from './ArticleCard';

class SidebarArticles extends React.Component {
  constructor(props) {
    super(props);
  }

  getTitleSection(title, articles) {
    return (
      <React.Fragment>
        <Typography
          variant='h6'
          data-aos={'fade-up'}
          sx={{
            fontWeight: 700,
            marginBottom: 2,
          }}
        >
          {title}
        </Typography>
        <Grid container spacing={2}>
          {articles.map((article, k) =>
            <ArticleCard item={article} k={k} />,
          )}
        </Grid>
      </React.Fragment>
    );
  }

  render() {

    return (
      <Box component={Card} variant={'outlined'} padding={2}>
        {this.props.previous ? this.getTitleSection('Previous Post', [this.props.previous]) : ''}
        {this.props.next ? this.getTitleSection('Next Post', [this.props.next]) : ''}
          <StaticQuery query={graphql`
            query {
                site {
                    siteMetadata {
                        title
                    }
                }
                allMarkdownRemark(limit: 4, sort: { fields: [frontmatter___date], order: DESC }) {
                  nodes {
                      excerpt
                      fields {
                          slug
                      }
                      frontmatter {
                          date(formatString: "MMMM DD, YYYY")
                          title
                          description
                          author
                          thumbnail  {
                              childImageSharp {
                                  fluid(maxWidth: 150, quality: 75) {
                                      ...GatsbyImageSharpFluid
                                  }
                              }
                          }
                      }
                  }
                }
            }
        `}
         render={data => (
           this.getTitleSection('Latest Posts', data.allMarkdownRemark.nodes)
         )}
          />

      </Box>
    );
  }
}

export default SidebarArticles;