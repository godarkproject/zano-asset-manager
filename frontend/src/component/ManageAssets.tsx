import { useState } from "react";
import { Deploy } from "./Actions/Deploy";
import { Emit } from "./Actions/Emit";
import { Burn } from "./Actions/Burn";
import { Edit } from "./Actions/Edit";

export const ManageAssets = () => {
  const [deploy, setDeploy] = useState<string>("tab-active");
  const [emit, setEmit] = useState<string>("");
  const [burn, setBurn] = useState<string>("");
  const [edit, setEdit] = useState<string>("");

  const [selected, setSelected] = useState<string>("deploy");

  const handleTab = (tab: string) => {
    switch (tab) {
      case "emit":
        setDeploy("");
        setEmit("tab-active");
        setBurn("");
        setEdit("");
        break;

      case "burn":
        setDeploy("");
        setEmit("");
        setBurn("tab-active");
        setEdit("");
        break;

      case "edit":
        setDeploy("");
        setEmit("");
        setBurn("");
        setEdit("tab-active");
        break;

      default:
        setDeploy("tab-active");
        setEmit("");
        setBurn("");
        setEdit("");
        break;
    }
  };
  return (
    <div className="p-5">
      <div role="tablist" className="tabs tabs-boxed">
        <a
          role="tab"
          className={`tab ${deploy}`}
          onClick={() => {
            handleTab("deploy");
            setSelected("deploy");
          }}
        >
          Deploy
        </a>
        <a
          role="tab"
          className={`tab ${emit}`}
          onClick={() => {
            handleTab("emit");
            setSelected("emit");
          }}
        >
          Emit
        </a>
        <a
          role="tab"
          className={`tab ${burn}`}
          onClick={() => {
            handleTab("burn");
            setSelected("burn");
          }}
        >
          Burn
        </a>
        <a
          role="tab"
          className={`tab ${edit}`}
          onClick={() => {
            handleTab("edit");
            setSelected("edit");
          }}
        >
          Edit
        </a>
      </div>
      <div>
        {selected == "deploy" && <Deploy />}
        {selected == "emit" && <Emit />}
        {selected == "burn" && <Burn />}
        {selected == "edit" && <Edit />}
      </div>
    </div>
  );
};
