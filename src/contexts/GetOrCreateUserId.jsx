/* eslint-disable react-refresh/only-export-components */
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";

function GetOrCreateUserId() {
  let userId = Cookies.get("userId");
  if (!userId) {
    userId = uuidv4();
    Cookies.set("userId", userId, { expires: 365 });
  }

  return userId;
}

export default GetOrCreateUserId;
