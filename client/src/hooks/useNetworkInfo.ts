import { useState, useEffect } from "react";

const useNetworkInfo = () => {
  const [networkInfo, setNetworkInfo] = useState({
    localInfo: [],
    publicIp: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNetworkInfo = async () => {
      try {
        setLoading(true);
        const info = await window.ipcRenderer.invoke("get-network-info"); // Access Electron's secure API
        setNetworkInfo(info);
      } catch (err) {
        setError(
          err.message || "An error occurred while fetching network info"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNetworkInfo();
  }, []);

  return { networkInfo, loading, error };
};

export default useNetworkInfo;
