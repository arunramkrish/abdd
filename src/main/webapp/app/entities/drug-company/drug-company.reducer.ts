import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDrugCompany, defaultValue } from 'app/shared/model/drug-company.model';

export const ACTION_TYPES = {
  FETCH_DRUGCOMPANY_LIST: 'drugCompany/FETCH_DRUGCOMPANY_LIST',
  FETCH_DRUGCOMPANY: 'drugCompany/FETCH_DRUGCOMPANY',
  CREATE_DRUGCOMPANY: 'drugCompany/CREATE_DRUGCOMPANY',
  UPDATE_DRUGCOMPANY: 'drugCompany/UPDATE_DRUGCOMPANY',
  DELETE_DRUGCOMPANY: 'drugCompany/DELETE_DRUGCOMPANY',
  RESET: 'drugCompany/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDrugCompany>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type DrugCompanyState = Readonly<typeof initialState>;

// Reducer

export default (state: DrugCompanyState = initialState, action): DrugCompanyState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DRUGCOMPANY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DRUGCOMPANY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_DRUGCOMPANY):
    case REQUEST(ACTION_TYPES.UPDATE_DRUGCOMPANY):
    case REQUEST(ACTION_TYPES.DELETE_DRUGCOMPANY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_DRUGCOMPANY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DRUGCOMPANY):
    case FAILURE(ACTION_TYPES.CREATE_DRUGCOMPANY):
    case FAILURE(ACTION_TYPES.UPDATE_DRUGCOMPANY):
    case FAILURE(ACTION_TYPES.DELETE_DRUGCOMPANY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DRUGCOMPANY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DRUGCOMPANY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_DRUGCOMPANY):
    case SUCCESS(ACTION_TYPES.UPDATE_DRUGCOMPANY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_DRUGCOMPANY):
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

const apiUrl = 'api/drug-companies';

// Actions

export const getEntities: ICrudGetAllAction<IDrugCompany> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DRUGCOMPANY_LIST,
  payload: axios.get<IDrugCompany>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IDrugCompany> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DRUGCOMPANY,
    payload: axios.get<IDrugCompany>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IDrugCompany> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DRUGCOMPANY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDrugCompany> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DRUGCOMPANY,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDrugCompany> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DRUGCOMPANY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
