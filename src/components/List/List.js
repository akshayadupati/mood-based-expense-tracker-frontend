import "boxicons";
import { default as api } from "../../store/apiSlice";
import Charts from "../Charts/Charts";
import { CSVLink } from "react-csv";
import loader from "../../assets/loader.gif";

export default function List() {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  const [deleteTransaction] = api.useDeleteTransactionMutation();
  let Transactions;
  let csvData = [];

  const handleDelete = async (e) => {
    if (!e.target.dataset.id) return 0;
    await deleteTransaction({ _id: e.target.dataset.id }).unwrap();
  };
  if (isFetching) {
    Transactions = <h2>Fetching....</h2>;
  } else if (isSuccess) {
    csvData = data.map((eachData) => ({
      Expense_Name: eachData.expenseName,
      Expense_Type: eachData.expenseType,
      Mood: eachData.transactionMood,
      Amount: eachData.transactionAmount,
    }));
    Transactions = data.map((eachObj, index) => (
      <Transaction
        handleDelete={handleDelete}
        category={eachObj}
        key={index}
      ></Transaction>
    ));
  } else if (isError) {
    Transactions = <h2>Ooops. Error occurred! </h2>;
  }

  if (isFetching)
    return (
      <div className="flex justify-center items-center">
        <img src={loader} alt="Loader GIF" className="h-50" />
      </div>
    );
  return (
    <>
      {csvData.length !== 0 && data !== undefined ? (
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Charts />
          </div>
          <div className="flex flex-col py-6 gap-3">
            <h1 className="py-4 font-bold text-xl">Transaction Summary</h1>

            <span className="mb-5">
              <button className="download-btn p-2 border-transparent shadow-2xl	">
                <CSVLink
                  data={csvData}
                  filename={"my-expense.csv"}
                  className="flex flex-end items-center gap-4"
                >
                  Download CSV
                  <box-icon
                    className="mt-5"
                    size="20px"
                    color="black"
                    name="download"
                  />
                </CSVLink>
              </button>
            </span>
            {Transactions}
          </div>
        </div>
      ) : (
        <h1>No transactions are added yet. </h1>
      )}
    </>
  );
}

function Transaction({ category, handleDelete }) {
  if (!category) {
    return null;
  }
  return (
    <div
      className="item flex justify-center bg-gray-50 py-2 rounded "
      style={{ borderRight: `8px solid ${category.color ?? "black"}` }}
    >
      <button className="px-3" onClick={handleDelete}>
        <box-icon data-id={category._id} size="15px" color="red" name="trash" />
      </button>
      <span className="block w-full">{category.expenseName ?? ""}</span>
    </div>
  );
}
