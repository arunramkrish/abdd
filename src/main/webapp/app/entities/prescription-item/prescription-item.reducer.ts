import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPrescriptionItem, defaultValue } from 'app/shared/model/prescription-item.model';

export const ACTION_TYPES = {
  FETCH_PRESCRIPTIONITEM_LIST: 'prescriptionItem/FETCH_PRESCRIPTIONITEM_LIST',
  FETCH_PRESCRIPTIONITEM: 'prescriptionItem/FETCH_PRESCRIPTIONITEM',
  CREATE_PRESCRIPTIONITEM: 'prescriptionItem/CREATE_PRESCRIPTIONITEM',
  UPDATE_PRESCRIPTIONITEM: 'prescriptionItem/UPDATE_PRESCRIPTIONITEM',
  DELETE_PRESCRIPTIONITEM: 'prescriptionItem/DELETE_PRESCRIPTIONITEM',
  RESET: 'prescriptionItem/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPrescriptionItem>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PrescriptionItemState = Readonly<typeof initialState>;

// Reducer

export default (state: PrescriptionItemState = initialState, action): PrescriptionItemState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PRESCRIPTIONITEM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRESCRIPTIONITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PRESCRIPTIONITEM):
    case REQUEST(ACTION_TYPES.UPDATE_PRESCRIPTIONITEM):
    case REQUEST(ACTION_TYPES.DELETE_PRESCRIPTIONITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PRESCRIPTIONITEM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRESCRIPTIONITEM):
    case FAILURE(ACTION_TYPES.CREATE_PRESCRIPTIONITEM):
    case FAILURE(ACTION_TYPES.UPDATE_PRESCRIPTIONITEM):
    case FAILURE(ACTION_TYPES.DELETE_PRESCRIPTIONITEM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRESCRIPTIONITEM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRESCRIPTIONITEM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRESCRIPTIONITEM):
    case SUCCESS(ACTION_TYPES.UPDATE_PRESCRIPTIONITEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRESCRIPTIONITEM):
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

const apiUrl = 'api/prescription-items';

// Actions

export const getEntities: ICrudGetAllAction<IPrescriptionItem> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PRESCRIPTIONITEM_LIST,
  payload: axios.get<IPrescriptionItem>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPrescriptionItem> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRESCRIPTIONITEM,
    payload: axios.get<IPrescriptionItem>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPrescriptionItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRESCRIPTIONITEM,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPrescriptionItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRESCRIPTIONITEM,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPrescriptionItem> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRESCRIPTIONITEM,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
