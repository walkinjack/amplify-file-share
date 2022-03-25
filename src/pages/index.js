import * as React from 'react';
import { Link, graphql } from "gatsby";
import IndexView from 'views/IndexView';

const IndexPage = () => {
  return <IndexView />;
};

export default IndexPage;

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
                }
            }
        }
    }
`
