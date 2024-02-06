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
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Box } from '@mui/system';
import Autocomplete from '@mui/material/Autocomplete';
import {
  closeEditCertificatesDialog,
  closeNewCertificatesDialog,
  editCertificate,
  getCertificates,
  saveCertificates,
  setAllCertificates,
} from '../store/documentSlice';
import FuseUtils from '../../../../../../@fuse/utils';
import { showMessage } from '../../../../../store/fuse/messageSlice';

const defaultValues = {
  type: '',
  title: '',
  path: '',
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  type: yup.string().required('You must enter a type'),
  title: yup.string().required('You must enter a title'),
  // path: yup.object().shape({
  //   file: yup.mixed().required('File is required'),
  // })
});

function CertificateDialog({ selectedId }) {
  const dispatch = useDispatch();
  const certificatesDialog = useSelector(
    ({ documents }) => documents.documents.certificateDialog
  );
  const certificate = useSelector(({ documents }) => documents.documents.certificate);
  const user = useSelector(({ auth }) => auth.user);

  const { watch, handleSubmit, formState, reset, control, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { errors, isValid, dirtyFields } = formState;
  const formId = watch('id');

  console.log("errors" , errors)

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (certificatesDialog.type === 'edit' && certificate) {
      reset({ ...defaultValues, ...certificate });
    }

    /**
     * Dialog type: 'new'
     */
    if (certificatesDialog.type === 'new') {
      reset(defaultValues);
    }
  }, [certificate, certificatesDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (certificatesDialog.props.open) {
      initDialog();
    }
  }, [certificatesDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */

  function closeCertificatesDialog() {
    setImageUrl(null);
    return certificatesDialog.type === 'edit'
      ? dispatch(closeEditCertificatesDialog())
      : dispatch(closeNewCertificatesDialog());
  }

  /**
   * Form Submit
   */

  // const profileData = useSelector(({ userProfile }) => userProfile.profile);
  const { employeeId } = useParams();


  const onSubmitWork = (data) => {

    const empId = user?.employee_id || employeeId
    dispatch(
      saveCertificates({
        userId: empId,
        file: imageUrl,
        data: getValues(),
      })
    ).then((resp) => {
      if (resp.payload) {
        dispatch(getCertificates(empId)).then((res) => {
          if (res.payload) {
            dispatch(setAllCertificates(res.payload));
          }
        });
      }
    });
  };

  const onEditCertificate = (data) => {
    const empId = user?.employee_id || employeeId

    dispatch(
      editCertificate({
        certificateId: selectedId,
        file: imageUrl,
        data: getValues(),
      })
    ).then((resp) => {
      if (resp.payload) {
        dispatch(getCertificates(empId)).then((res) => {
          if (res.payload) {
            dispatch(setAllCertificates(res.payload));
          }
        });
      }
    });
  };

  function onSubmit(data) {
    if (certificatesDialog.type === 'new') {
      console.log(getValues().type);
      const certificatedata = {
        type: getValues().type,
        title: getValues().title,
        path: getValues().path,
      };
      onSubmitWork(certificatedata);
    } else {
      const certificatedata = {
        title: getValues().title,
        description: getValues().description,
        path: getValues().path,
      };
      onEditCertificate(certificatedata);
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
    closeCertificatesDialog();
  }

  const [imageUrl, setImageUrl] = useState(null);
  const [isDisable, setDisable] = useState(true);

  const images = watch('path');

  // const type = [
  //   { label: 'Graduation', value: 'GRADUATION' },
  //   { label: 'Post Graduation', value: 'POSTGRADUATION' },
  //   { label: 'Diploma', value: 'DIPLOMA' },
  //   { label: 'Other', value: 'OTHER' },
  // ];

  const type = [
   'GRADUATION',
  'POSTGRADUATION',
   'DIPLOMA',
   'OTHER'
  ];


  return (
    <Dialog
      {...certificatesDialog.props}
      onClose={closeCertificatesDialog}
      fullWidth
      maxWidth="sm"
      scroll="body"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {certificatesDialog.type === 'new'
              ? 'Add Certificate'
              : certificatesDialog.data &&
                certificatesDialog.data.status === 'OPEN' &&
                certificatesDialog.data.postsAccepted.length === 0
              ? 'Edit Certificate'
              : 'My Certificate'}
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
                  console.log("autocomplete" , value)
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
                        <TextField
                          autoFocus
                          {...params} name="type" label="Type" variant="outlined" />
                      )}
                    />
                  );
                }}
              />
            </FormControl>
            <FormControl className="mt-8 mb-16" required fullWidth>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    error={!!errors.title}
                    helperText={errors?.title?.message}
                    required
                    variant="outlined"
                  />
                )}
              />
            </FormControl>

            {/* <FormControl className="mt-8 mb-16" required fullWidth> */}
            {/*   <Controller */}
            {/*     name="description" */}
            {/*     control={control} */}
            {/*     render={({ field }) => ( */}
            {/*       <TextField */}
            {/*         {...field} */}
            {/*         multiline */}
            {/*         rows="6" */}
            {/*         label="Description" */}
            {/*         error={!!errors.description} */}
            {/*         helperText={errors?.description?.message} */}
            {/*         required */}
            {/*         variant="outlined" */}
            {/*       /> */}
            {/*     )} */}
            {/*   /> */}
            {/* </FormControl> */}
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
          {certificatesDialog.type === 'new' ? (
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

export default CertificateDialog;
