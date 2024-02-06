import FusePageCarded from "@fuse/core/FusePageCarded";
import { styled } from "@mui/material/styles";
import withReducer from "app/store/withReducer";
import React, { useState } from "react";
import InvitationDialog from "./InvitationDialog";
import InvitationHeader from "./InvitationHeader";
import InvitationTable from "./InvitationTable";
import reducer from "./store";
import FuseLoading from "@fuse/core/FuseLoading";
import Tour from 'reactour';

const Root = styled(FusePageCarded)(({ theme }) => ({
  "& .FusePageCarded-header": {
    minHeight: 72,
    height: 72,
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      minHeight: 136,
      height: 136,
    },
  },
  "& .FusePageCarded-content": {
    display: "flex",
  },
  "& .FusePageCarded-contentCard": {
    overflow: "hidden",
  },
}));

function Invitation() {
  const [loading, setLoading] = useState(true);

  const onLoadingFalse = (value) => {
    setLoading(value);
  };

  const [stepsEnabled, setStepsEnabled] = useState(true);

  const walkthroughInvitation = localStorage.getItem("walkthroughInvitation");

  const steps = [
    {
      selector: '[data-tour="sendInvitation"]',
      content: "You can send more invitiation to the employees!"
    },
  ];


  return (
    <>
      <Root
        header={
          <InvitationHeader
            setLoading={(e) => onLoadingFalse(e)}
            loading={loading}
          />
        }
        content={
          <InvitationTable
            setLoading={(e) => onLoadingFalse(e)}
            loading={loading}
          />
        }
        innerScroll
      />
      <InvitationDialog
        setLoading={(e) => onLoadingFalse(e)}
        loading={loading}
      />
      {
        walkthroughInvitation == "1" ? null :  <Tour
          steps={steps}
          isOpen={stepsEnabled}
          onRequestClose={() => {
            setStepsEnabled(false);
            localStorage.setItem("walkthroughInvitation","1");
          }}
        />
      }

    </>
  );
}

export default withReducer("invitationApp", reducer)(Invitation);
