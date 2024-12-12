const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-12 h-12 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
