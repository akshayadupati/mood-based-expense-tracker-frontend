import "boxicons";
import { default as api } from "../../store/apiSlice";
import Charts from "../Charts/Charts";
import { CSVLink } from "react-csv";
import loader from "../../assets/loader.gif";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function List() {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  const [isFilter, setIsFilter] = useState(false);
  const [deleteTransaction] = api.useDeleteTransactionMutation();
  let Transactions;
  let csvData = [];
  let filteredData = [];

  const handleDelete = async (e) => {
    if (!e.target.dataset.id) return 0;
    await deleteTransaction({ _id: e.target.dataset.id }).unwrap();
  };

  const handleFilter = async (e) => {
    setIsFilter(true);
    console.log("eventtt", e.target.value);
    // filteredData = await data.filter((eachData) => {
    //   if (eachData.transactionMood === e.target.value) {
    //     return eachData;
    //   }
    // });
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

  if (isFetching) {
    return (
      <div className="flex justify-center items-center">
        <img src={loader} alt="Loader GIF" className="h-50" />
      </div>
    );
  }
  if (isFilter && filteredData.length > 0) {
    console.log("filteredData insidee", filteredData);
    Transactions = filteredData.map((eachObj, index) => (
      <Transaction
        handleDelete={handleDelete}
        category={eachObj}
        key={index}
      ></Transaction>
    ));
  }
  return (
    <>
      {console.log("transactionsss", Transactions)}
      {csvData.length !== 0 && data !== undefined ? (
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Charts />
          </div>
          <div className="flex flex-col gap-3 m-3">
            <h1 className="py-4 font-bold text-xl">Transaction Summary</h1>
            <div className="flex gap-4 flex-end justify-between">
              <span>
                <button className="download-btn p-2 border-transparent shadow-2xl	">
                  <CSVLink
                    data={csvData}
                    filename={"my-expense.csv"}
                    className="flex gap-4"
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
              <select
                className="form-input shadow-md filter"
                onChange={handleFilter}
              >
                <option value="Excited">Excited</option>
                <option value="Happy">Happy</option>
                <option value="Normal">Normal</option>
                <option value="Sad">Sad</option>
                <option value="Depressed">Depressed</option>
              </select>
            </div>

            {Transactions}
          </div>
        </div>
      ) : (
        <>
          <h1>No transactions are added yet. </h1>
          <button className="download-btn p-2 mt-3 border-transparent shadow-2xl	w-fit text-center mx-auto">
            <Link to="/home">Go back</Link>
          </button>
        </>
      )}
    </>
  );
}

function Transaction({ category, handleDelete }) {
  if (!category) {
    return null;
  }
  console.log("mmmm", category);
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
