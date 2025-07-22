import React from "react";
import { Input } from "../Input";

const Search = ({ value, onChange, onSubmit }) => {
  return (
    <div className="w-96 h-14 flex items-center rounded-[10px] shadow-xl mx-auto bg-white px-3">
      <img src="/logo-map.png" alt="" className="w-6 h-6 mr-2" />
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
        className="flex items-center w-full"
      >
        <Input
          type="text"
          placeholder="Ketik nama kontrakan atau lokasi"
          value={value}
          onChange={onChange}
          className="bg-white w-60 h-10 border focus:border-blue-500 focus:bg-white focus:outline-none rounded-lg"
        />
      </form>
    </div>
  );
};

export default Search;
