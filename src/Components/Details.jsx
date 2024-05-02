import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { id_url, image_url } from "../api/api_url";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Col, Container, Row } from "react-bootstrap";

const Details = () => {
  let [state, setState] = useState();

  let { id } = useParams();
  console.log("blog id is:", id);

  useEffect(() => {
    axios
      .get(`${id_url}${id}`)
      .then((res) => {
        console.log("Get: ", res.data.data);
        setState(res.data.data);
      })
      .catch((err) => {
        console.log("Get Error: ", err);
      });
  }, [setState, id_url, id]);

  // console.log("state: ", state);

  return (
    <>
      <Container>
        <Row>
          <Col lg={6} style={{ margin: "auto", paddingTop: "50px" }}>
          <Card>
            <img src={image_url + `${id}`} alt="" className="img-fluid" />
            <p className="p-3">{state?.postText}</p>
          </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Details;
