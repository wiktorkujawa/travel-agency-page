import React from 'react'
import {
  Button,
  Modal,
  ModalBody,
  Card, CardImg, CardBody,
  CardText
} from 'reactstrap';
const GalleryItem = ({ photos: { description, tripLocation, image }, index, previousPhoto, nextPhoto, modal, toggle }) => {

  return (
    <Card className="fadein-elements">
      <Modal
        isOpen={modal[index]}
        toggle={toggle(index)}
        className="open-offer-modal"
        size="lg"
      >

        <ModalBody style={{ padding: "0", textAlign: "center" }}>
          <div style={{ position: "relative" }}>
            <img src={image} style={{ maxHeight: "70vh", minHeight: "30rem", objectFit: "fill", width: "100%" }} alt="" />
            <Button style={{ position: "absolute", left: "0", top: "50%" }} onClick={previousPhoto(index)} ><i className="fa fa-angle-left fa-2x" aria-hidden="true"></i></Button>
            <Button style={{ position: "absolute", right: "0", top: "50%" }} onClick={nextPhoto(index)} ><i className="fa fa-angle-right fa-2x" aria-hidden="true"></i></Button>
          </div>
          <strong>{tripLocation}</strong> <br></br>
          <small className="text-muted">{description}</small>

        </ModalBody>
      </Modal>

      <CardImg top src={image}
        height="200"
        onClick={toggle(index)}
      />
      <CardBody style={{ padding: "0", textAlign: "center" }}>
        <CardText>
          <strong>{tripLocation}</strong> <br></br>
          <small className="text-muted">{description}</small>
        </CardText>
      </CardBody>
    </Card>
  )
}

export default GalleryItem
