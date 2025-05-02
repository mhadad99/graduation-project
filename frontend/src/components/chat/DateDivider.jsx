/** @format */

import React from "react";

const DateDivider = ({ timestamp }) => (
  <div className="text-center my-3">
    <span className="badge bg-light text-dark px-3 py-2">
      {new Date(timestamp).toLocaleDateString([], {
        weekday: "long",
        month: "short",
        day: "numeric",
      })}
    </span>
  </div>
);

export default DateDivider;
