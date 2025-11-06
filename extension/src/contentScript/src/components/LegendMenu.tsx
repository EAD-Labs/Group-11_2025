import React from "react";

const legendItems = [
  { label: "Not Visited", className: "goqualify-not-visited" },
  { label: "Visited", className: "goqualify-visited" },
  { label: "Saved for Later", className: "goqualify-saved" },
  { label: "Correct", className: "goqualify-correct" },
  { label: "Incorrect", className: "goqualify-incorrect" },
];

const LegendMenu: React.FC = () => (
  <div className="legend-menu">
    <span className="legend-title">Legend</span>
    {legendItems.map((item) => (
      <span className="legend-item" key={item.label}>
        <span className={`legend-color ${item.className}`}></span>
        {item.label}
      </span>
    ))}
  </div>
);

export default LegendMenu;
