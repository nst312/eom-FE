import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FormProvider, useForm } from "react-hook-form";
import Slider from "@mui/material/Slider";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { setResume } from "../../../store/resumeSlice";

function SkillDetails(props) {
  const dispatch = useDispatch();
  const skillInfo = useSelector((state) => state.resumeApp.resume);
  const [skillData, setSkillData] = useState([]);
  const maxData = skillData[skillData.length - 1];

  const skillDetails = {
    name: "",
    level: 0,
  };

  useEffect(() => {
    if (skillInfo.skills) {
      setSkillData(skillInfo.skills);
    }
  }, [skillInfo.skills]);

  function addNewSkills() {
    const addNew = [...skillData, skillDetails];

    setSkillData(addNew);
    dispatch(
      setResume({
        ...skillInfo,
        skills: addNew,
      })
    );
  }

  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const { control, watch, getValues } = methods;

  const valueText = (value) => {
    return `${value}`;
  };

  const onChangeText = (index) => (e) => {
    const { name, value } = e.target;
    const taskResults = [...skillData];
    taskResults[index] = {
      ...taskResults[index],
      [name]: value,
    };
    setSkillData(taskResults);
    dispatch(
      setResume({
        ...skillInfo,
        skills: taskResults,
      })
    );
  };

  const onDispatchLanguage = (name, value, index) => {
    const taskResults = [...skillData];
    taskResults[index] = {
      ...taskResults[index],
      [name]: value,
    };
    setSkillData(taskResults);
    dispatch(
      setResume({
        ...skillInfo,
        skills: taskResults,
      })
    );
  };

  const handleChange = (e, index, name) => {
    const val = e.target.value;
    onDispatchLanguage(name, val, index);
  };

  const getSkillLevel = (val) => {
    let skillLevel = "";
    if (val === 0) {
      skillLevel = "Make a choice";
    } else if (val === 20) {
      skillLevel = "Beginner";
    } else if (val === 40) {
      skillLevel = "Moderate";
    } else if (val === 60) {
      skillLevel = "Good";
    } else if (val === 80) {
      skillLevel = "Very good";
    } else {
      skillLevel = "Fluent";
    }
    return skillLevel;
  };

  const deleteSkillDetail = (index) => {
    const Skill = [...skillData];
    Skill.splice(index, 1);
    setSkillData(Skill);
    dispatch(
      setResume({
        ...skillInfo,
        skills: Skill,
      })
    );
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full pt-14 bg-white">
        <Accordion
          expanded={props.expanded === "SkillDetails"}
          onChange={() => props.handleChange("SkillDetails")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="skills-content"
            id="Skills-header"
          >
            <Typography
              className="text-left"
              sx={{ width: "33%", flexShrink: 0 }}
            >
              Skill Details
            </Typography>
          </AccordionSummary>
          {skillData.length !== 0 &&
            skillData.map((item, index) => (
              <AccordionDetails
                key={index}
                style={{ border: "3px solid #f0f0f0", borderRadius: "10px" }}
                className="ml-12 mr-12 mb-12"
              >
                <div className="flex justify-center sm:justify-start flex-wrap  w-full">
                  <div className="w-full">
                    <div className="flex">
                      <div className="text-left mx-12 mt-8 w-full">
                        <InputLabel className="mb-4" htmlFor="skill">
                          Skill
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
                          getAriaValueText={valueText}
                          step={20}
                          valueLabelDisplay="off"
                          onChange={(e) => handleChange(e, index, "level")}
                          min={0}
                          max={100}
                        />
                      </Box>
                      <Typography className="font-semibold">
                        {getSkillLevel(item.level)}
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
                          onClick={() => deleteSkillDetail(index)}
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
              onClick={addNewSkills}
            >
              Add Skill
            </Button>
          </div>
        </Accordion>
      </div>
    </FormProvider>
  );
}

export default SkillDetails;
