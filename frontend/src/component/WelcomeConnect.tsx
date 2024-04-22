import { useForm, SubmitHandler } from "react-hook-form";

// assets
import Logo from "../assets/ca_manager.svg";

type Inputs = {
  walletFile: string;
  passwordRequired: string;
};

export const Index = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("walletFile")); // watch input value by passing the name of it
  return (
    <div className="grid grid-cols-2 gap-10 p-5 text-left">
      <div className="flex my-auto items-center">
        <img className="logo" src={Logo} width={400} alt="" />
      </div>
      <div className="card w-full shadow-2xl bg-base-100">
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
              {...register("walletFile", { required: true })}
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
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Launch wallet</button>
          </div>
        </form>
      </div>
    </div>
  );
};
