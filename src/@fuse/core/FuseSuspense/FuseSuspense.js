import FuseLoading from '@fuse/core/FuseLoading';
import PropTypes from 'prop-types';
import { Suspense } from 'react';
import FuseProgress from '../../../app/main/apps/Components/FuseProgress';

/**
 * React Suspense defaults
 * For to Avoid Repetition
 */ function FuseSuspense(props) {
  return <Suspense fallback={<FuseProgress {...props.loadingProps} />}>{props.children}</Suspense>;
}

FuseSuspense.propTypes = {
  loadingProps: PropTypes.object,
};

FuseSuspense.defaultProps = {
  loadingProps: {
    delay: 0,
  },
};

export default FuseSuspense;
