/* eslint-disable camelcase */
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Icon from '@mui/material/Icon';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setResume } from '../../../store/resumeSlice';
import withReducer from '../../../../../../store/withReducer';
import reducer from '../../../store';
import FuseUtils from '../../../../../../../@fuse/utils';

function PersonalDetails(props) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.resumeApp.resume);
  const [imageUrl, setImageUrl] = useState({
    img: null,
    file: null,
  });

  const {
    photo,
    firstName,
    lastName,
    email,
    headline,
    phone,
    address,
    postCode,
    city,
    dob,
    placeBirth,
  } = userInfo.personalDetails;

  const onChangeText = ({ name, value }) => {
    dispatch(
      setResume({
        ...userInfo,
        personalDetails: {
          ...userInfo.personalDetails,
          [name]: value,
        },
      })
    );
  };

  useEffect(() => {
    if (imageUrl.img && imageUrl.file) {
      onChangeText({
        name: 'photo',
        value: imageUrl,
      });
    }
  }, [imageUrl]);

  return (
    <div className="w-full pt-24 bg-white">
      <Accordion
        expanded={props.expanded === 'PersonalDetails'}
        onChange={() => props.handleChange('PersonalDetails')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="PersonalDetailsbh-content"
          id="PersonalDetailsbh-header"
        >
          <Typography className="text-left" sx={{ width: '33%', flexShrink: 0 }}>
            Personal Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="pt-0 flex justify-center">
          <div className="flex justify-center sm:justify-start flex-wrap  w-full">
            <div className="text-left mt-8 w-1/6">
              <InputLabel className="mb-4" htmlFor="photo">
                Photo
              </InputLabel>
              <label
                htmlFor="button-file"
                className="productImageUpload flex items-center justify-center relative w-[100%] h-[102px] rounded-8 overflow-hidden cursor-pointer bg-[#f4f4f5]"
              >
                <input
                  accept="image/*"
                  className="hidden"
                  id="button-file"
                  type="file"
                  onChange={async (e) => {
                    let imgFile = null;
                    const file = e.target.files[0];
                    function readFileAsync() {
                      return new Promise((resolve, reject) => {
                        const extension = file.name
                          .substring(file.name.lastIndexOf('.') + 1)
                          .toLowerCase();
                        if (!file) {
                          return;
                        }

                        if (
                          extension === 'png' ||
                          extension === 'bmp' ||
                          extension === 'jpeg' ||
                          extension === 'jpg'
                        ) {
                          imgFile = file;
                          const reader = new FileReader();

                          reader.onload = () => {
                            resolve({
                              id: FuseUtils.generateGUID(),
                              url: `data:${file.type};base64,${btoa(reader.result)}`,
                              type: 'image',
                            });
                          };
                          reader.onerror = reject;

                          reader.readAsBinaryString(file);
                        }
                      });
                    }
                    const newImage = await readFileAsync();
                    setImageUrl({ file, img: newImage });
                  }}
                />

                {photo.img ? (
                  <img className="max-w-none w-auto h-full" src={photo.img.url} alt="product" />
                ) : (
                  <Icon fontSize="large" color="action" sx={{ color: 'grey', fontSize: 25 }}>
                    local_see_icon
                  </Icon>
                )}
              </label>
            </div>
            <div className="w-5/6">
              <div className="flex">
                <div className="text-left mx-12 mt-8 w-1/2">
                  <InputLabel className="mb-4" htmlFor="firstName">
                    First Name <span className="text-red">*</span>
                  </InputLabel>
                  <TextField
                    name="firstName"
                    hiddenLabel
                    fullWidth
                    variant="filled"
                    size="small"
                    required
                    value={firstName}
                    onChange={(e) => {
                      onChangeText({
                        name: 'firstName',
                        value: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="text-left mx-12 mt-8 w-1/2">
                  <InputLabel className="mb-4" htmlFor="lastName">
                    Last Name <span className="text-red">*</span>
                  </InputLabel>
                  <TextField
                    name="lastName"
                    hiddenLabel
                    fullWidth
                    variant="filled"
                    size="small"
                    required
                    value={lastName}
                    onChange={(e) => {
                      onChangeText({
                        name: 'lastName',
                        value: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="text-left mx-12 mt-8">
                <InputLabel className="mb-4" htmlFor="email">
                  Email address <span className="text-red">*</span>
                </InputLabel>
                <div className="">
                  <TextField
                    name="email"
                    hiddenLabel
                    fullWidth
                    variant="filled"
                    size="small"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      onChangeText({
                        name: 'email',
                        value: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="text-left mx-12 mt-8 w-full">
              <InputLabel className="mb-4" htmlFor="headline">
                Headline
              </InputLabel>
              <TextField
                name="headline"
                hiddenLabel
                fullWidth
                variant="filled"
                size="small"
                value={headline}
                onChange={(e) => {
                  onChangeText({ name: 'headline', value: e.target.value });
                }}
              />
            </div>
            <div className="text-left mx-12 mt-8 w-full">
              <InputLabel className="mb-4" htmlFor="phone">
                Phone Number
              </InputLabel>
              <TextField
                name="phone"
                hiddenLabel
                fullWidth
                variant="filled"
                size="small"
                type="number"
                value={phone}
                onChange={(e) => {
                  onChangeText({ name: 'phone', value: e.target.value });
                }}
              />
            </div>
            <div className="text-left mx-12 mt-8 w-full">
              <InputLabel className="mb-4" htmlFor="address">
                Address
              </InputLabel>
              <TextField
                name="address"
                hiddenLabel
                fullWidth
                variant="filled"
                size="small"
                value={address}
                onChange={(e) => {
                  onChangeText({ name: 'address', value: e.target.value });
                }}
              />
            </div>
            <div className="flex w-full">
              <div className="text-left mx-12 mt-8 w-1/2">
                <InputLabel className="mb-4" htmlFor="postCode">
                  Post Code
                </InputLabel>
                <TextField
                  name="postCode"
                  hiddenLabel
                  fullWidth
                  variant="filled"
                  size="small"
                  type="number"
                  value={postCode}
                  onChange={(e) => {
                    onChangeText({ name: 'postCode', value: e.target.value });
                  }}
                />
              </div>
              <div className="text-left mx-12 mt-8 w-1/2">
                <InputLabel className="mb-4" htmlFor="city">
                  City
                </InputLabel>
                <TextField
                  name="city"
                  hiddenLabel
                  fullWidth
                  variant="filled"
                  size="small"
                  value={city}
                  onChange={(e) => {
                    onChangeText({ name: 'city', value: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="flex w-full">
              <div className="text-left mx-12 mt-8 w-1/2">
                <InputLabel className="mb-4" htmlFor="dob">
                  Date Of Birth
                </InputLabel>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    size="small"
                    onChange={(e) => {
                      onChangeText({ name: 'dob', value: e });
                    }}
                    value={dob}
                    renderInput={(params) => (
                      <TextField
                        name="dob"
                        sx={{
                          input: { padding: '10px 12px' },
                        }}
                        fullWidth
                        {...params}
                        className="p-0"
                        size="small"
                        variant="filled"
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="text-left mx-12 mt-8 w-1/2">
                <InputLabel className="mb-4" htmlFor="placeBirth">
                  Place Of Birth
                </InputLabel>
                <TextField
                  name="placeBirth"
                  hiddenLabel
                  fullWidth
                  variant="filled"
                  size="small"
                  value={placeBirth}
                  onChange={(e) => {
                    onChangeText({
                      name: 'placeBirth',
                      value: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default withReducer('resumeApp', reducer)(PersonalDetails);
