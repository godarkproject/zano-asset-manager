import { useForm, SubmitHandler } from "react-hook-form";

// go
import { DeployAsset } from "../../../wailsjs/go/main/App";

// contexts
import { ConnectionsContext } from "../../contexts/ConnectionsContext";
import { ZanoDetailsContext } from "../../contexts/ZanoDetailsContext";
import { useContext, useState } from "react";

type Inputs = {
  ticker: string;
  fullName: string;
  totalMaxSupply: string;
  currentSupply: string;
  decimalPoint: string;
  metaInfo: string;
  image: string;
};

export const Deploy = () => {
  const { walletFile, walletPassword } = useContext(ConnectionsContext);
  const { zanoAddress } = useContext(ZanoDetailsContext);

  const [imageFile, setImageFile] = useState("");

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    DeployAsset(
      zanoAddress,
      data.ticker,
      data.fullName,
      data.totalMaxSupply,
      data.currentSupply,
      data.decimalPoint,
      data.metaInfo,
      walletFile,
      imageFile,
      walletPassword
    ).then((res) => {
      console.log(res);
    });
    console.log(data.currentSupply);
  };

  //   console.log(watch("ticker"));

  return (
    <div className="card bg-base-100 mt-3 rounded-xl p-5">
      <form
        className="grid grid-cols-3 gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Ticker</span>
          </label>
          <input
            type="text"
            placeholder="RACKZ"
            className="input input-bordered"
            // defaultValue="$RACKZ"
            {...register("ticker", { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.ticker && (
            <span className="text-error">This field is required</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Full name</span>
          </label>
          <input
            type="text"
            placeholder="Rackz"
            className="input input-bordered"
            // defaultValue="Rackz"
            {...register("fullName", { required: true })}
          />
          {errors.fullName && (
            <span className="text-error">This field is required</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Total max supply</span>
          </label>
          <input
            type="number"
            placeholder="100000000000000000"
            className="input input-bordered"
            // defaultValue="100000000000000000"
            {...register("totalMaxSupply", {
              required: true,
              max: 18446744073709551615, // max value if uint64
            })}
          />
          {errors.totalMaxSupply && (
            <span className="text-error">This field is required</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Current supply</span>
          </label>
          <input
            type="number"
            placeholder="1000000000000000"
            className="input input-bordered"
            // defaultValue="1000000000000000"
            {...register("currentSupply", { required: true })}
          />
          {errors.currentSupply && (
            <span className="text-error">This field is required</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Decimal point</span>
          </label>
          <input
            type="number"
            placeholder="12"
            className="input input-bordered"
            // defaultValue="12"
            {...register("decimalPoint", { required: true })}
          />
          {errors.decimalPoint && (
            <span className="text-error">This field is required</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Meta info</span>
          </label>
          <input
            type="text"
            placeholder="Raccoon powered, private money."
            className="input input-bordered"
            // defaultValue="Raccoon powered, private money."
            {...register("metaInfo", { required: true })}
          />
          {errors.metaInfo && (
            <span className="text-error">This field is required</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Asset image <span className="text-warning">(optional)</span>
            </span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={(event) => {
              setImageFile(event.target.value);
            }}
            // {...register("image")}
          />
          {/* errors will return when field validation fails  */}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text"></span>
          </label>
          <input className="btn btn-primary mt-5" type="submit" />
        </div>
      </form>
    </div>
  );
};
