import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Labels from "../Labels/Labels";
import { chartData, totalSum } from "../helper/helper";
import { default as api } from "../../store/apiSlice";

Chart.register(ArcElement);

const Charts = () => {
  const { data, isFetching, isError, isSuccess } = api.useGetLabelsQuery();

  let graphData;
  let totalData;
  if (isFetching) {
    graphData = <h2>Fetching....</h2>;
    totalData = 0;
  } else if (isSuccess) {
    let chartConfig = chartData(data);
    graphData = <Doughnut {...chartConfig}></Doughnut>;
    let totalValue = totalSum(data);
    totalData = totalValue;
  } else if (isError) {
    totalData = 0;
    graphData = <h2>Ooops. Error occurred! </h2>;
  }

  return (
    <div className="flex max-w-xs mx-auto">
      <div className="flex-item">
        <div className="chart">
          {graphData}
          <h3 className="mt-3 mx-auto">
            Total Transactions made : <span>${totalData}</span>
          </h3>
        </div>
        <div className="flex flex-col py-5 gap-4">
          <Labels />
        </div>
      </div>
    </div>
  );
};

export default Charts;
