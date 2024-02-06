import { yupResolver } from "@hookform/resolvers/yup";
import _ from "@lodash";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {
  closeEditPostDialog,
  closeNewPostDialog,
  removePost,
  savePost,
  updatePost,
} from "./store/postsSlice";

const defaultValues = {
  title: "",
  description: "",
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup.string().required("You must enter a title"),
  description: yup.string().required("You must enter a description"),
});

function PostDialog() {
  const dispatch = useDispatch();
  const postDialog = useSelector(({ postApp }) => postApp.posts.postDialog);
  const user = useSelector(({ auth }) => auth.user);

  const { watch, handleSubmit, formState, reset, control } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { errors, isValid, dirtyFields } = formState;
  const formId = watch("id");

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (postDialog.type === "edit" && postDialog.data) {
      reset({ ...postDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (postDialog.type === "new") {
      reset({
        ...defaultValues,
        ...postDialog.data,
      });
    }
  }, [postDialog.data, postDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (postDialog.props.open) {
      initDialog();
    }
  }, [postDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closePostDialog() {
    return postDialog.type === "edit"
      ? dispatch(closeEditPostDialog())
      : dispatch(closeNewPostDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    console.log("data", data);
    console.log("postDialog", postDialog.type);
    if (postDialog.type === "new") {
      dispatch(savePost({ userId: user.id, data: data }));
    } else {
      dispatch(
        updatePost({
          userId: user.id,
          postId: postDialog.data.id,
          data: {
            title: data.title,
            description: data.description,
          },
        })
      );
    }
    closePostDialog();
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    dispatch(removePost(formId)).then(() => {
      closePostDialog();
    });
  }
  return (
    <Dialog
      {...postDialog.props}
      onClose={closePostDialog}
      fullWidth
      maxWidth="sm"
      scroll="body"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {postDialog.type === "new"
              ? "Ask a question"
              : postDialog.data &&
                postDialog.data.status === "OPEN" &&
                postDialog.data.postsAccepted.length === 0
              ? "Edit Question"
              : "My Question"}
          </Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent classes={{ root: "p-0" }}>
          <div className="px-16 mt-16 sm:px-24">
            <FormControl className="mt-8 mb-16" required fullWidth>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    autoFocus
                    error={!!errors.title}
                    helperText={errors?.title?.message}
                    required
                    variant="outlined"
                  />
                )}
              />
            </FormControl>

            <FormControl className="mt-8 mb-16" required fullWidth>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    multiline
                    rows="6"
                    label="Description"
                    error={!!errors.description}
                    helperText={errors?.description?.message}
                    required
                    variant="outlined"
                  />
                )}
              />
            </FormControl>
          </div>
        </DialogContent>

        <>
          {postDialog.type === "new" ? (
            <DialogActions className="justify-end px-8 py-16">
              <div className="px-16">
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={_.isEmpty(dirtyFields) || !isValid}
                >
                  Post a question
                </Button>
              </div>
            </DialogActions>
          ) : (
            <DialogActions className="justify-end px-8 py-16">
              <div className="px-16">
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={_.isEmpty(dirtyFields) || !isValid}
                >
                  Save
                </Button>
              </div>
              {/* <IconButton className="min-w-auto" onClick={handleRemove} size="large">
                <Icon>delete</Icon>
              </IconButton> */}
            </DialogActions>
          )}
        </>
      </form>
    </Dialog>
  );
}

export default PostDialog;
