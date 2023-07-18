import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={285}
    height={465}
    viewBox="0 0 285 465"
    backgroundColor="#f3f3f3"
    foregroundColor="rgba(255,300,255,1"
    {...props}
  >
    <rect x="16" y="325" rx="10" ry="10" width="260" height="88" />
    <rect x="16" y="276" rx="10" ry="10" width="260" height="27" />
    <rect x="16" y="430" rx="10" ry="10" width="80" height="27" />
    <circle cx="134" cy="136" r="125" />
    <rect x="191" y="430" rx="10" ry="10" width="80" height="27" />
  </ContentLoader>
);

export default Skeleton;
