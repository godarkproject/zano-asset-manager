import { useForm, SubmitHandler } from "react-hook-form";

// go
import { EmitAsset } from "../../../wailsjs/go/main/App";

// contexts
import { ConnectionsContext } from "../../contexts/ConnectionsContext";
import { useContext } from "react";
import { Console } from "../Console";

type Inputs = {
  asset: string;
  emitAmount: string;
};

export const Emit = () => {
  const { walletFile, walletPassword } = useContext(ConnectionsContext);

  // const [] = useState("");

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    EmitAsset(data.asset, data.emitAmount, walletFile, walletPassword).then(
      (res) => {
        console.log(res);
      }
    );
    console.log(data.asset);
  };

  //   console.log(watch("ticker"));

  return (
    <div className="grid grid-cold-1 gap-3">
      <div className="card bg-base-100 mt-3 rounded-xl p-5">
        <form
          className="grid grid-cols-3 gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Asset name</span>
            </label>
            <select
              className="select select-bordered w-full max-w-xs"
              {...(register("asset"), { required: true })}
            >
              <option disabled selected>
                Asset name
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>

            {/* errors will return when field validation fails  */}
            {errors.asset && (
              <span className="text-error">This field is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Emit amount</span>
            </label>
            <input
              type="number"
              placeholder="100000000000000000"
              className="input input-bordered"
              // defaultValue="100000000000000000"
              {...register("emitAmount", { required: true })}
            />
            {errors.emitAmount && (
              <span className="text-error">This field is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text"></span>
            </label>
            <input className="btn btn-primary mt-5" type="submit" />
          </div>
        </form>
      </div>
      <Console />
    </div>
  );
};
