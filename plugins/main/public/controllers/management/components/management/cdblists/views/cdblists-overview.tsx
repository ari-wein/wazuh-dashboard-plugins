import React, { useState } from 'react';

// Eui components
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiPage,
  EuiSpacer,
} from '@elastic/eui';

// Wazuh components
import {
  withUserAuthorizationPrompt,
  withGlobalBreadcrumb,
} from '../../../../../../components/common/hocs';
import { compose } from 'redux';
import { resourceDictionary } from '../../common/resources-handler';
import { SECTION_CDBLIST_KEY } from '../../common/constants';
import CDBListsTable from '../components/cdblists-table';
import '../../common/layout-overview.scss';
import WzRestartClusterManagerCallout from '../../../../../../components/common/restart-cluster-manager-callout';
import { cdbLists } from '../../../../../../utils/applications';

function WzCDBListsOverview(props) {
  const [showWarningRestart, setShowWarningRestart] = useState(false);

  const updateRestartManagers = showWarningRestart => {
    setShowWarningRestart(showWarningRestart);
  };

  return (
    <EuiPage style={{ background: 'transparent' }}>
      <EuiPanel>
        {showWarningRestart && (
          <>
            <EuiSpacer size='s' />
            <WzRestartClusterManagerCallout
              onRestarted={() => updateRestartManagers(false)}
              onRestartedError={() => updateRestartManagers(true)}
            />
            <EuiSpacer size='s' />
          </>
        )}

        <EuiFlexGroup>
          <EuiFlexItem>
            <CDBListsTable
              {...props}
              updateRestartClusterManager={showWarningRestart =>
                updateRestartManagers(showWarningRestart)
              }
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    </EuiPage>
  );
}

export default compose(
  withGlobalBreadcrumb(props => {
    return [{ text: cdbLists.title }];
  }),
  withUserAuthorizationPrompt(props => [
    {
      action: `${SECTION_CDBLIST_KEY}:read`,
      resource: resourceDictionary[SECTION_CDBLIST_KEY].permissionResource('*'),
    },
  ]),
)(WzCDBListsOverview);
