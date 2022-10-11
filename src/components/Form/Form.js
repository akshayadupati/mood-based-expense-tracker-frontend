import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { default as api } from "../../store/apiSlice";

const Form = () => {
  const { register, handleSubmit, resetField } = useForm();
  const [addTransaction] = api.useAddTransactionMutation();
  let date = new Date().toISOString().split('T')[0].toString()
  const submitFormHandler = async (data) => {
    if (!data) return {};
    await addTransaction(data).unwrap();
    resetField("expenseName");
    resetField("transactionAmount");
    resetField("transactionDate");
  };

  return (
    <div className="form max-w-sm mx-auto w-96">
      <h1 className="font-bold pb-4 text-xl">Add a new transaction </h1>
      <form id="form" onSubmit={handleSubmit(submitFormHandler)}>
        <div className="grid gap-4">
          <div className="input-group">
            <input
              type="text"
              {...register("expenseName", { required: true, minLength: 2 })}
              placeholder="Enter transaction name.."
              className="form-input shadow-md"
            ></input>
          </div>
          <select
            className="form-input shadow-md"
            {...register("expenseType", { required: true })}
          >
            <option value="Rental">Rental</option>
            <option value="Food">Food</option>
            <option value="Movies">Movies</option>
            <option value="Travel">Travel</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
          <select
            className="form-input shadow-md"
            {...register("transactionMood", { required: true })}
          >
            <option value="Excited">Excited 🤩</option>
            <option value="Happy">Happy 😊</option>
            <option value="Normal">Normal 😬</option>
            <option value="Sad">Sad 😔</option>
            <option value="Depressed">Depressed 😭</option>
          </select>
          <div className="input-group shadow-md">
            <input
              type="number"
              {...register("transactionAmount", { required: true, min: 1 })}
              placeholder="Enter amount.."
              className="form-input"
            ></input>
          </div>
          <div className="input-group shadow-md">
            <input
              type="date"
              max={date}
              {...register("transactionDate", {
                required: true
              })}
              placeholder="Enter transaction date..."
              className="form-input"
            ></input>
          </div>
          <div className="submit-btn shadow-md">
            <button className="border py-2 text-white mustard w-full rounded-md">
              Add Transaction
            </button>
          </div>
        </div>
      </form>
      <div className="submit-btn shadow-md">
        <Link to="/history">
          <button className="border py-2 mt-3 text-white mustard w-full rounded-md">
            View history
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Form;
