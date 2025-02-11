import { useEffect, useState } from "react";

const useDetectBrowser = () => {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    if (global.navigator) {
      const userAgent = global.navigator.userAgent ?? "";
      const chromeAgent = userAgent.indexOf("Chrome") > -1;
      let safariAgent = userAgent.indexOf("Safari") > -1;
      if (chromeAgent && safariAgent) {
        safariAgent = false;
      }
      setIsSafari(safariAgent);
    }
  }, []);

  return {
    isSafari,
  };
};

export default useDetectBrowser;
