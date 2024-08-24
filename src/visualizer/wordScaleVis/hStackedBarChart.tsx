import React from "react";
import * as d3 from "d3";
import { SVG_WIDTH, SVG_HEIGHT } from "../constants";
import { ChartProps, DataSpec } from "../types";
import { Tooltip } from "antd";
import { HorizontalStackedBarProps } from "../props";

const HorizontalStackedBar = ({
  gistvisSpec,
  colorScale,
  selectedEntity,
  setSelectedEntity,
}: ChartProps) => {
  const dataSpec = gistvisSpec.dataSpec ?? [];
  const xScale = d3.scaleLinear().domain([0, 1]).range([0, SVG_WIDTH]);
  let curSum = 0;
  const knownCategories = dataSpec.map((d: DataSpec, i: number) => {
    let thisPos = xScale(curSum);
    curSum += d.valueValue;
    const hoverStyle = {
      opacity: d.categoryValue === selectedEntity ? 1 : 0.5,
      transition: "opacity 0.3s",
    };
    return (
      <rect
        key={d.categoryValue}
        x={thisPos}
        y={SVG_HEIGHT * 0.2}
        width={xScale(d.valueValue)}
        height={SVG_HEIGHT * 0.8}
        fill={colorScale(d.categoryValue)}
        style={hoverStyle}
        // onClick={() => setCurrentEntity(d.categoryValue)}
        onMouseOver={() => {
          setSelectedEntity(d.categoryValue);
        }}
        onMouseOut={() => {
          setSelectedEntity("");
        }}
      />
    );
  });

  const unknownCategories = (
    <rect
      x={xScale(curSum)}
      y={SVG_HEIGHT * 0.2}
      width={SVG_WIDTH - xScale(curSum)}
      height={SVG_HEIGHT * 0.8}
      style={{ opacity: 0.5 }}
      fill={colorScale("")}
      // onClick={() => setCurrentEntity("unknown")}
    />
  );

  const toolTipContent = (
    <div
      style={{
        lineHeight: 1.1,
        fontSize: "14px",
        fontWeight: "bold",
        color: "#000000",
      }}
    >
      The proportion of{" "}
      <span style={{ color: colorScale(selectedEntity) }}>
        {selectedEntity === "" ? "others": selectedEntity}
      </span>{" "}
      is{" "}
      <span style={{ color: colorScale(selectedEntity) }}>
        {dataSpec.find((d: DataSpec) => d.categoryValue === selectedEntity)
          ?.valueValue !== undefined
          ? (dataSpec.find((d: DataSpec) => d.categoryValue === selectedEntity)
              ?.valueValue)?.toFixed(2)
          : (1 - curSum).toFixed(2)}
      </span>
    </div>
  );

  const visElement = (
    <Tooltip title={toolTipContent} placement="bottom" color="#ffffff">
      <svg height={SVG_HEIGHT} width={SVG_WIDTH}>
        {knownCategories && [...knownCategories, unknownCategories]}
      </svg>
    </Tooltip>
  );

  return <>{visElement}</>;
};

export default HorizontalStackedBar;