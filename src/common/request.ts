import axios from "axios";
interface Response {
  status: number;
  data: any;
}
interface RequestParams {
  url: string;
  method: string;
  data: object;
}
export default function request(params: RequestParams) {
  let { url, method, data } = params;
  let _req: any;
  if (method === "get") {
    _req = axios({
      url,
      method,
      params: data,
    });
  } else if (method === "post") {
    _req = axios({
      url,
      data,
      method,
    });
  }
  return new Promise((resolve, reject) => {
    _req.then((res: Response) => {
      let { status, data } = res;
      if (status === 200) {
        resolve(data);
      } else {
        reject({});
      }
    });
  });
}
