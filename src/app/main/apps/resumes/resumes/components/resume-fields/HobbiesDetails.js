import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setResume } from "../../../store/resumeSlice";

function HobbiesDetails(props) {
  const dispatch = useDispatch();
  const hobbiesInfo = useSelector((state) => state.resumeApp.resume);
  const [hobbiesData, setHobbiesData] = useState([]);
  const maxData = hobbiesData[hobbiesData.length - 1];

  const hobbiesDetails = {
    hobby: "",
  };

  useEffect(() => {
    if (hobbiesInfo.hobbies) {
      setHobbiesData(hobbiesInfo.hobbies);
    }
  }, [hobbiesInfo.hobbies]);

  function addNewHobbies() {
    const addNew = [...hobbiesData, hobbiesDetails];

    setHobbiesData(addNew);
    dispatch(
      setResume({
        ...hobbiesInfo,
        hobbies: addNew,
      })
    );
  }

  const onChangeText = (index) => (e) => {
    const { name, value } = e.target;
    const taskResults = [...hobbiesData];
    taskResults[index] = {
      ...taskResults[index],
      [name]: value,
    };
    setHobbiesData(taskResults);
    dispatch(
      setResume({
        ...hobbiesInfo,
        hobbies: taskResults,
      })
    );
  };

  const deleteHobbiesDetails = (index) => {
    const Hobbies = [...hobbiesData];
    Hobbies.splice(index, 1);
    setHobbiesData(Hobbies);
    dispatch(
      setResume({
        ...hobbiesInfo,
        hobbies: Hobbies,
      })
    );
    for (let i = 0; i < hobbiesData.length; i += 1) {
      if (i !== index) {
        Hobbies.push(hobbiesData[i]);
      }
      if (i === hobbiesData.length - 1) {
      }
    }
  };

  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const { control, watch, getValues } = methods;
  return (
    <FormProvider {...methods}>
      <div className="w-full pt-14 bg-white">
        <Accordion
          expanded={props.expanded === "HobbiesDetails"}
          onChange={() => props.handleChange("HobbiesDetails")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="HobbiesDetails-content"
            id="HobbiesDetails-header"
          >
            <Typography
              className="text-left"
              sx={{ width: "33%", flexShrink: 0 }}
            >
              Hobbies Details
            </Typography>
          </AccordionSummary>
          {hobbiesData.length !== 0 &&
            hobbiesData.map((item, index) => (
              <AccordionDetails
                key={index}
                style={{ border: "3px solid #f0f0f0", borderRadius: "10px" }}
                className="ml-12 mr-12 mb-12"
              >
                <div className="flex justify-center sm:justify-start flex-wrap  w-full">
                  <div className="w-full">
                    <div className="flex">
                      <div className="text-left mx-12 mt-8 w-full">
                        <InputLabel className="mb-4" htmlFor="hobby">
                          Hobby
                        </InputLabel>

                        <TextField
                          name="hobby"
                          hiddenLabel
                          fullWidth
                          variant="filled"
                          size="small"
                          value={item.hobby}
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
                          onClick={() => deleteHobbiesDetails(index)}
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
              onClick={addNewHobbies}
            >
              Add Hobbies
            </Button>
          </div>
        </Accordion>
      </div>
    </FormProvider>
  );
}

export default HobbiesDetails;
