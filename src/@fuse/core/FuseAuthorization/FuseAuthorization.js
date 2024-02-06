import FuseUtils from '@fuse/utils';
import AppContext from 'app/AppContext';
import { Component } from 'react';
import { connect } from 'react-redux';
import { matchRoutes } from 'react-router-dom';
import withRouter from '@fuse/core/withRouter';
import settingsConfig from 'app/fuse-configs/settingsConfig';
import history from '../../../@history';

class FuseAuthorization extends Component {
  constructor(props, context) {
    super(props);
    const { routes } = context;
    this.state = {
      accessGranted: true,
      routes,
    };
    this.defaultLoginRedirectUrl = settingsConfig.loginRedirectUrl || '/';
  }

  componentDidMount() {
    if (!this.state.accessGranted) {
      history.push('err')
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.accessGranted !== this.state.accessGranted;
  }

  componentDidUpdate() {
    if (!this.state.accessGranted) {
      this.redirectRoute();
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { location, userRole } = props;
    const { pathname } = location;

    const matchedRoutes = matchRoutes(state.routes, pathname);
    const matched = matchedRoutes ? matchedRoutes[0] : false;
    return {
      accessGranted: matched ? FuseUtils.hasPermission(matched.route.auth, userRole) : true,
    };
  }

  redirectRoute() {
    const { location, userRole } = this.props;
    const { pathname } = location;
    const loginRedirectUrl = settingsConfig.loginRedirectUrl
      ? settingsConfig.loginRedirectUrl
      : this.defaultLoginRedirectUrl;
  }

  render() {
    // console.info('Fuse Authorization rendered', this.state.accessGranted);
    return this.state.accessGranted ? <>{this.props.children}</> : null;
  }
}

function mapStateToProps({ auth }) {
  return {
    userRole: auth.user.permissions,
  };
}

FuseAuthorization.contextType = AppContext;

export default withRouter(connect(mapStateToProps)(FuseAuthorization));
