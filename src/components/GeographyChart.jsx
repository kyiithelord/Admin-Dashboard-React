import { useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoFeatures } from "../data/mockGeoFeatures";
import { tokens } from "../theme";
import { mockGeographyData as data } from "../data/mockData";

const GeographyChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const CustomTooltip = ({ feature }) => {
    const isDark = theme.palette.mode === "dark";
    const bgColor = isDark ? "#333" : "#fff";
    const color = isDark ? "#fff" : "#000";

    const value = feature?.value;
    const label = feature?.label || feature?.properties?.name || "Unknown";

    return (
      <div
        style={{
          background: bgColor,
          color,
          padding: "9px 12px",
          borderRadius: "4px",
          boxShadow: "0 3px 9px rgba(0, 0, 0, 0.5)",
        }}
      >
        <strong>{label}</strong>: {value !== undefined ? value.toLocaleString() : "No data"}
      </div>
    );
  };

  return (
    <ResponsiveChoropleth
      data={data}
      features={geoFeatures.features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      domain={[0, 1000000]}
      unknownColor={theme.palette.mode === "dark" ? "#666666" : "#cccccc"}
      label="properties.name"
      valueFormat=".2s"
      projectionScale={isDashboard ? 40 : 150}
      projectionTranslation={isDashboard ? [0.49, 0.6] : [0.5, 0.5]}
      projectionRotation={[0, 0, 0]}
      borderWidth={1.5}
      borderColor={colors.grey[100]}
      tooltip={CustomTooltip}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-left",
                direction: "column",
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: colors.grey[100],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor:
                        theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default GeographyChart;
  