import React from 'react';
import dompurify from 'dompurify';
import {
  Card, CardFooter, CardImg, CardBody,
  CardTitle, NavLink
} from 'reactstrap';
import {
  NavLink as RRNavLink
} from 'react-router-dom';

const OfferItem = ({ pathType, offerData: { _id, image, title, departureDate, price, type, description } }) => {
  const sanitizer = dompurify.sanitize;
  return (
    <Card className="mt-5 fadein-elements">
      <NavLink tag={RRNavLink} to={`${pathType.split(":", 1)}${type}/${_id}`}
        target={"_top"}
      >
        <div style={{ overflow: "hidden", position: "relative" }}>
          <CardImg top src={image} className="card-image"
            height="200"
          />
          <div className="price">{price}</div>
          <div className="price" style={{ width: "100%" }}></div>
        </div>
        <CardBody>
          <CardTitle style={{ height: "2.4em" }}><strong>{title}</strong> </CardTitle>
          <div className="block-with-text" dangerouslySetInnerHTML={{ __html: sanitizer(description) }}></div>
        </CardBody>

        <CardFooter className="offer-footer">
          <div style={{ margin: "auto 0" }}>{departureDate.slice(0, -14)}</div>
          <div style={{ textAlign: "end", margin: "auto 0" }}>{type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, ' ')}</div>
        </CardFooter>
      </NavLink>

    </Card>
  )
}

export default OfferItem
