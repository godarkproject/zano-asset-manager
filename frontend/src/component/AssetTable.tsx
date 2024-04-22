import Rackz from "../assets/rackz.png";

export const AssetTable = () => {
  return (
    <div className="p-5">
      <div className="overflow-x-auto bg-base-100 rounded-lg">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Asset Name</th>
              <th>Meta info & ID</th>
              <th>Supply</th>
              <th>Decimal</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-16 h-16">
                      <img src={Rackz} alt={`${""}`} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Rackz</div>
                    <div className="text-sm opacity-50">$RKZ</div>
                  </div>
                </div>
              </td>
              <td>
                Meta: Raccoon powered, private MeMe money for the masses.
                <br />
                <span className="badge badge-primary">
                  ID: 7dkashfksbjcdlksdjfirkw4rjnflksnd
                </span>
              </td>
              <td>
                Max: 10000000000000000000000.
                <br />
                <span className="badge badge-primary">
                  Emitted: 7dkashfksbjcdlksdjfirkw4rjnflksnd
                </span>
              </td>
              <th>12</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
