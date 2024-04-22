export const Tips = () => {
  return (
    <div className="grid gap-2">
      <div className="collapse collapse-plus bg-base-100">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title text-xl text-warning font-medium">
          What is the max supply I can set?
        </div>
        <div className="collapse-content">
          <p>
            '18446744073709551615' Represents the largest possible value of
            UInt64 type.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-100">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl text-warning font-medium">
          Why do you accept an image?
        </div>
        <div className="collapse-content">
          <p>
            The image is used in the GUI and across the ZanoHub services, for
            example; when listing your asset, Images aren't stored on-chain.
          </p>
        </div>
      </div>
    </div>
  );
};
