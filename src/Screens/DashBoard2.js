import React, { Fragment, useEffect, useState } from "react";
import SiteCard from "../Components/SiteCard";
import { makeStyles } from "@material-ui/core/styles";
import { width } from "@material-ui/system";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
  div: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridAutoRows: "auto",
    gridGap: "3rem"
  },
  dialog: {
    boxShadow: "0 8px 6px -6px black",
    position: "static",
    left: "20%",
    top: "10%"
  }
}));

const options = {
  url: "http://13.125.138.181:3000/piczone/getPicZoneList",
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8"
  },
  data: {
    administrative: ""
  }
};


function DashBoard2() {
  const classes = useStyles();
  const [picData, setPicData] = useState([]);
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [error, setError] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleClickOpen = (item) => {
    setSelectedItem(JSON.stringify(item, null, 2));
    setDialogOpen(true);
  };
  const handleClose = () => {
    setDialogOpen(false);
  };

  const removePicZone = () => {
    handleClose();
    
  };

  const onClick = imageUrl => {
    setOpen(true);
    setSelectedImage(imageUrl.replace("thumbnail", "original"));
    //setSelectedImage(imageUrl);
  };

  useEffect(() => {
    axios(options)
      .then(response => {
        console.log(response);
        setPicData(response.data);
        setLoad(true);
      })
      .catch(err => {
        setError(err);
        setLoad(true);
      });
  }, []);

  if (load) {
    return (
      <Fragment>
        <div className={classes.div}>
          {picData.map(item => (
            <SiteCard
              item={item}
              key={item._id}
              userIcon={item.userInfo.imageUrl}
              nickName={item.userInfo.nickname}
              image={item.imageUrl.replace("original", "thumbnail")}
              tip={item.tip}
              onClick={onClick}
              showDialog={handleClickOpen}
            />
          ))}
          <Dialog
            fullWidth={false}
            open={open}
            maxWidth="xl"
            aria-labelledby="responsive-dialog-title"
          >
            <img
              src={selectedImage}
              onClick={() => setOpen(false)}
              width="1000"
              height="auto"
            />
          </Dialog>
          <Dialog
            open={dialogOpen}
            onClose={handleClose}
            maxWidth="xl"
            aria-labelledby="responsive-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="responsive-dialog-title">
              {"해당 픽존을 삭제하시겠습니까?"}
            </DialogTitle>
            <DialogContent>
            <pre>{selectedItem}</pre>
            </DialogContent>
            <DialogActions>
              <Button onClick={removePicZone} color="primary">
                확인
              </Button>
              <Button onClick={handleClose} color="primary" autoFocus>
                취소
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Fragment>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default DashBoard2;
