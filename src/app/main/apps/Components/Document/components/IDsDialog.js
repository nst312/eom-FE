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
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import Autocomplete from '@mui/material/Autocomplete';
import {
  closeEditIDsDialog,
  closeNewIDsDialog,
  editID,
  getIDs,
  saveIDs,
  setAllIDs,
} from '../store/documentSlice';
import FuseUtils from '../../../../../../@fuse/utils';
import { showMessage } from '../../../../../store/fuse/messageSlice';

const defaultValues = {
  type: '',
  docNumber: '',
  useFor: '',
  path: '',
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  type: yup.string().required('You must enter a type'),
  docNumber: yup.string().required('You must have doc number'),
  useFor: yup.string().required('You must have use for field'),
  // path: yup.object().shape({
  //   file: yup.mixed().required('File is required'),
  // })
});

function IDsDialog({ selectedId }) {
  const dispatch = useDispatch();
  const idsDialog = useSelector(({ documents }) => documents.documents.idDialog);
  const id = useSelector(({ documents }) => documents.documents.id);
  const user = useSelector(({ auth }) => auth.user);
  console.log('id data', id);
  const { watch, handleSubmit, formState, reset, control, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { errors, isValid, dirtyFields } = formState;
  const formId = watch('id');

  console.log('errors', errors);

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (idsDialog.type === 'edit' && id) {
      reset({ ...defaultValues, ...id });
    }

    /**
     * Dialog type: 'new'
     */
    if (idsDialog.type === 'new') {
      reset(defaultValues);
    }
  }, [id, idsDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (idsDialog.props.open) {
      initDialog();
    }
  }, [idsDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */

  function closeIdsDialog() {
    setImageUrl(null);
    return idsDialog.type === 'edit'
      ? dispatch(closeEditIDsDialog())
      : dispatch(closeNewIDsDialog());
  }

  /**
   * Form Submit
   */

  // const profileData = useSelector(({ userProfile }) => userProfile.profile);

  const { employeeId } = useParams();

  const onSubmitId = (data) => {

    const empId = user?.employee_id || employeeId

    dispatch(
      saveIDs({
        userId: empId,
        file: imageUrl,
        data: getValues(),
      })
    ).then((resp) => {
      if (resp.payload) {
        dispatch(getIDs(empId)).then((res) => {
          if (res.payload) {
            dispatch(setAllIDs(res.payload));
          }
        });
      }
    });
  };

  const onEditId = (data) => {

    const empId = user?.employee_id || employeeId
    dispatch(
      editID({
        idId: selectedId,
        file: imageUrl,
        data: getValues(),
      })
    ).then((resp) => {
      if (resp.payload) {
        dispatch(getIDs(empId)).then((res) => {
          if (res.payload) {
            dispatch(setAllIDs(res.payload));
          }
        });
      }
    });
  };

  function onSubmit(data) {
    if (idsDialog.type === 'new') {
      console.log(getValues().type);
      const iddata = {
        type: getValues().type,
        docNumber: getValues().docNumber,
        useFor: getValues().useFor,
      };
      onSubmitId(iddata);
    } else {
      const iddata = {
        title: getValues().title,
        description: getValues().description,
        path: getValues().path,
      };
      onEditId(iddata);
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
    closeIdsDialog();
  }

  const [imageUrl, setImageUrl] = useState(null);
  const [isDisable, setDisable] = useState(true);

  console.log('imageURL', imageUrl);

  const images = watch('path');

  const type = [
    'PANCARD',
    'AADHARCARD',
    'VOTERID',
    'DRIVINGLICENSE',
    'PASSPORT',
    'ELECTRICITYBILL',
    'RENTAGREEMENT',
    'BANKPASSBOOK',
  ];

  return (
    <Dialog {...idsDialog.props} onClose={closeIdsDialog} fullWidth maxWidth="sm" scroll="body">
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {idsDialog.type === 'new'
              ? 'Add ID'
              : idsDialog.data &&
                idsDialog.data.status === 'OPEN' &&
                idsDialog.data.postsAccepted.length === 0
              ? 'Edit ID'
              : 'My ID'}
          </Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent classes={{ root: 'p-0' }}>
          <div className="px-16 mt-16 sm:px-24">
            <FormControl className="mt-8 mb-16" fullWidth>
              <Controller
                name="type"
                control={control}
                fullWidth
                render={({ field: { onChange, value } }) => {
                  console.log('autocomplete', value);
                  return (
                    <Autocomplete
                      className="mt-8 mb-16"
                      options={type}
                      getOptionLabel={(option) => option}
                      value={value}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          onChange(newValue);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField autoFocus {...params} name="type" label="Type" variant="outlined" />
                      )}
                    />
                  );
                }}
              />
            </FormControl>
            <FormControl className="mt-8 mb-16" required fullWidth>
              <Controller
                name="docNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Document Number"
                    error={!!errors.docNumber}
                    helperText={errors?.docNumber?.message}
                    required
                    variant="outlined"
                  />
                )}
              />
            </FormControl>
            <FormControl className="mt-8 mb-16" required fullWidth>
              <Controller
                name="useFor"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Use For"
                    error={!!errors.useFor}
                    helperText={errors?.useFor?.message}
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
                        accept="image/png, image/jpeg"
                        className="hidden"
                        id="button-file"
                        type="file"
                        required={require}
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
                                extension === 'png' ||
                                extension === 'bmp' ||
                                extension === 'jpeg' ||
                                extension === 'jpg' ||
                                extension === 'pdf'
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
                                dispatch(showMessage({ message: 'Only image allowed' }));
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
                {imageUrl?.path}
                <Typography> {imageUrl?.name} </Typography>
              </Box>

              {/* {images === '' ? null : ( */}
              {/*   <Box> */}
              {/*     {images && typeof images === 'object' ? ( */}
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
              {/*                 'productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg', */}
              {/*                 media.id === value && 'featured' */}
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
              {/*               'productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg', */}
              {/*               value && 'featured' */}
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
          {idsDialog.type === 'new' ? (
            <DialogActions className="justify-end px-8 py-16">
              <div className="px-16">
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={_.isEmpty(dirtyFields) || !isValid}
                >
                  Add certificate
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

export default IDsDialog;
