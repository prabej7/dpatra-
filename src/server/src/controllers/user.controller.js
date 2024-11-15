import { backend } from '../index.js';
import { stringify } from 'json-bigint';

export const login = async (res, req) => {
  try {
    const { userID, password } = req.body;
    const response = await backend.login(userID, password);
    return res.status(Number(response.message)).json(stringify(response));
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error.' });
  }
};
