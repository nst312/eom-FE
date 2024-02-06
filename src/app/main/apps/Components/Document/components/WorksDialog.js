import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import Icon from '@mui/material/Icon';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { Box } from '@mui/system';
import {
  closeEditWorksDialog,
  closeNewWorksDialog,
  editWork,
  getWorks,
  saveWorks,
  setAllWorks,
} from '../store/documentSlice';
import FuseUtils from '../../../../../../@fuse/utils';
import { showMessage } from '../../../../../store/fuse/messageSlice';
import { useParams } from 'react-router';

const defaultValues = {
  title: '',
  description: '',
  path: '',
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup.string().required('You must enter a title'),
  description: yup.string().required('You must enter a description'),
});

function WorksDialog({ selectedId }) {
  const dispatch = useDispatch();
  const worksDialog = useSelector(({ documents }) => documents.documents.worksDialog);
  const work = useSelector(({ documents }) => documents.documents.work);
  const user = useSelector(({ auth }) => auth.user);
  const { watch, handleSubmit, formState, reset, control, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { errors, isValid, dirtyFields } = formState;
  const formId = watch('id');

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (worksDialog.type === 'edit' && work) {
      reset({ ...defaultValues, ...work });
    }

    /**
     * Dialog type: 'new'
     */
    if (worksDialog.type === 'new') {
      reset(defaultValues);
    }
  }, [work, worksDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (worksDialog.props.open) {
      initDialog();
    }
  }, [worksDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */

  function closeWorksDialog() {
    setImageUrl(null);
    return worksDialog.type === 'edit'
      ? dispatch(closeEditWorksDialog())
      : dispatch(closeNewWorksDialog());
  }

  /**
   * Form Submit
   */

  // const profileData = useSelector(({ userProfile }) => userProfile.profile);
  const { employeeId } = useParams();


  const onSubmitWork = (data) => {

    const empId = user?.employee_id || employeeId

    dispatch(
      saveWorks({
        userId: empId,
        file: imageUrl,
        data: getValues(),
      })
    ).then((resp) => {
      if (resp.payload) {
        dispatch(getWorks(empId)).then((res) => {
          if (res.payload) {
            dispatch(setAllWorks(res.payload));
          }
        });
      }
    });
  };

  const onEditWork = (data) => {
    const empId = user?.employee_id || employeeId
    dispatch(
      editWork({
        workId: selectedId,
        file: imageUrl,
        data: getValues(),
      })
    ).then((resp) => {
      if (resp.payload) {
        dispatch(getWorks(empId)).then((res) => {
          if (res.payload) {
            dispatch(setAllWorks(res.payload));
          }
        });
      }
    });
  };

  function onSubmit(data) {
    if (worksDialog.type === 'new') {
      const workdata = {
        title: getValues().title,
        description: getValues().description,
        path: getValues().path,
      };
      onSubmitWork(workdata);
      // dispatch(saveWorks({ userId: 5, data: data }));
    } else {
      const workdata = {
        title: getValues().title,
        description: getValues().description,
        path: getValues().path,
      };
      onEditWork(workdata);
      // dispatch();
      // updatePost({
      //   userId: user.id,
      //   postId: postDialog.data.id,
      //   data: {
      //     title: data.title,
      //     description: data.description,
      //   },
      // })
    }
    closeWorksDialog();
  }

  const [imageUrl, setImageUrl] = useState(null);
  const [isDisable, setDisable] = useState(true);

  const images = watch('path');

  console.log('imageUrl', imageUrl?.name);

  return (
    <Dialog {...worksDialog.props} onClose={closeWorksDialog} fullWidth maxWidth="sm" scroll="body">
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {worksDialog.type === 'new'
              ? 'Add Work'
              : worksDialog.data &&
                worksDialog.data.status === 'OPEN' &&
                worksDialog.data.postsAccepted.length === 0
              ? 'Edit Work'
              : 'My Work'}
          </Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent classes={{ root: 'p-0' }}>
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
            <FormControl className="mt-8 mb-16 flex-row" required fullWidth>
              <Box>
                <Controller
                  name="path"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <label
                      htmlFor="button-file"
                      className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                    >
                      <input
                        accept="*"
                        className="hidden"
                        id="button-file"
                        type="file"
                        onChange={async (e) => {
                          function readFileAsync() {
                            return new Promise((resolve, reject) => {
                              const file = e.target.files[0];
                              const extension = file.name
                                .substring(file.name.lastIndexOf('.') + 1)
                                .toLowerCase();
                              if (!file) {
                                return;
                              }

                              if (
                                extension === 'gif' ||
                                extension === 'png' ||
                                extension === 'bmp' ||
                                extension === 'jpeg' ||
                                extension === 'jpg' ||
                                extension === 'pdf' ||
                                extension === 'docx'
                              ) {
                                setImageUrl(file);
                                const reader = new FileReader();

                                reader.onload = () => {
                                  resolve({
                                    id: FuseUtils.generateGUID(),
                                    url: `data:${file.type};base64,${btoa(reader.result)}`,
                                    type: 'image',
                                  });
                                };

                                reader.onerror = reject;
                                setDisable(false);
                                reader.readAsBinaryString(file);
                              } else {
                                setDisable(true);
                                dispatch(showMessage({ message: 'Only image, PDF, Word file allowed' }));
                              }
                            });
                          }

                          const newImage = await readFileAsync();

                          onChange([newImage]);
                        }}
                      />
                      <Icon fontSize="large" color="action">
                        cloud_upload
                      </Icon>
                    </label>
                  )}
                />
                <Typography> {imageUrl?.name} </Typography>
              </Box>

              {/* {images === "" ? null : ( */}
              {/*   <Box> */}
              {/*     {images && typeof images === "object" ? ( */}
              {/*       <Controller */}
              {/*         name="featuredImageId" */}
              {/*         control={control} */}
              {/*         defaultValue="" */}
              {/*         render={({ field: { onChange, value } }) => */}
              {/*           images?.map((media) => ( */}
              {/*             <div */}
              {/*               onClick={() => onChange(value)} */}
              {/*               onKeyDown={() => onChange(value.id)} */}
              {/*               role="button" */}
              {/*               tabIndex={0} */}
              {/*               className={clsx( */}
              {/*                 "productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg", */}
              {/*                 media.id === value && "featured" */}
              {/*               )} */}
              {/*               key={media.id} */}
              {/*             > */}
              {/*               <img */}
              {/*                 className="max-w-none w-auto h-full" */}
              {/*                 src={media?.url} */}
              {/*                 alt="product" */}
              {/*               /> */}
              {/*             </div> */}
              {/*           )) */}
              {/*         } */}
              {/*       /> */}
              {/*     ) : ( */}
              {/*       <Controller */}
              {/*         name="featuredImageId" */}
              {/*         control={control} */}
              {/*         defaultValue="" */}
              {/*         render={({ field: { onChange, value } }) => ( */}
              {/*           <div */}
              {/*             onClick={() => onChange(value)} */}
              {/*             onKeyDown={() => onChange(value.id)} */}
              {/*             role="button" */}
              {/*             tabIndex={0} */}
              {/*             className={clsx( */}
              {/*               "productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg", */}
              {/*               value && "featured" */}
              {/*             )} */}
              {/*           > */}
              {/*             <img */}
              {/*               className="max-w-none w-auto h-full" */}
              {/*               src={`http://localhost:5000/api/avatar/${images}`} */}
              {/*               alt="Works Files" */}
              {/*             /> */}
              {/*           </div> */}
              {/*         )} */}
              {/*       /> */}
              {/*     )} */}
              {/*   </Box> */}
              {/* )} */}
            </FormControl>
          </div>
        </DialogContent>
        <>
          {worksDialog.type === 'new' ? (
            <DialogActions className="justify-end px-8 py-16">
              <div className="px-16">
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={_.isEmpty(dirtyFields) || !isValid}
                >
                  Add work
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

export default WorksDialog;
