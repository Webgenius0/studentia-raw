const Ultimatesvg1 = ({ hovered, defaultColor = "#4F46E5" }) => {
  const strokeColor = hovered ? "#82C8E5" : defaultColor;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="35"
      viewBox="0 0 34 35"
      fill="none"
    >
      <path
        d="M14.8763 31.9548H13.4596C8.78488 31.9548 6.44749 31.9548 4.99524 30.5025C3.54297 29.0502 3.54297 26.7128 3.54297 22.0381V14.9548C3.54297 10.28 3.54297 7.94261 4.99524 6.49035C6.44749 5.03809 8.78488 5.03809 13.4596 5.03809H17.7096C22.3844 5.03809 24.7217 5.03809 26.1741 6.49035C27.6263 7.94261 27.6263 10.28 27.6263 14.9548V16.3714"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.6667 3.62109V6.45443M15.5833 3.62109V6.45443M8.5 3.62109V6.45443"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.8"
        d="M9.91797 22.0381H15.5846"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9.91797 14.9551H21.2513"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        opacity="0.8"
        d="M25.8894 21.1801C23.9428 23.1624 20.191 26.7024 20.191 26.9502C19.8886 27.3705 19.6248 28.2246 19.4479 29.4282C19.2256 30.5438 18.9594 31.5167 19.2709 31.7999C19.5824 32.0831 20.7552 31.8443 21.9962 31.5875C22.9871 31.4814 23.9074 31.1274 24.3675 30.7733C25.04 30.1783 29.6056 25.5696 30.1366 24.9678C30.5259 24.4369 30.5613 23.4456 30.2215 22.8438C30.0304 22.4191 28.827 21.2864 28.4377 20.9677C27.7298 20.5429 26.7389 20.4722 25.8894 21.1801Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Ultimatesvg1;
