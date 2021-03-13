import Select from "react-select";

const S = ({ options, setselected, ...rest }) => {
  const handleChange = (selectedOption) => {
    setselected({ selectedOption });
    console.log("selectedOption", selectedOption);
  };
  return <Select options={options} {...rest} onChange={handleChange} />;
};

export { S };
