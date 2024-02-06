import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setResume } from "../../../store/resumeSlice";

function ProfileDetails(props) {
  const dispatch = useDispatch();
  const profileDetailsInfo = useSelector((state) => state.resumeApp.resume);

  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
  });
  const { control, watch, getValues } = methods;

  const onChangeText = ({ name, value }) => {
    dispatch(
      setResume({
        ...profileDetailsInfo,
        profiles: {
          [name]: value,
        },
      })
    );
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full pt-14 bg-white">
        <Accordion
          expanded={props.expanded === "ProfileDetails"}
          onChange={() => props.handleChange("ProfileDetails")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="ProfileDetailsbh-content"
            id="ProfileDetailsbh-header"
          >
            <Typography
              className="text-left"
              sx={{ width: "33%", flexShrink: 0 }}
            >
              Profile Details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex justify-center sm:justify-start flex-wrap  w-full">
              <div className="w-full">
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
                      value={profileDetailsInfo?.profiles?.description}
                      onChange={(e) => {
                        onChangeText({
                          name: "description",
                          value: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </FormProvider>
  );
}

export default ProfileDetails;
