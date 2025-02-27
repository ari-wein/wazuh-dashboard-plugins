/*
 * Wazuh app - Load the Settings React components.
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import { SettingsController } from './settings';
import { ApiTable } from '../../components/settings/api/api-table';
import { AddApi } from '../../components/settings/api/add-api';
import { ApiIsDown } from '../../components/settings/api/api-is-down';
import { WzConfigurationSettings } from '../../components/settings/configuration/configuration';
import SettingsLogs from '../../components/settings/settings-logs/logs';
import { SettingsMiscellaneous } from '../../components/settings/miscellaneous/miscellaneous';
import { WzSampleDataWrapper } from '../../components/add-modules-data/WzSampleDataWrapper';
import { getAngularModule } from '../../kibana-services';
import { SettingsAbout } from '../../components/settings/about';

const app = getAngularModule();

WzSampleDataWrapper.displayName = 'WzSampleDataWrapper';
WzConfigurationSettings.displayName = 'WzConfigurationSettings';
SettingsLogs.displayName = 'SettingsLogs';
SettingsMiscellaneous.displayName = 'SettingsMiscellaneous';
ApiTable.displayName = 'ApiTable';
AddApi.displayName = 'AddApi';
ApiIsDown.displayName = 'ApiIsDown';
SettingsAbout.displayName = 'SettingsAbout';

app
  .controller('settingsController', SettingsController)
  .value('WzSampleDataWrapper', WzSampleDataWrapper)
  .value('WzConfigurationSettings', WzConfigurationSettings)
  .value('SettingsLogs', SettingsLogs)
  .value('SettingsMiscelaneous', SettingsMiscellaneous)
  .value('ApiTable', ApiTable)
  .value('AddApi', AddApi)
  .value('ApiIsDown', ApiIsDown)
  .value('SettingsAbout', SettingsAbout);
