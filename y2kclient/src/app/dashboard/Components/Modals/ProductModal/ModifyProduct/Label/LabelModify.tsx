interface LabelFormProps {
    name: string;
    onChange: any;
    error: string;
    label: string;
    value: string | number;
    id: number
  }

const LabelFormMod: React.FC<LabelFormProps> = ({
    label,
    name,
    value,
    error,
    onChange,
    id
  }) => {
    return (
      <div className="flex flex-col w-[100%]">
        <div className="text-Lightblue-950 flex justify-between flex-row font-titilium text-lg">
          <p>{label}:</p>
  
          {error && <p className="text-pink-950 self-end text-sm">{error}</p>}
        </div>
        {name === "description" ? (
          <textarea
            className={`w-full mb-3 p-2 border ${
              error ? "text-pink-950 border-pink-950" : "border-Lightblue-300"
            } rounded focus:outline-Lightblue-400`}
            name="description"
            placeholder="Description"
            value={value}
            disabled={id === 0}
            onChange={onChange}
          />
        ) : name === "price" ? (
          <input
            className={`w-full mb-3 p-2 border ${
              error ? "text-pink-950 border-pink-950" : "border-Lightblue-300"
            } rounded focus:outline-Lightblue-400`}
            type="text"
            name="price"
            placeholder="Price"
            value={value}
            disabled={id === 0}
            onChange={(e) => {
              const newValue = e.target.value;
              if (/^\d*$/.test(newValue)) {
                onChange(e);
              }
            }}
          />
        ) : (
          <input
            className={`w-full p-2 border ${
              error ? "border-pink-950" : "border-Lightblue-300"
            } rounded focus:outline-Lightblue-400`}
            type="text"
            name={name}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    );
  };

  export default LabelFormMod;