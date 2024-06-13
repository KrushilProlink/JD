import { useEffect, useRef, FC } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import { getCSSVariableValue } from "../../../_metronic/assets/ts/_utils";
import { useThemeMode } from "../../../_metronic/partials/layout/theme-mode/ThemeModeProvider";

type Props = {
  className: string;
  chartColor: string;
  chartHeight: string;
};

const LineChart: FC<Props> = ({ className, chartColor, chartHeight }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();
  const refreshChart = () => {
    if (!chartRef.current) {
      return;
    }

    const chart = new ApexCharts(
      chartRef.current,
      chartOptions(chartColor, chartHeight)
    );
    if (chart) {
      chart.render();
    }

    return chart;
  };

  useEffect(() => {
    const chart = refreshChart();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef, mode]);

  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className="card-body d-flex flex-column p-0">
        {/* begin::Stats */}
        <div className="flex-grow-1 card-p pb-0">
          <div className="d-flex flex-stack flex-wrap">
            <div className="me-2">
              <span className="text-gray-900  fw-bold fs-3">Call Duration</span>

              {/* <div className="text-muted fs-7 fw-semibold">
                Finance and accounting reports
              </div> */}
            </div>

            {/* <div className={`fw-bold fs-3 text-${chartColor}`}>$24,500</div> */}
          </div>
        </div>
        {/* end::Stats */}

        {/* begin::Chart */}
        <div
          ref={chartRef}
          className="mixed-widget-7-chart card-rounded-bottom"
        ></div>
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  );
};

const chartOptions = (chartColor: string, chartHeight: string): ApexOptions => {
  const labelColor = getCSSVariableValue("--bs-gray-800");
  const strokeColor = getCSSVariableValue("--bs-gray-300");
  const baseColor = getCSSVariableValue("--bs-" + chartColor);
  const lightColor = getCSSVariableValue("--bs-" + chartColor + "-light");

  // const callDurations = [
  //   "5h 30m",
  //   "6h 15m",
  //   "4h 50m",
  //   "5h 45m",
  //   "7h 10m",
  //   "6h 30m",
  //   "4h 20m",
  //   "5h 40m",
  // ].map((duration) => {
  //   const [hours, minutes] = duration.split("h ").map((val, index) => {
  //     return index === 0 ? parseInt(val) * 60 : parseInt(val);
  //   });
  //   return hours + minutes;
  // });

  return {
    series: [
      {
        name: "Call Duration",
        data: [10, 15, 14, 20, 18, 2, 9, 3],
      },
    ],
    chart: {
      fontFamily: "inherit",
      type: "area",
      height: chartHeight,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "solid",
      opacity: 1,
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: [
        "John Doe",
        "Jane Smith",
        "Emily Johnson",
        "Michael Brown",
        "Laura Wilson",
        "James Davis",
        "Sophia Martinez",
        "Daniel White",
      ],
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      labels: {
        show: true,
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
      crosshairs: {
        show: true,
        position: "front",
        stroke: {
          color: strokeColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      min: 0,
      max: 60,
      labels: {
        show: true,
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      hover: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (val: any) {
          return val.toString();
        },
      },
    },
    colors: [lightColor],
    markers: {
      colors: [lightColor],
      strokeColors: [baseColor],
      strokeWidth: 3,
    },
  };
};

export default LineChart;
