/*
 * Wazuh app - React component for reporting
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import React, { Component } from 'react';

import WzReduxProvider from '../../../../../redux/wz-redux-provider';
//Wazuh groups overview
import WzReportingOverview from './reporting-overview';
import { compose } from 'redux';
import {
  withGlobalBreadcrumb,
  withReduxProvider,
} from '../../../../../components/common/hocs';
import { reporting } from '../../../../../utils/applications';

class WzReporting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <WzReduxProvider>
        <WzReportingOverview />
      </WzReduxProvider>
    );
  }
}

export default compose(
  withReduxProvider,
  withGlobalBreadcrumb(props => {
    return [{ text: reporting.title }];
  }),
)(WzReporting);
