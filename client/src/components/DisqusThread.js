import React, { useEffect } from "react";
import PropTypes from "prop-types";

// const SHORTNAME = "blog-p0hkhcznv8";
// const URL = "https://blog-mern-eyva.onrender.com";

const renderDisqus = () => {
  if (window.DISQUS === undefined) {
    var script = document.createElement("script");
    script.async = true;
    script.src =
      "https://" + process.env.REACT_APP_SHORTNAME + ".disqus.com/embed.js";
    document.getElementsByTagName("head")[0].appendChild(script);
  } else {
    window.DISQUS.reset({ reload: true });
  }
};

const DisqusThread = ({ id, title, path, ...other }) => {
  useEffect(() => {
    renderDisqus();
  }, [id, title, path]);

  if (process.env.BROWSER) {
    window.disqus_shortname = process.env.REACT_APP_SHORTNAME;
    window.disqus_identifier = id;
    window.disqus_title = title;
    window.disqus_url = process.env.REACT_APP_WEBSITE_URL + path;
  }

  return <div {...other} id="disqus_thread" />;
};

DisqusThread.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default DisqusThread;
