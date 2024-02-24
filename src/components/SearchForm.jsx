import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "./index";

const SearchForm = ({
  onSearchFormSubmit,
  setSearchTerm,
  smallDeviceSearchInputRef,
}) => {
  return (
    <form
      className={`w-full flex items-center dark:bg-dark-2 bg-transparent rounded-full border border-light-2 dark:border-none px-4 py-[6px]`}
      onSubmit={onSearchFormSubmit}>
      <input
        type="text"
        placeholder="Search"
        className="w-full bg-transparent outline-none dark:text-light-1"
        onChange={(e) => setSearchTerm(e.target.value)}
        ref={smallDeviceSearchInputRef}
      />
      <Button
        type="submit"
        textColor="dark:text-light-1 text-dark-1"
        bgColor="bg-transparent"
        className="pl-0 pt-0 pr-0 pb-0">
        <MagnifyingGlassIcon className={`w-5 h-5`} />
      </Button>
    </form>
  );
};

export default SearchForm;
