import React from "react";
import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
class Home extends React.Component {
  state = {};

  async componentDidMount() {
    fetch(`${process.env.REACT_APP_BACKEND_API}/articles`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ articles: data });
      })
      .catch(console.error);
  }

  render() {
    const { articles = [] } = this.state;

    return [
      <Row>
        <Col md={8} style={{ margin: "auto", textAlign: "center" }}>
          <h1>Home Page</h1>
        </Col>
      </Row>,
      <Row>
        {articles.map((article) => (
          <Col md={8} style={{ margin: "auto", textAlign: "center" }}>
            <Card style={{ margin: "10px" }} key={article.id}>
              <Card.Img variant="top" src={article.imageUrl} sizes="16" />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.description}</Card.Text>
                <Card.Link href={`/view-article/${article.id}`}>
                  read more
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>,
    ];
  }
}

export default Home;
