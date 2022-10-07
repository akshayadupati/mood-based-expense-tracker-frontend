import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { default as api } from "../../store/apiSlice";

const Form = () => {
  const { register, handleSubmit, resetField } = useForm();
  const [addTransaction] = api.useAddTransactionMutation();

  const submitFormHandler = async (data) => {
    if (!data) return {};
    await addTransaction(data).unwrap();
    resetField("expenseName");
    resetField("transactionAmount");
  };

  return (
    <div className="form max-w-sm mx-auto w-96">
      {console.log("window location", window.location)}
      <h1 className="font-bold pb-4 text-xl">Transaction</h1>
      <form id="form" onSubmit={handleSubmit(submitFormHandler)}>
        <div className="grid gap-4">
          <div className="input-group">
            <input
              type="text"
              {...register("expenseName")}
              placeholder="Enter transaction name.."
              className="form-input"
            ></input>
          </div>
          <select className="form-input" {...register("expenseType")}>
            <option value="Rental">Rental</option>
            <option value="Food">Food</option>
            <option value="Movies">Movies</option>
            <option value="Travel">Travel</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
          <select className="form-input" {...register("transactionMood")}>
            <option value="Excited">Excited</option>
            <option value="Happy">Happy</option>
            <option value="Normal">Normal</option>
            <option value="Sad">Sad</option>
            <option value="Depressed">Depressed</option>
          </select>
          <div className="input-group">
            <input
              type="number"
              {...register("transactionAmount")}
              placeholder="Enter amount.."
              className="form-input"
            ></input>
          </div>
          <div className="submit-btn">
            <button className="border py-2 text-white bg-black w-full">
              Add Transaction
            </button>
          </div>
        </div>
      </form>
      <div className="submit-btn">
        <Link to="/history">
          <button className="border py-2 mt-3 text-white bg-black w-full">
            View history
          </button>
        </Link>
      </div>
      {/* <List></List> */}
    </div>
  );
};

export default Form;
