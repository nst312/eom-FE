import * as yup from "yup";

const defaultValues = {
  client_type: '',
  client_name: '',
  address: {
    name: '',
    street1: '',
    street2: '',
    city_id: 0,
    state_id: 0,
    zip: '',
    country_id: 0,
  },
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const websiteval =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

const schema = yup.object().shape({
  contact_number: yup
    .string()
    .required('You must enter a contact number')
    .matches(phoneRegExp, 'Contact number must be 10 digits')
    .min(10, 'Contact number must be 10 digits')
    .max(10, 'Contact number must be 10 digits'),

  work_email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  // website: yup.string().required('website is required').nullable(),
  // website: yup.string().required('Please enter website').matches(websiteval, 'Enter correct url!'),
  // gstin: yup.string().min(15, 'gst must be 15 digits').nullable(),
  client_name: yup.string().required('name is required.').nullable(),
});

const ClientConst = {
  defaultValues,
  schema,
};

export default ClientConst;
