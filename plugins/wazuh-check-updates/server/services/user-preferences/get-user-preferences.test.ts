import { getSavedObject } from '../saved-object/get-saved-object';
import { getUserPreferences } from './get-user-preferences';
import { SAVED_OBJECT_USER_PREFERENCES } from '../../../common/constants';
import { getWazuhCore } from '../../plugin-services';

const mockedGetSavedObject = getSavedObject as jest.Mock;
jest.mock('../saved-object/get-saved-object');

const mockedGetWazuhCore = getWazuhCore as jest.Mock;
jest.mock('../../plugin-services');

describe('getUserPreferences function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return user preferences', async () => {
    mockedGetSavedObject.mockImplementation(() => ({
      last_dismissed_updates: [
        {
          api_id: 'api id',
          last_patch: '4.3.1',
        },
      ],
      hide_update_notifications: false,
    }));

    const response = await getUserPreferences('admin');

    expect(getSavedObject).toHaveBeenCalledTimes(1);
    expect(getSavedObject).toHaveBeenCalledWith(SAVED_OBJECT_USER_PREFERENCES, 'admin');

    expect(response).toEqual({
      last_dismissed_updates: [
        {
          api_id: 'api id',
          last_patch: '4.3.1',
        },
      ],
      hide_update_notifications: false,
    });
  });

  test('should return an error', async () => {
    mockedGetSavedObject.mockRejectedValue(new Error('getSavedObject error'));

    mockedGetWazuhCore.mockImplementation(() => ({
      services: { log: jest.fn().mockImplementation(() => {}) },
    }));

    const promise = getUserPreferences('admin');

    expect(getSavedObject).toHaveBeenCalledTimes(1);

    await expect(promise).rejects.toThrow('getSavedObject error');
  });
});
