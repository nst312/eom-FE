/* eslint-disable camelcase */
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { setResume } from "../../../store/resumeSlice";

const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear1 = new Date().getFullYear();
const range1 = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
const years = range1(currentYear1, currentYear1 - 20, -1);

function CertificateDetails(props) {
  const dispatch = useDispatch();
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
  });
  const { control, watch, getValues } = methods;
  const certificateInfo = useSelector((state) => state.resumeApp.resume);
  const [certificateData, setCertificateData] = useState([]);
  const maxData = certificateData[certificateData.length - 1];

  const certificateDetails = {
    certificate: "",
    year: "",
    description: "",
    month: "",
  };

  useEffect(() => {
    if (certificateInfo.certificates) {
      setCertificateData(certificateInfo.certificates);
    }
  }, [certificateInfo.certificates]);

  function addNewCertificate() {
    const addNew = [...certificateData, certificateDetails];

    setCertificateData(addNew);
    dispatch(
      setResume({
        ...certificateInfo,
        certificates: addNew,
      })
    );
  }

  const { id, description, certificate, month, year } =
    certificateInfo?.certificates;

  const onChangeText = (index) => (e) => {
    const { name, value } = e.target;
    const certificateResults = [...certificateData];
    certificateResults[index] = {
      ...certificateResults[index],
      [name]: value.toString(),
    };
    setCertificateData(certificateResults);
    dispatch(
      setResume({
        ...certificateInfo,
        certificates: certificateResults,
      })
    );
  };

  const deleteCertificateDetail = (index) => {
    const Certificate = [...certificateData];
    Certificate.splice(index, 1);
    setCertificateData(Certificate);
    dispatch(
      setResume({
        ...certificateInfo,
        certificates: Certificate,
      })
    );
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full pt-14 bg-white">
        <Accordion
          expanded={props.expanded === "CertificateDetails"}
          onChange={() => props.handleChange("CertificateDetails")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="CertificateDetails-content"
            id="CertificateDetails-header"
          >
            <Typography
              className="text-left"
              sx={{ width: "33%", flexShrink: 0 }}
            >
              Certificate Details
            </Typography>
          </AccordionSummary>
          {certificateData.length !== 0 &&
            certificateData.map((item, index) => (
              <AccordionDetails
                key={index}
                style={{ border: "3px solid #f0f0f0", borderRadius: "10px" }}
                className="ml-12 mr-12 mb-12"
              >
                <div className="flex justify-center sm:justify-start flex-wrap  w-full">
                  <div className="w-full">
                    <div className="flex">
                      <div className="text-left mx-12 mt-8 w-full">
                        <InputLabel className="mb-4" htmlFor="certificate">
                          Certificate
                        </InputLabel>

                        <TextField
                          name="certificate"
                          hiddenLabel
                          fullWidth
                          variant="filled"
                          size="small"
                          value={item.certificate}
                          onChange={onChangeText(index)}
                        />
                      </div>
                    </div>
                    <div className="flex">
                      <div className="text-left mx-12 mt-8 w-1/2">
                        <InputLabel className="mb-4" htmlFor="month">
                          Month
                        </InputLabel>
                        <TextField
                          name="month"
                          select
                          hiddenLabel
                          variant="filled"
                          fullWidth
                          size="small"
                          value={item.month}
                          onChange={onChangeText(index)}
                        >
                          {monthName.map((i, key) => (
                            <MenuItem key={key} value={i}>
                              {i}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                      <div className="text-left mx-12 mt-8 w-1/2">
                        <InputLabel className="mb-4" htmlFor="year">
                          Year
                        </InputLabel>
                        <TextField
                          name="year"
                          select
                          hiddenLabel
                          variant="filled"
                          fullWidth
                          size="small"
                          value={item.year}
                          onChange={onChangeText(index)}
                        >
                          {years.map((i, key) => (
                            <MenuItem key={key} value={i}>
                              {i}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="text-left mx-12 mt-8 w-full">
                        <InputLabel className="mb-4" htmlFor="description">
                          Description
                        </InputLabel>
                        <TextField
                          name="description"
                          fullWidth
                          minRows={4}
                          multiline
                          variant="filled"
                          size="small"
                          value={item.description}
                          onChange={onChangeText(index)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      {/* <div className="pl-14 mt-12">
                        <Button
                          className="whitespace-no-wrap  normal-case rounded-0"
                          variant="contained"
                          color="success"
                          startIcon={<SaveIcon />}
                        >
                          Save
                        </Button>
                      </div> */}
                      <div className="pl-14 text-right mt-12">
                        <Button
                          className="whitespace-no-wrap  normal-case rounded-0"
                          variant="contained"
                          color="warning"
                          startIcon={<DeleteIcon />}
                          onClick={() => deleteCertificateDetail(index)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            ))}
          <div className="mb-8 pl-14 text-start py-14">
            <Button
              className="whitespace-no-wrap  normal-case rounded-0"
              variant="outlined"
              color="success"
              startIcon={<AddIcon />}
              onClick={addNewCertificate}
            >
              Add Certificate
            </Button>
          </div>
        </Accordion>
      </div>
    </FormProvider>
  );
}

export default CertificateDetails;
