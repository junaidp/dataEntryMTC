import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import parse from "html-react-parser";
import Chip from "@mui/material/Chip";
import CardMedia from "@mui/material/CardMedia";
import axios from "axios";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ item }) {
  const [expanded, setExpanded] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState("");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  React.useEffect(() => {
    if (item?.title) {
      const searchImages = async () => {
        try {
          const response = await axios.get(
            `https://api.unsplash.com/search/photos?client_id=mnrpDj4EmyAsyh_f5AJVso4idjdVZWK81z3WOmQLn1g&query=${item?.title}`
          );
          setCurrentImage(response?.data?.results[0]?.urls?.regular);
        } catch (error) {
          setCurrentImage("Image Not Found");
        }
      };
      searchImages();
    }
  }, []);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image={currentImage}
        alt="Paella dish"
      />

      <CardContent>
        <Typography paragraph className="underline">
          {item?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {parse(item?.description || "")}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div className="row">
            <div className="col-lg-4 mb-2">
              <label>MemberShip</label>
              <p>{item?.memberShip?.toUpperCase() || "N/A"}</p>
            </div>
          </div>

          <div className="row">
            <div>
              <label className="mb-2">List Of Prices</label>
              <div>
                {!item?.price || item?.price?.length === 0 ? (
                  <lable>N/A</lable>
                ) : (
                  item?.price?.map((key, index) => {
                    return (
                      <Chip
                        label={key}
                        key={index}
                        variant="outlined"
                        className="mr-2 mb-2"
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div>
              <label>List Of Durations</label>
              <div>
                {!item?.duration || item?.duration?.length === 0 ? (
                  <lable>N/A</lable>
                ) : (
                  item?.duration?.map((key, index) => {
                    return (
                      <Chip
                        label={key}
                        key={index}
                        variant="outlined"
                        className="mr-2 mb-2"
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div>
              <label className="mb-2">List Of Available Times</label>
              <div>
                {!item?.availableTime || item?.availableTime?.length === 0 ? (
                  <lable>N/A</lable>
                ) : (
                  item?.availableTime?.map((key, index) => {
                    return (
                      <Chip
                        label={key}
                        key={index}
                        variant="outlined"
                        className="mr-2 mb-2"
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
          <div className="mb-4 mt-4">
            <label className="mb-2">List Of Keywords</label>
            <div>
              {!item?.storyLineKeywords ||
              item?.storyLineKeywords?.length === 0 ? (
                <lable>N/A</lable>
              ) : (
                item?.storyLineKeywords?.map((key, index) => {
                  return (
                    <Chip
                      label={key}
                      key={index}
                      variant="outlined"
                      className="mr-2 mb-2"
                    />
                  );
                })
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="mb-2">List Of Link With Other items</label>
            <div>
              {!item?.linkWithOtherExperience ||
              item?.linkWithOtherExperience?.length === 0 ? (
                <p>N/A</p>
              ) : (
                item?.linkWithOtherExperience?.map((key, index) => {
                  return (
                    <Chip
                      label={`${key?.itemName}-${key?.why}`}
                      key={index}
                      variant="outlined"
                      className={`mr-2 mb-2`}
                    />
                  );
                })
              )}
            </div>
          </div>
          <div className="mb-4">
            <label className="mb-2">List Of Link With Other Services</label>
            <div>
              {!item?.linkWithOtherService ||
              item?.linkWithOtherService?.length === 0 ? (
                <p>N/A</p>
              ) : (
                item?.linkWithOtherService?.map((key, index) => {
                  return (
                    <Chip
                      label={`${key?.serviceName}-${key?.why}`}
                      key={index}
                      variant="outlined"
                      className={`mr-2 mb-2`}
                    />
                  );
                })
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="mb-2">List Of Links</label>
            <div>
              {!item?.links || item?.links?.length === 0 ? (
                <lable>N/A</lable>
              ) : (
                item?.links.map((key, index) => {
                  return (
                    <Chip
                      label={key?.link}
                      key={index}
                      variant="outlined"
                      className="mr-2 mb-2"
                    />
                  );
                })
              )}
            </div>
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
}
