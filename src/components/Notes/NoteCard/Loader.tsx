const Loader = () => {
  return (
    <div className="absolute -top-px -left-px -right-px -bottom-px flex items-center justify-center rounded-xl border border-black/10 bg-black/20">
      <svg
        className="animate-spin text-6xl"
        version="1.2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width="1em"
        height="1em"
      >
        <path
          fill="black"
          style={{ opacity: 0.15 }}
          className="s0"
          d="m32 64c-17.7 0-32-14.3-32-32 0-17.7 14.3-32 32-32 17.7 0 32 14.3 32 32 0 17.7-14.3 32-32 32zm26-32c0-14.4-11.6-26-26-26-14.4 0-26 11.6-26 26 0 14.4 11.6 26 26 26 14.4 0 26-11.6 26-26z"
        />
        <path
          fill="white"
          style={{ opacity: 0.85 }}
          className="s1"
          d="m0 32c0-17.7 14.3-32 32-32v6c-14.4 0-26 11.6-26 26z"
        />
      </svg>
    </div>
  );
};

export default Loader;
