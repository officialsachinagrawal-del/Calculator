import useCalci from "../contexts/CalciContext";

export default function NavBar() {
  const { themeMode, darkTheme, lightTheme } = useCalci();

  const handleToggle = (e) => {
    if (e.target.checked) {
      darkTheme();
    } else {
      lightTheme();
    }
  };

  return (
    <label className="absolute inline-flex items-center cursor-pointer mt-4">

      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
      
         
          onChange={handleToggle}
          checked={themeMode === "dark"}
        />
        <label className="form-check-label" htmlFor="switchCheckChecked">
         
        </label>
      </div>

      {/* <div
        className="w-11 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full
          peer-focus:ring-4 peer-focus:ring-blue-300
          after:content-[''] after:absolute after:h-5 after:w-5 after:bg-white
          after:rounded-full after:top-[2px] after:left-[2px]
          peer-checked:after:translate-x-full after:transition-all"
      ></div> */}

      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">

        
        {themeMode === "light" ? "Light" : "Dark"} Mode

      </span>
    </label>
  );
}
