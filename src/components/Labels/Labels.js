import { default as api } from "../../store/apiSlice";
import { getLabels } from "../helper/helper";

export default function Labels() {
  const { data, isFetching, isError, isSuccess } = api.useGetLabelsQuery();

  let Transactions;

  if (isFetching) {
    Transactions = <h2>Fetching....</h2>;
  } else if (isSuccess) {
    console.log("dataaa", getLabels(data));
    Transactions = getLabels(data).map((eachLabel, index) => (
      <LabelComponent key={index} eachLabel={eachLabel}></LabelComponent>
    ));
  } else if (isError) {
    Transactions = <h2>Ooops. Error occurred! </h2>;
  }
  return <>{Transactions}</>;
}

function LabelComponent({ eachLabel }) {
  if (!eachLabel) {
    return <></>;
  }
  return (
    <div className="labels flex justify-between">
      <div className="flex gap-2">
        <div
          className="w-2 h-2 rounded py-3"
          style={{ backgroundColor: `${eachLabel.color ?? "black"}` }}
        ></div>
        <h3 className="text-md">{eachLabel.transactionMood ?? ""}</h3>
      </div>
      <h2 className="font-bold">{Math.round(eachLabel.percent) ?? 0}%</h2>
    </div>
  );
}
