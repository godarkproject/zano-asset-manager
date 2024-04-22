import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// go
import { LaunchWallet } from "../../wailsjs/go/main/App";

// coontexts
import { ConnectionsContext } from "../contexts/ConnectionsContext";

// assets
import Logo from "../assets/ca_manager.svg";
import ZanoHub from "../assets/zanohub_network.svg";

type Inputs = {
  walletFile: string;
  passwordRequired: string;
};

export const WelcomeConnect = () => {
  const { daemon, addWallet, addPassword } = useContext(ConnectionsContext);

  const [walletFile, setWalletFile] = useState<string>("");
  const [status, setStatus] = useState<boolean | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addWallet(walletFile);
    addPassword(data.passwordRequired);
    LaunchWallet(walletFile, data.passwordRequired).then((res: boolean) => {
      setStatus(res);
    });
  };

  console.log(watch("walletFile")); // watch input value by passing the name of it
  return (
    <div className="flex flex-col justify-evenly pb-10 items-center welcome">
      <div className="flex flex-row m-auto gap-12 p-10 text-left pb-20">
        <div className="flex w-1/2 my-auto items-center">
          <img className="logo" src={Logo} width={400} alt="" />
        </div>
        <div className="card w-1/2 shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="card-title">Connect wallet</h2>
            <p>Connect wallet to get started managing Assets.</p>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                onChange={(event) => {
                  setWalletFile(event.target.value);
                }}
                // {...register("walletFile", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Seed password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("passwordRequired", { required: true })}
                required
              />

              {errors.passwordRequired && (
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    This field is required
                  </a>
                </label>
              )}

              {!status && status != null && (
                <label className="label">
                  <a
                    href="#"
                    className="text-error label-text-alt link link-hover"
                  >
                    Invalid password
                  </a>
                </label>
              )}
            </div>
            <div className="form-control mt-6">
              {daemon ? (
                <button className="btn btn-primary">Launch wallet</button>
              ) : (
                <button className="btn btn-primary" disabled>
                  Launch wallet
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <img className="" src={ZanoHub} width={120} alt="ZanoHub logo" />
    </div>
  );
};
