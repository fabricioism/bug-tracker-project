import AsyncSelect from "react-select/async";
import { Spinner } from "@chakra-ui/react";
import useSWR from "swr";
import { supabase } from "@lib/initSupabase";
import fetcher from "@utils/fetcher";

export const AS = ({ api, valueField, labelField, setFunction, ...rest }) => {
  const { data, error } = useSWR(api, fetcher);

  if (error) return <div>failed to load</div>;

  if (!data) return <Spinner />;

  const options = data
    ? data
        ?.filter((item) => item.active)
        .map((item) => {
          return { value: item[valueField], label: item[labelField] };
        })
    : [];

  const filterOptions = (inputValue) => {
    return options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterOptions(inputValue));
    }, 800);
  };

  const onChange = (inputValue) => {
    setFunction(inputValue);
  };

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions
      {...rest}
      onChange={onChange}
    />
  );
};
