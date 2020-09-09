import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPrescriptionStatus, defaultValue } from 'app/shared/model/prescription-status.model';

export const ACTION_TYPES = {
  FETCH_PRESCRIPTIONSTATUS_LIST: 'prescriptionStatus/FETCH_PRESCRIPTIONSTATUS_LIST',
  FETCH_PRESCRIPTIONSTATUS: 'prescriptionStatus/FETCH_PRESCRIPTIONSTATUS',
  CREATE_PRESCRIPTIONSTATUS: 'prescriptionStatus/CREATE_PRESCRIPTIONSTATUS',
  UPDATE_PRESCRIPTIONSTATUS: 'prescriptionStatus/UPDATE_PRESCRIPTIONSTATUS',
  DELETE_PRESCRIPTIONSTATUS: 'prescriptionStatus/DELETE_PRESCRIPTIONSTATUS',
  RESET: 'prescriptionStatus/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPrescriptionStatus>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PrescriptionStatusState = Readonly<typeof initialState>;

// Reducer

export default (state: PrescriptionStatusState = initialState, action): PrescriptionStatusState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PRESCRIPTIONSTATUS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRESCRIPTIONSTATUS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PRESCRIPTIONSTATUS):
    case REQUEST(ACTION_TYPES.UPDATE_PRESCRIPTIONSTATUS):
    case REQUEST(ACTION_TYPES.DELETE_PRESCRIPTIONSTATUS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PRESCRIPTIONSTATUS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRESCRIPTIONSTATUS):
    case FAILURE(ACTION_TYPES.CREATE_PRESCRIPTIONSTATUS):
    case FAILURE(ACTION_TYPES.UPDATE_PRESCRIPTIONSTATUS):
    case FAILURE(ACTION_TYPES.DELETE_PRESCRIPTIONSTATUS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRESCRIPTIONSTATUS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRESCRIPTIONSTATUS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRESCRIPTIONSTATUS):
    case SUCCESS(ACTION_TYPES.UPDATE_PRESCRIPTIONSTATUS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRESCRIPTIONSTATUS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/prescription-statuses';

// Actions

export const getEntities: ICrudGetAllAction<IPrescriptionStatus> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PRESCRIPTIONSTATUS_LIST,
  payload: axios.get<IPrescriptionStatus>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPrescriptionStatus> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRESCRIPTIONSTATUS,
    payload: axios.get<IPrescriptionStatus>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPrescriptionStatus> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRESCRIPTIONSTATUS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPrescriptionStatus> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRESCRIPTIONSTATUS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPrescriptionStatus> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRESCRIPTIONSTATUS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
