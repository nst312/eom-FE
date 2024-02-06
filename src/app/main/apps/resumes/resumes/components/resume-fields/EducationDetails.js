import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { setResume } from "../../../store/resumeSlice";
import withReducer from "../../../../../../store/withReducer";
import reducer from "../../../store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const currentYear = new Date().getFullYear();
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
const startMonthRange = range(currentYear, currentYear - 50, -1);

const currentYear2 = new Date().getFullYear();
const range2 = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
const endMonthRange = range2(currentYear2 + 5, currentYear2 - 20, -1);

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

const schema = yup.object().shape({
  endYear: yup.string().required("You must enter a start Year").nullable(),
});

function EducationDetails(props) {
  const dispatch = useDispatch();
  const educationInfo = useSelector((state) => state.resumeApp.resume);
  const [currency, setCurrency] = useState("");
  const [date, setDate] = useState("");
  const [educationData, setEducationData] = useState([]);
  const maxData = educationData[educationData.length - 1];

  const educationDetails = {
    education: "",
    school: "",
    city: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    description: "",
  };

  useEffect(() => {
    if (educationInfo.educations) {
      setEducationData(educationInfo.educations);
    }
  }, [educationInfo.educations]);

  function addNewEducation() {
    const addNew = [...educationData, educationDetails];

    setEducationData(addNew);
    dispatch(
      setResume({
        ...educationInfo,
        educations: addNew,
      })
    );
  }

  const {
    id,
    education,
    school,
    city,
    startMonth,
    startYear,
    endMonth,
    endYear,
    description,
  } = educationInfo?.educations;

  const onChangeText = (index) => (e) => {
    const { name, value } = e.target;
    const taskResults = [...educationData];
    taskResults[index] = {
      ...taskResults[index],
      [name]: value.toString(),
    };
    setEducationData(taskResults);
    dispatch(
      setResume({
        ...educationInfo,
        educations: taskResults,
      })
    );
  };

  const deleteEducationDetail = (index) => {
    const Education = [...educationData];
    Education.splice(index, 1);
    setEducationData(Education);
    dispatch(
      setResume({
        ...educationInfo,
        educations: Education,
      })
    );
  };

  return (
    <>
      <div className="w-full pt-14 bg-white">
        <Accordion
          expanded={props.expanded === "EducationDetails"}
          onChange={() => props.handleChange("EducationDetails")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="EducationDetailsbh-content"
            id="EducationDetailsbh-header"
          >
            <Typography
              className="text-left"
              sx={{ width: "33%", flexShrink: 0 }}
            >
              Education Details
            </Typography>
          </AccordionSummary>
          {educationData.length !== 0 &&
            educationData.map((item, index) => (
              <AccordionDetails
                key={index}
                style={{ border: "3px solid #f0f0f0", borderRadius: "10px" }}
                className="ml-12 mr-12 mb-12"
              >
                <div className="flex justify-center sm:justify-start flex-wrap  w-full">
                  <div className="w-full">
                    <div className="flex">
                      <div className="text-left mx-12 mt-8 w-full">
                        <InputLabel className="mb-4" htmlFor="education">
                          Education
                        </InputLabel>
                        <TextField
                          name="education"
                          hiddenLabel
                          fullWidth
                          variant="filled"
                          size="small"
                          value={item.education}
                          onChange={onChangeText(index)}
                        />
                      </div>
                    </div>

                    <div className="flex">
                      <div className="text-left mx-12 mt-8 w-1/2">
                        <InputLabel className="mb-4" htmlFor="school">
                          School
                        </InputLabel>
                        <TextField
                          name="school"
                          hiddenLabel
                          fullWidth
                          variant="filled"
                          size="small"
                          value={item.school}
                          onChange={onChangeText(index)}
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
                          value={item.city}
                          onChange={onChangeText(index)}
                        />
                      </div>
                    </div>

                    <div className="flex w-full">
                      <div className="flex w-1/2">
                        <div className="text-left mx-12 mt-8 w-1/2">
                          <InputLabel className="mb-4" htmlFor="startMonth">
                            Start Date
                          </InputLabel>

                          <TextField
                            name="startMonth"
                            hiddenLabel
                            fullWidth
                            size="small"
                            select
                            variant="filled"
                            value={item.startMonth}
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
                          <InputLabel className="mb-4" htmlFor="start_year">
                            Year
                          </InputLabel>

                          <TextField
                            name="startYear"
                            hiddenLabel
                            fullWidth
                            size="small"
                            select
                            variant="filled"
                            value={item.startYear}
                            onChange={onChangeText(index)}
                          >
                            {startMonthRange.map((i, key) => (
                              <MenuItem key={key} value={i}>
                                {i}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>
                      </div>
                      <div className="flex w-1/2">
                        <div className="text-left mx-12 mt-8 w-1/2">
                          <InputLabel className="mb-4" htmlFor="end_date">
                            End Date
                          </InputLabel>

                          <TextField
                            name="endMonth"
                            hiddenLabel
                            fullWidth
                            size="small"
                            select
                            variant="filled"
                            value={item.endMonth}
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
                          <InputLabel className="mb-4" htmlFor="end_year">
                            Year
                          </InputLabel>

                          <TextField
                            name="endYear"
                            hiddenLabel
                            fullWidth
                            size="small"
                            select
                            variant="filled"
                            value={item.endYear}
                            disabled={item.startYear?.length === 0}
                            helperText={
                              item.endYear?.length !== 0 &&
                              item.startYear >= item.endYear &&
                              "you can select valid year"
                            }
                            FormHelperTextProps={{ style: { color: "red" } }}
                            onChange={onChangeText(index)}
                          >
                            {endMonthRange.map((i, key) => (
                              <MenuItem key={key} value={i}>
                                {i}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="text-left mx-12 mt-8 w-full">
                        <InputLabel className="mb-4" htmlFor="description">
                          Description
                        </InputLabel>
                        <TextField
                          name="description"
                          hiddenLabel
                          fullWidth
                          variant="filled"
                          size="small"
                          value={item.description}
                          multiline
                          rows={4}
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
                          onClick={() => deleteEducationDetail(index)}
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
              onClick={addNewEducation}
            >
              Add Education
            </Button>
          </div>
        </Accordion>
      </div>
    </>
  );
}

export default withReducer("resumeApp", reducer)(EducationDetails);
