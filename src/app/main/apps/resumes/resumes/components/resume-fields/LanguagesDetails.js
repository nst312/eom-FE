import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setResume } from "../../../store/resumeSlice";

function LanguagesDetails(props) {
  const dispatch = useDispatch();
  const languageInfo = useSelector((state) => state.resumeApp.resume);
  const [languageData, setLanguageData] = useState([]);
  const maxData = languageData[languageData.length - 1];

  const languageDetails = {
    name: "",
    level: 0,
  };

  useEffect(() => {
    if (languageInfo.languages) {
      setLanguageData(languageInfo.languages);
    }
  }, [languageInfo.languages]);

  const onChangeText = (index) => (e) => {
    const { name, value } = e.target;
    const taskResults = [...languageData];
    taskResults[index] = {
      ...taskResults[index],
      [name]: value,
    };
    setLanguageData(taskResults);
    dispatch(
      setResume({
        ...languageInfo,
        languages: taskResults,
      })
    );
  };

  function addNewLanguage() {
    const addNew = [...languageData, languageDetails];

    setLanguageData(addNew);
    dispatch(
      setResume({
        ...languageInfo,
        languages: addNew,
      })
    );
  }

  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
  });
  const { control, watch, getValues } = methods;

  function valuetext(value) {
    return `${value}`;
  }

  const onDispatchLanguage = (name, value, index) => {
    const taskResults = [...languageData];
    taskResults[index] = {
      ...taskResults[index],
      [name]: value,
    };
    setLanguageData(taskResults);
    dispatch(
      setResume({
        ...languageInfo,
        languages: taskResults,
      })
    );
  };

  const handleChange = (e, index, name) => {
    const val = e.target.value;
    onDispatchLanguage(name, val, index);
  };

  const getLanguageLevel = (val) => {
    let languageLevel = "";
    if (val === 0) {
      languageLevel = "Make a choice";
    } else if (val === 20) {
      languageLevel = "Beginner";
    } else if (val === 40) {
      languageLevel = "Moderate";
    } else if (val === 60) {
      languageLevel = "Good";
    } else if (val === 80) {
      languageLevel = "Very good";
    } else {
      languageLevel = "Fluent";
    }
    return languageLevel;
  };

  const deleteLanguagesDetail = (index) => {
    const Language = [...languageData];
    Language.splice(index, 1);
    setLanguageData(Language);
    dispatch(
      setResume({
        ...languageInfo,
        languages: Language,
      })
    );
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full pt-14 bg-white">
        <Accordion
          expanded={props.expanded === "LanguagesDetails"}
          onChange={() => props.handleChange("LanguagesDetails")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="LanguagesDetails-content"
            id="LanguagesDetails-header"
          >
            <Typography
              className="text-left"
              sx={{ width: "33%", flexShrink: 0 }}
            >
              Languages Details
            </Typography>
          </AccordionSummary>
          {languageData.length !== 0 &&
            languageData.map((item, index) => (
              <AccordionDetails
                key={index}
                style={{ border: "3px solid #f0f0f0", borderRadius: "10px" }}
                className="ml-12 mr-12 mb-12"
              >
                <div className="flex justify-center sm:justify-start flex-wrap  w-full">
                  <div className="w-full">
                    <div className="flex">
                      <div className="text-left mx-12 mt-8 w-full">
                        <InputLabel className="mb-4" htmlFor="language">
                          Language
                        </InputLabel>
                        <TextField
                          name="name"
                          hiddenLabel
                          fullWidth
                          variant="filled"
                          size="small"
                          value={item.name}
                          onChange={onChangeText(index)}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mx-14 mt-14">
                      <Box className="flex w-4/5">
                        <Slider
                          name="level"
                          aria-label="Custom marks"
                          defaultValue={0}
                          value={item.level}
                          getAriaValueText={valuetext}
                          step={20}
                          valueLabelDisplay="off"
                          onChange={(e) => handleChange(e, index, "level")}
                          min={0}
                          max={100}
                        />
                      </Box>
                      <Typography className="font-semibold">
                        {getLanguageLevel(item.level)}
                      </Typography>
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
                          onClick={() => deleteLanguagesDetail(index)}
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
              onClick={addNewLanguage}
            >
              Add Language
            </Button>
          </div>
        </Accordion>
      </div>
    </FormProvider>
  );
}

export default LanguagesDetails;
