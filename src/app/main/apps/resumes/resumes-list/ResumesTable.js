import FuseScrollbars from "@fuse/core/FuseScrollbars";
import withRouter from "@fuse/core/withRouter";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllResume, initialState, setResume } from "../store/resumeSlice";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";
import constants from "../../../../fuse-configs/constants";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

function ResumesTable(props) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    getResumeList(1);
    dispatch(setResume(initialState));
  }, []);

  const getResumeList = (pageNo) => {
    setLoadingMore(true);
    dispatch(getAllResume(pageNo)).then((res) => {
      if (res.payload && res.payload.count) {
        setData([...data, ...res.payload.data]);
        setTotalCount(res.payload.count);
        setPageNumber(pageNo);
        setLoadingMore(false);
      }
    });
  };

  if (data?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          Resumes not found!
        </Typography>
      </motion.div>
    );
  }

  return (
    !props.loading && (
      <div className="w-full flex flex-col">
        <FuseScrollbars className="flex-grow overflow-x-auto pb-14">
          <div className="w-full flex-grow flex flex-wrap justify-around">
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gridAutoRows: "340px",
              }}
              className="mx-10"
            >
              {data.map((item, index) => {
                return (
                  <Card
                    key={index}
                    className="h-320 m-10 mt-20 cursor-pointer"
                    onClick={() => {
                      navigate(`/apps/resume/${item.id}`);
                    }}
                  >
                    <CardMedia
                      component="img"
                      className="object-contain"
                      image={`${constants.API_URL}/api/resume-master/image/${item.themeImage}`}
                      alt="green iguana"
                    />
                  </Card>
                );
              })}
            </Box>
          </div>
          {data.length < totalCount && (
            <Box className="relative flex justify-center p-12">
              {data.length >= 10 && (
                <Fade in={!loadingMore}>
                  <Button
                    className="absolute"
                    variant="text"
                    onClick={() => getResumeList(pageNumber + 1)}
                  >
                    Load More
                  </Button>
                </Fade>
              )}
              <Fade in={loadingMore}>
                <CircularProgress className="absolute" color="secondary" />
              </Fade>
            </Box>
          )}
        </FuseScrollbars>
      </div>
    )
  );
}
export default withRouter(ResumesTable);
