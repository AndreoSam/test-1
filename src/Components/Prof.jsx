import React, { useEffect, useState } from "react";
import { get_url, image_url } from "../api/api_url";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Prof.css";

const Prof = () => {
  let api_url = get_url;

  let [state, setState] = useState([]);

  useEffect(() => {
    axios
      .get(api_url)
      .then((res) => {
        console.log("Get: ", res.data.data);
        setState(res.data.data);
      })
      .catch((err) => {
        console.log("Get Error: ", err);
      });
  }, [setState, api_url]);

  return (
    <div className="profile_style">
      <Row>
        {state.map((pr) => (
          <React.Fragment key={pr._id}>
            <Col className="" lg={6} md={6} sm={12}>
              <Card className="rounded">
                <div className="card-body p-0">
                  <img
                    src={image_url + `${pr._id}`}
                    alt=""
                    className="img-fluid"
                  />
                  <div className="">
                    <h4 className="p-3">{pr.title}</h4>
                    <Link to={`details/${pr._id}`}>
                      <Button className="mb-3">Read More</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </Col>
          </React.Fragment>
        ))}
      </Row>
    </div>
  );
};

export default Prof;
