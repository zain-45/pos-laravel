import apiConfig from '../../config/apiConfig';
import { apiBaseURL, frontSettingActionType, toastType } from '../../constants';
import { addToast } from './toastAction';

export const fetchFrontSetting = () => async ( dispatch ) => {
    apiConfig.get( apiBaseURL.FRONT_SETTING )
        .then( ( response ) => {
            // Response structure: response.data = {success: true, data: {data: {type: 'settings', value: {...}}}, message: '...'}
            // We need response.data.data which contains {type: 'settings', value: {...}}
            const payload = response.data?.data || {};
            dispatch( { type: frontSettingActionType.FETCH_FRONT_SETTING, payload: payload } );
        } )
        .catch( ( error ) => {
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to load settings';
            // Don't show error toast for front-setting as it's not critical for login
            // Set empty object with value property to prevent undefined errors
            dispatch( { type: frontSettingActionType.FETCH_FRONT_SETTING, payload: { value: {} } } );
        } );
}
