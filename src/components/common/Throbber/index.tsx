const Throbber = () => {
    return (
      <div className="flex items-center justify-center bg-tranparent dark:bg-black">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  };
  
  export default Throbber;
  