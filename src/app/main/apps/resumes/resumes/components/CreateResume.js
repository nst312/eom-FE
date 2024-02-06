import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import CertificateDetails from './resume-fields/CertificateDetails';
import EducationDetails from './resume-fields/EducationDetails';
import EmploymentDetails from './resume-fields/EmploymentDetails';
import HobbiesDetails from './resume-fields/HobbiesDetails';
import LanguagesDetails from './resume-fields/LanguagesDetails';
import PersonalDetails from './resume-fields/PersonalDetails';
import ProfileDetails from './resume-fields/ProfileDetails';
import SkillDetails from './resume-fields/SkillDetails';

function CreateResume() {
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
  });
  const { control, watch, getValues } = methods;
  const [expanded, setExpanded] = React.useState('PersonalDetails');

  const handleChange = (panel) => {
    if (panel === expanded) {
      setExpanded('');
    } else {
      setExpanded(panel);
    }
  };
  return (
    <FormProvider {...methods}>
      <div className="w-full h-full text-center bg-white px-24 overflow-auto pb-24">
        <PersonalDetails handleChange={(e) => handleChange(e)} expanded={expanded} />
        <EducationDetails handleChange={(e) => handleChange(e)} expanded={expanded} />
        <SkillDetails handleChange={(e) => handleChange(e)} expanded={expanded} />
        <EmploymentDetails handleChange={(e) => handleChange(e)} expanded={expanded} />
        <LanguagesDetails handleChange={(e) => handleChange(e)} expanded={expanded} />
        <HobbiesDetails handleChange={(e) => handleChange(e)} expanded={expanded} />
        <CertificateDetails handleChange={(e) => handleChange(e)} expanded={expanded} />
        <ProfileDetails handleChange={(e) => handleChange(e)} expanded={expanded} />
      </div>
    </FormProvider>
  );
}

export default CreateResume;
