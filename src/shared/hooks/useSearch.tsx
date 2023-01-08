import { useState, useEffect } from "react";
import instance from "../../api/axiosGetChartData";

export default function useSearch(params: any): any {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const request = async (qparams: any) => {
    setLoading(true);
    try {
      let res = { data: {} };
      if (/^\w{20}$/.test(qparams)) {
        res = await instance({
          url: "/65aca9b8-df8d-409c-8624-daa99e2f8de7",
          method: "GET"
        });
        //}else if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(props)){
      } else if (/^shellyem3-\w{12}$/.test(qparams)) {
        res = await instance({
          url: "/ac484183-4a43-4a87-8e47-1748cd33ff9b",
          method: "GET"
        });
      }
      setData(res.data);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  return { data, error, loading, request };
}
