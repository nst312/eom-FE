import React, { useState, useCallback, useEffect } from 'react';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useDispatch, useSelector } from 'react-redux';
import { toPng } from 'html-to-image';
import FuseLoading from '@fuse/core/FuseLoading';
import history from '@history';
import { showMessage } from '../../../../../store/fuse/messageSlice';
import Template1 from '../../resume-themes/Template1';
import Template3 from '../../resume-themes/Template3';
import Template2 from '../../resume-themes/Template2';
import {
  setResume,
  createResume,
  updateThemeImage,
  updateAvatar,
  getResumeById,
  initialState,
  updateResume,
  downloadResume,
} from '../../store/resumeSlice';
import constants from '../../../../../fuse-configs/constants';

const StyledModal = styled(Modal)`
  .MuiBackdrop-root {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const style = {
  position: 'absolute',
  right: 10,
  bottom: 10,
  left: '50%',
  width: '95%',
  transform: 'translate(-50%, -25%)',
  backgroundColor: '#fff',
  border: 'none',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  padding: '16px',
  paddingBottom: '0px',
  display: 'flex',
  borderRadius: '10px',
};

function ResumeView(props) {
  const resumeInfo = useSelector((state) => state.resumeApp.resume);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeTheme, setActiveTheme] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const handleClose = () => setOpen(false);
  const ResumeRef = React.createRef();

  const ThemesList = [
    {
      themeCode: 1,
      title: 'Professional',
      url: 'assets/images/resume_themes/theme1.png',
    },
    {
      themeCode: 2,
      title: 'Horizontal',
      url: 'assets/images/resume_themes/theme5.png',
    },
    {
      themeCode: 3,
      title: 'Chrono',
      url: 'assets/images/resume_themes/theme2.png',
    },
    // {
    //   themeCode: 4,
    //   title: 'Elegant',
    //   url: 'assets/images/resume_themes/theme3.png',
    // },
    // {
    //   themeCode: 5,
    //   title: 'Circular',
    //   url: 'assets/images/resume_themes/theme4.png',
    // },
  ];

  useEffect(() => {
    const url = window.location.pathname;
    const id = Number(url.substring(url.lastIndexOf('/') + 1));
    if (id) {
      setResumeId(id);
      dispatch(getResumeById(id)).then((res) => {
        if (res.payload) {
          dispatch(setResume({ ...res.payload }));
        }
      });
    } else {
      setActiveTheme(1);
      dispatch(setResume(initialState));
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const url = window.location.pathname;
    const id = Number(url.substring(url.lastIndexOf('/') + 1));
    if (resumeInfo && isLoading && id) {
      setTimeout(function () {
        setIsLoading(false);
        dispatch(setResume({ ...resumeInfo }));
        setActiveTheme(resumeInfo.themeCode);
      }, 1000);
    }
  }, [resumeInfo]);

  const onChangeThemeCode = (item) => {
    dispatch(
      setResume({
        ...resumeInfo,
        themeCode: item.themeCode,
      })
    );
    setActiveTheme(item.themeCode);
    handleClose();
  };

  const renderTemplateCard = (item, index) => {
    return (
      <div
        key={index}
        className="pr-24 pb-16 cursor-pointer"
        onClick={() => {
          onChangeThemeCode(item);
        }}
      >
        <div className="shadow-md shadow-grey-500 rounded-md overflow-hidden">
          <img
            src={item.url}
            className="w-[144px] h-[200px] max-w-[initial] shadow-md rounded-md"
            alt={`themes-${item.themeCode}`}
            style={{
              border: activeTheme === item.themeCode ? '2px solid #4314b6' : '',
            }}
          />
        </div>
        <div className="pt-8 text-center">{item.title}</div>
      </div>
    );
  };

  const onCreateResume = useCallback(() => {
    if (ResumeRef.current === null) {
      return;
    }
    toPng(ResumeRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = dataUrl;
        // link.click();
        fetch(dataUrl)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], 'Filename.png', {
              type: 'image/png',
            });
            const resumeData = {
              ...resumeInfo,
              personalDetails: {
                ...resumeInfo.personalDetails,
                photo: '',
              },
            };
            dispatch(createResume(resumeData)).then((response) => {
              if (response.payload) {
                updateImage(response, file);
              }
            });
          });
      })
      .catch((err) => {
        console.log('err===>', err);
      });
  }, [ResumeRef]);

  const onUpdateResume = useCallback(() => {
    if (ResumeRef.current === null) {
      return;
    }
    toPng(ResumeRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = dataUrl;
        // link.click();
        fetch(dataUrl)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], 'Filename.png', {
              type: 'image/png',
            });
            const checkProfileURL = resumeInfo.personalDetails.photo?.img?.url.includes(
              `${constants.API_URL}/api/resume-master/image`
            );

            let photoURL = '';
            if (checkProfileURL) {
              photoURL = resumeInfo.personalDetails.photo?.img?.url.replace(
                `${constants.API_URL}/api/resume-master/image/`,
                ''
              );
            } else {
              photoURL = resumeInfo.personalDetails.photo?.img?.url;
            }

            const resumeData = {
              id: resumeId,
              data: {
                ...resumeInfo,
                personalDetails: {
                  ...resumeInfo.personalDetails,
                  photo: resumeInfo.personalDetails.photo.file ? '' : photoURL,
                },
              },
            };
            dispatch(updateResume(resumeData)).then((response) => {
              if (response.payload) {
                updateImage(response, file);
              }
            });
          });
      })
      .catch((err) => {
        console.log('err===>', err);
      });
  }, [ResumeRef]);

  const updateImage = (response, file) => {
    dispatch(
      updateThemeImage({
        id: response.payload.id,
        photo: file,
      })
    );
    if (resumeInfo.personalDetails.photo.file) {
      dispatch(
        updateAvatar({
          id: response.payload.id,
          photo: resumeInfo.personalDetails.photo.file,
        })
      ).then((res) => {
        if (res) {
          setResumeId(response.payload.id);
          history.push(`/apps/resume/${response.payload.id}`);
        }
      });
    } else {
      setResumeId(response.payload.id);
      history.push(`/apps/resume/${response.payload.id}`);
    }
  };

  const onResumeSubmit = () => {
    if (
      !resumeInfo.personalDetails.firstName ||
      !resumeInfo.personalDetails.lastName ||
      !resumeInfo.personalDetails.email
    ) {
      dispatch(
        showMessage({
          variant: 'error',
          message: 'Please enter mandatory field.',
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        })
      );
    } else {
      const regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (regex.test(resumeInfo.personalDetails.email) === false) {
        dispatch(
          showMessage({
            variant: 'error',
            message: 'Email is not valid.',
            autoHideDuration: 4000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
          })
        );
      } else if (!resumeId) {
        onCreateResume();
      } else {
        onUpdateResume();
      }
    }
  };
  const options = {
    orientation: 'portrait',
    unit: 'in',
    format: 'A4',
  };

  if (isLoading) {
    return (
      <div className="w-full h-full text-center pt-14 justify-around flex flex-col">
        <FuseLoading />
      </div>
    );
  }

  const onDownloadPDF = async () => {
    props.setIsShowApiLoading(true);
    await onResumeSubmit();
    setTimeout(() => {
      dispatch(downloadResume(resumeId))
        .then((res) => {
          if (res) {
            const a = document.createElement('a'); // Create <a>
            a.href = `data:data:application/pdf;base64,${res.payload.pdf}`; // Image Base64 Goes here
            a.download = 'resume.pdf'; // File name Here
            a.click();
            props.setIsShowApiLoading(false);
          }
        })
        .catch((err) => {
          console.log('err===>', err);
          props.setIsShowApiLoading(false);
        });
    }, 2000);
  };

  return (
    <div className="w-full h-full text-center pt-14 justify-around flex flex-col">
      <div
        className="h-[90%] bg-white rounded-6 drop-shadow-md self-center w-[527.502px] overflow-auto"
        style={{
          background:
            activeTheme === 3 && 'linear-gradient(to right, #e6e6e6 33.4%, #fff 33.4%, #fff 50%)',
        }}
      >
        <div ref={ResumeRef}>
          {activeTheme === 1 && <Template1 />}
          {activeTheme === 2 && <Template2 />}
          {activeTheme === 3 && <Template3 />}
        </div>
      </div>

      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="w-1/2 absolute right-0 top-0 bottom-0 left-1/2"
      >
        <Box sx={style}>
          <div className="flex overflow-auto px-8">
            {ThemesList.map((item, index) => {
              return renderTemplateCard(item, index);
            })}
          </div>
        </Box>
      </StyledModal>
      <div className="h-[5%] bg-white w-[95%] rounded-6 drop-shadow-md self-center">
        <div className="h-full flex items-center p-14 justify-between">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              setOpen(true);
            }}
          >
            <AutoAwesomeMosaicIcon />
            <div className="mx-4">Templates</div>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
          <div className="flex">
            <Button
              color="success"
              onClick={() => {
                onResumeSubmit();
              }}
              className="mr-16"
              size="small"
              variant="contained"
            >
              {resumeId ? 'Update' : 'Save'}
            </Button>
            {resumeId && (
              <Button
                onClick={() => {
                  onDownloadPDF();
                }}
                className="mr-16"
                size="small"
                variant="contained"
                startIcon={<CloudDownloadIcon />}
              >
                Download
              </Button>
            )}
            {/* </Pdf> */}
            {/* <div
              onClick={() => {
                setIsFullScreen(!isFullScreen);
              }}
            >
              {isFullScreen ? (
                <FullscreenExitIcon className="text-36" />
              ) : (
                <FullscreenIcon className="text-36" />
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeView;
