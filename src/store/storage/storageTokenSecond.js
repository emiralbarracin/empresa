import AsyncStorage from '@react-native-async-storage/async-storage';

const USUARIO_KEY = '@usuario:key';
const TOKEN_KEY = '@token:key';
const TOKEN_KEY_TUCO = '@token_tuco:key';
const TOKEN_KEY_EXTERNO = '@token_externo:key';
const CLIENTE_KEY = '@cliente:key';
const ID_KEY_EXTERNO = '@id_externo:key';
const SESSIONID_KEY_EXTERNO = '@sessionid_externo:key';
const TOKEN_KEY_ONBOARDING = '@token_onboarding:key';

export const onSetStorageUserSecond = async userBase64 => {
  try {
    await AsyncStorage.setItem(USUARIO_KEY, JSON.stringify(userBase64));
    return JSON.stringify(userBase64);
  } catch (error) {
    throw error;
  }
};

export const onGetStorageUserSecond = async () => {
  try {
    const user = await AsyncStorage.getItem(USUARIO_KEY);
    return JSON.parse(user);
  } catch (error) {
    throw error;
  }
};

export const onSetStorageTokenSecond = async token => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(token));
    return JSON.stringify(token);
  } catch (error) {
    throw error;
  }
};

export const onGetStorageTokenSecond = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return JSON.parse(token);
  } catch (error) {
    throw error;
  }
};

export const onSetStorageTokenOnBoardingSecond = async token => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY_ONBOARDING, JSON.stringify(token));
    return JSON.stringify(token);
  } catch (error) {
    throw error;
  }
};

export const onGetStorageTokenOnBoardingSecond = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY_ONBOARDING);
    return JSON.parse(token);
  } catch (error) {
    throw error;
  }
};

export const onSetStorageTokenTucoSecond = async token => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY_TUCO, JSON.stringify(token));
    return JSON.stringify(token);
  } catch (error) {
    throw error;
  }
};

export const onGetStorageTokenTucoSecond = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY_TUCO);
    return JSON.parse(token);
  } catch (error) {
    throw error;
  }
};

export const onSetStorageTokenExternoSecond = async token => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY_EXTERNO, JSON.stringify(token));
    return JSON.stringify(token);
  } catch (error) {
    throw error;
  }
};

export const onGetStorageTokenExternoSecond = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY_EXTERNO);
    return JSON.parse(token);
  } catch (error) {
    throw error;
  }
};

export const onSetStorageIdExternoSecond = async id => {
  try {
    await AsyncStorage.setItem(ID_KEY_EXTERNO, JSON.stringify(id));
    return JSON.stringify(id);
  } catch (error) {
    throw error;
  }
};

export const onGetStorageIdExternoSecond = async () => {
  try {
    const id = await AsyncStorage.getItem(ID_KEY_EXTERNO);
    return JSON.parse(id);
  } catch (error) {
    throw error;
  }
};

export const onSetStorageSessionidExternoSecond = async sessionid => {
  try {
    await AsyncStorage.setItem(
      SESSIONID_KEY_EXTERNO,
      JSON.stringify(sessionid),
    );
    return JSON.stringify(sessionid);
  } catch (error) {
    throw error;
  }
};

export const onGetStorageSessionidExternoSecond = async () => {
  try {
    const sessionid = await AsyncStorage.getItem(SESSIONID_KEY_EXTERNO);
    return JSON.parse(sessionid);
  } catch (error) {
    throw error;
  }
};

export const onSetStorageClienteSecond = async cliente => {
  try {
    await AsyncStorage.setItem(CLIENTE_KEY, JSON.stringify(cliente));
    return JSON.stringify(cliente);
  } catch (error) {
    throw error;
  }
};

export const onGetStorageClienteSecond = async () => {
  try {
    const cliente = await AsyncStorage.getItem(CLIENTE_KEY);
    return JSON.parse(cliente);
  } catch (error) {
    throw error;
  }
};

export const onClearStorageSecond = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    throw error;
  }
};
