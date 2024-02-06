import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ParentPermissionCheckBox from '../Components/ParentPermissionCheckBox';

function Permissions() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <div>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>CEO</Typography>
          </AccordionSummary>
          <AccordionDetails>
           <ParentPermissionCheckBox roles={"CEO"} />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>HR ADMIN</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ParentPermissionCheckBox roles={"HR_ADMIN"} />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>EMPLOYEE</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ParentPermissionCheckBox roles="EMPLOYEE" />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>FINANCE ADMIN</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ParentPermissionCheckBox roles="FINANCE_ADMIN" />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>HR EXECUTIVE</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ParentPermissionCheckBox roles="HR_EXECUTIVE" />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>SUPER ADMIN</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ParentPermissionCheckBox roles="SUPER_ADMIN" />
          </AccordionDetails>
        </Accordion>
        {
          /*
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>CEO</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <PermissionCheckBox roles="CEO" />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>HR ADMIN</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <PermissionCheckBox roles="HR_ADMIN" />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>EMPLOYEE</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <PermissionCheckBox roles="EMPLOYEE" />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>FINANCE ADMIN</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <PermissionCheckBox roles="FINANCE_ADMIN" />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>HR EXECUTIVE</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <PermissionCheckBox roles="HR_EXECUTIVE" />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>SUPER ADMIN</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <PermissionCheckBox roles="SUPER_ADMIN" />
          </AccordionDetails>
        </Accordion>

           */
        }
      </div>
    </>
  );
}

export default Permissions;
