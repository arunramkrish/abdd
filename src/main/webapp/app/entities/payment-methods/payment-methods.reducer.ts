import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPaymentMethods, defaultValue } from 'app/shared/model/payment-methods.model';

export const ACTION_TYPES = {
  FETCH_PAYMENTMETHODS_LIST: 'paymentMethods/FETCH_PAYMENTMETHODS_LIST',
  FETCH_PAYMENTMETHODS: 'paymentMethods/FETCH_PAYMENTMETHODS',
  CREATE_PAYMENTMETHODS: 'paymentMethods/CREATE_PAYMENTMETHODS',
  UPDATE_PAYMENTMETHODS: 'paymentMethods/UPDATE_PAYMENTMETHODS',
  DELETE_PAYMENTMETHODS: 'paymentMethods/DELETE_PAYMENTMETHODS',
  RESET: 'paymentMethods/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPaymentMethods>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PaymentMethodsState = Readonly<typeof initialState>;

// Reducer

export default (state: PaymentMethodsState = initialState, action): PaymentMethodsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PAYMENTMETHODS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PAYMENTMETHODS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PAYMENTMETHODS):
    case REQUEST(ACTION_TYPES.UPDATE_PAYMENTMETHODS):
    case REQUEST(ACTION_TYPES.DELETE_PAYMENTMETHODS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PAYMENTMETHODS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PAYMENTMETHODS):
    case FAILURE(ACTION_TYPES.CREATE_PAYMENTMETHODS):
    case FAILURE(ACTION_TYPES.UPDATE_PAYMENTMETHODS):
    case FAILURE(ACTION_TYPES.DELETE_PAYMENTMETHODS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAYMENTMETHODS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAYMENTMETHODS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PAYMENTMETHODS):
    case SUCCESS(ACTION_TYPES.UPDATE_PAYMENTMETHODS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PAYMENTMETHODS):
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

const apiUrl = 'api/payment-methods';

// Actions

export const getEntities: ICrudGetAllAction<IPaymentMethods> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PAYMENTMETHODS_LIST,
  payload: axios.get<IPaymentMethods>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPaymentMethods> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PAYMENTMETHODS,
    payload: axios.get<IPaymentMethods>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPaymentMethods> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PAYMENTMETHODS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPaymentMethods> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PAYMENTMETHODS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPaymentMethods> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PAYMENTMETHODS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
