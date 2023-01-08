import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosGetDeviceData";

export default function useGetHook({ url, has_device_id }: any): any {
  const [data, setData] = useState({
    current_period: [],
    previous_period_total: 0,
    current_period_total: 0,
    next_period_total: 0,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function init() {
      try {
        if (has_device_id) {
          axiosInstance({
            url: "/ac484183-4a43-4a87-8e47-1748cd33ff9b",
            method: "GET",
            params: { ext_device_id: url.replace(":", "") },
          })
            .then((response) => {
              setData(response.data);
            })
            .catch((err) => {
              setError(err);
            });
        } else {
          axiosInstance({
            url: "/5b208333-44f9-422c-999d-d5a72ba9c233",
            method: "GET",
          })
            .then((response) => {
              setData(response.data);
            })
            .catch((err) => {
              setError(err);
            });
        }
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [url]);

  return { data, error, loading };
}
