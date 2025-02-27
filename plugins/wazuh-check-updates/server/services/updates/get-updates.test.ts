import { getSavedObject } from '../saved-object/get-saved-object';
import { setSavedObject } from '../saved-object/set-saved-object';
import { getWazuhCore } from '../../plugin-services';
import { API_UPDATES_STATUS } from '../../../common/types';
import { getUpdates } from './get-updates';
import { SAVED_OBJECT_UPDATES } from '../../../common/constants';

const mockedGetSavedObject = getSavedObject as jest.Mock;
jest.mock('../saved-object/get-saved-object');

const mockedSetSavedObject = setSavedObject as jest.Mock;
jest.mock('../saved-object/set-saved-object');

const mockedGetWazuhCore = getWazuhCore as jest.Mock;
jest.mock('../../plugin-services');

describe('getUpdates function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return available updates from saved object', async () => {
    mockedGetSavedObject.mockImplementation(() => ({
      last_check_date: '2023-09-30T14:00:00.000Z',
      apis_available_updates: [
        {
          api_id: 'api id',
          current_version: '4.3.1',
          status: API_UPDATES_STATUS.UP_TO_DATE,
          last_available_patch: {
            description:
              '## Manager\r\n\r\n### Fixed\r\n\r\n- Fixed a crash when overwrite rules are triggered...',
            published_date: '2022-05-18T10:12:43Z',
            semver: {
              major: 4,
              minor: 3,
              patch: 8,
            },
            tag: 'v4.3.8',
            title: 'Wazuh v4.3.8',
          },
        },
      ],
    }));

    const updates = await getUpdates();

    expect(getSavedObject).toHaveBeenCalledTimes(1);
    expect(getSavedObject).toHaveBeenCalledWith(SAVED_OBJECT_UPDATES);

    expect(updates).toEqual({
      last_check_date: '2023-09-30T14:00:00.000Z',
      apis_available_updates: [
        {
          api_id: 'api id',
          current_version: '4.3.1',
          status: API_UPDATES_STATUS.UP_TO_DATE,
          last_available_patch: {
            description:
              '## Manager\r\n\r\n### Fixed\r\n\r\n- Fixed a crash when overwrite rules are triggered...',
            published_date: '2022-05-18T10:12:43Z',
            semver: {
              major: 4,
              minor: 3,
              patch: 8,
            },
            tag: 'v4.3.8',
            title: 'Wazuh v4.3.8',
          },
        },
      ],
    });
  });

  test('should return available updates from api', async () => {
    mockedGetWazuhCore.mockImplementation(() => ({
      controllers: {
        WazuhHostsCtrl: jest.fn().mockImplementation(() => ({
          getHostsEntries: jest.fn().mockImplementation(() => [{ id: 'api id' }]),
        })),
      },
      services: {
        wazuhApiClient: {
          client: {
            asInternalUser: {
              request: jest.fn().mockImplementation(() => ({
                data: {
                  data: {
                    current_version: '4.3.1',
                    last_available_patch: {
                      description:
                        '## Manager\r\n\r\n### Fixed\r\n\r\n- Fixed a crash when overwrite rules are triggered...',
                      published_date: '2022-05-18T10:12:43Z',
                      semver: {
                        major: 4,
                        minor: 3,
                        patch: 8,
                      },
                      tag: 'v4.3.8',
                      title: 'Wazuh v4.3.8',
                    },
                  },
                },
              })),
            },
          },
        },
      },
    }));
    mockedSetSavedObject.mockImplementation(() => ({}));

    const updates = await getUpdates(true);

    expect(updates).toEqual({
      last_check_date: expect.any(Date),
      apis_available_updates: [
        {
          api_id: 'api id',
          current_version: '4.3.1',
          status: API_UPDATES_STATUS.AVAILABLE_UPDATES,
          last_available_patch: {
            description:
              '## Manager\r\n\r\n### Fixed\r\n\r\n- Fixed a crash when overwrite rules are triggered...',
            published_date: '2022-05-18T10:12:43Z',
            semver: {
              major: 4,
              minor: 3,
              patch: 8,
            },
            tag: 'v4.3.8',
            title: 'Wazuh v4.3.8',
          },
        },
      ],
    });
  });
});
