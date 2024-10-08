type BookMarkIconTypes = {
  width?: string;
  height?: string;
};

const BookMarkIcon = ({ width = "50", height = "50" }: BookMarkIconTypes) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25 4C16.7179 4 10 10.5835 10 18.7C10 29.725 25 46 25 46C25 46 40 29.725 40 18.7C40 10.5835 33.2821 4 25 4ZM25 23.95C22.0429 23.95 19.6429 21.598 19.6429 18.7C19.6429 15.802 22.0429 13.45 25 13.45C27.9571 13.45 30.3571 15.802 30.3571 18.7C30.3571 21.598 27.9571 23.95 25 23.95Z"
        fill="white"
      />
    </svg>
  );
};

export default BookMarkIcon;
