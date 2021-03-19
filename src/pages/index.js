import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/index.scss"
import dnaBg from "../images/bg.svg"

const IndexPage = ({ data }) => (
  <>
    <header>
      <GatsbyImage image={getImage(data.banner)} alt="" />
      <div className="title-wrap"></div>
      <h1 className="home-title">Imaging platform</h1>
      <div className="head-banner"></div>
    </header>
    <Layout>
      <img className="dna-bg" src={dnaBg} />
      <div className="content">
        <section className="intro">
          <h1>Leading Research</h1>
          <div className="title-underline" />
          <p className="intro-text">
            Lorem ipsum dolor sit amet,{" "}
            <strong>consectetur adipiscing elit</strong>, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.{" "}
            <strong>
              Duis aute irure dolor in reprehenderit in voluptate velit
            </strong>{" "}
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </section>
        <section id="news">
          <h1>Latest News</h1>
          <div className="title-underline" />
          <div className="news-container">
            {data.news.nodes.map((item, index) => (
              <NewsEntry data={item.childMarkdownRemark} key={index} />
            ))}
          </div>
        </section>
      </div>
      <SEO title="Home" />
    </Layout>
  </>
)

const NewsEntry = ({ data }) => {
  return (
    <div className="news-entry">
      <Link to="/">
        <div className="news-image">
          <GatsbyImage
            className="news-image"
            image={getImage(data.frontmatter.featuredImage)}
            alt=""
          />
        </div>
        <div className="news-content">
          <h3>{data.frontmatter.title}</h3>
          <div className="news-text-divider" />
          <div
            className="news-text"
            dangerouslySetInnerHTML={{
              __html: data.html,
            }}
          />
          <div className="read-more">Read more {">"}</div>
        </div>
      </Link>
    </div>
  )
}

export const query = graphql`
  query {
    banner: file(relativePath: { eq: "dna-banner.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 1920)
      }
    }
    news: allFile(
      sort: { fields: birthTime, order: DESC }
      filter: { absolutePath: { regex: "/news//" } }
    ) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            featuredImage {
              childImageSharp {
                gatsbyImageData(width: 920)
              }
            }
            title
          }
          html
        }
      }
    }
  }
`

export default IndexPage
