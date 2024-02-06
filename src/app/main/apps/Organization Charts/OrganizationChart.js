import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import _ from 'lodash';
import clsx from 'clsx';
import Card from '@mui/material/Card';
import { CardHeader } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Icon from '@mui/material/Icon';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'white',
    display: 'inline-block',
    borderRadius: 16,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginTop: -10,
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.short,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#ECECF4',
  },
}));

const theme = createTheme({
  palette: {
    background: '#ECECF4',
  },
  fontFamily: 'Roboto, sans-serif',
});

function Organization({ org, onCollapse, collapsed }) {
  const classes = useStyles();
  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            <Icon>more_horiz</Icon>
          </Avatar>
        }
        title={`${org.name} (${org.nameRole})`}
      />
      <IconButton
        size="small"
        onClick={onCollapse}
        className={clsx(classes.expand, {
          [classes.expandOpen]: !collapsed,
        })}
      >
        {org.child.length > 0 ? <ExpandMoreIcon /> : null}
      </IconButton>
    </Card>
  );
}
function Node({ o, parent }) {
  const [collapsed, setCollapsed] = useState(o.collapsed);
  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    o.collapsed = collapsed;
  });
  const T = parent
    ? TreeNode
    : (props) => (
        <Tree {...props} lineWidth="2px" lineColor="#bbc" lineBorderRadius="12px">
          {props.children}
        </Tree>
      );
  return collapsed ? (
    <T label={<Organization org={o} onCollapse={handleCollapse} collapsed={collapsed} />} />
  ) : (
    <T label={<Organization org={o} onCollapse={handleCollapse} collapsed={collapsed} />}>
      {_.map(o.child, (c) => (
        <Node o={c} parent={o} />
      ))}
    </T>
  );
}

function OrganizationChart({ chartData }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box bgcolor="background" padding={4} height="80vh">
          <Node o={chartData[0]} />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default OrganizationChart;
