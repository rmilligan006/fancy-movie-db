import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { img_500, img_300 } from "../../config/config";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import "./ContentModal.css";
import { YouTube } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { unavailable, unavailableLandscape } from "../../config/config";
import Carousel from "../Carousel/Carousel";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "80%",
  bgcolor: "#39445a",
  border: "1px solid #282c34",
  borderRadius: 10,
  color: "white",
  boxShadow: 24,
  p: 4,
};

export default function ContentModal({ children, media_type, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div onClick={handleOpen} className="media">
        {children}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          <Box sx={style}>
            {content && (
              <div className="ContentModal">
                <img
                  src={
                    content.poster_path
                      ? `${img_300}/${content.poster_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                {/* image for landscape mode */}
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />

                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {/*printing name if it's series and title if it's movie and release date if present else dash(----)*/}
                    {/* in substring = from full date extracting just the date   */}
                    {content.name || content.title}(
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  <span>
                    {/* content tagline */}
                    {content.tagline && (
                      <i className="tagline">{content.tagline}</i>
                    )}
                  </span>
                  {/* content description */}
                  <span className="ContentModal__description">
                    {content.overview}
                  </span>
                  <div>
                    <Carousel media_type={media_type} id={id} />
                  </div>
                  <Button
                    variant="contained"
                    startIcon={<YouTube />}
                    color="primary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
