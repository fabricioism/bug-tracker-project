const CreateView = ({ children, title }) => {
  return (
    <>
      <div class="flex flex-wrap w-full mb-10">
        <div class="lg:w-1/2 w-full mb-2 lg:mb-0">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-1 text-gray-900">
            {title}
          </h1>
          <div class="h-1 w-20 bg-indigo-500 rounded"></div>
        </div>
      </div>
      <div class=" w-1/2">{children}</div>
    </>
  );
};

export { CreateView };
