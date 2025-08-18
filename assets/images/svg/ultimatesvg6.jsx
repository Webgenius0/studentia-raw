const Ultimatesvg6 = ({ hovered, defaultColor = "#C40400" }) => {
  const strokeColor = hovered ? "#82C8E5" : defaultColor;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
    >
      <path
        opacity="0.4"
        d="M9.54036 14.9548C12.2788 14.9548 14.4987 12.7348 14.4987 9.99642C14.4987 7.25801 12.2788 5.03809 9.54036 5.03809C6.80195 5.03809 4.58203 7.25801 4.58203 9.99642C4.58203 12.7348 6.80195 14.9548 9.54036 14.9548Z"
        fill="#C40400"
      />
      <path
        opacity="0.4"
        d="M9.54036 30.5378C12.2788 30.5378 14.4987 28.3178 14.4987 25.5794C14.4987 22.841 12.2788 20.6211 9.54036 20.6211C6.80195 20.6211 4.58203 22.841 4.58203 25.5794C4.58203 28.3178 6.80195 30.5378 9.54036 30.5378Z"
        fill="#C40400"
      />
      <path
        d="M21.582 6.45508H30.082"
        stroke={strokeColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21.582 22.0381H30.082"
        stroke={strokeColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21.582 13.5381H30.082"
        stroke={strokeColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21.582 29.1211H30.082"
        stroke={strokeColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.54036 14.9548C12.2788 14.9548 14.4987 12.7348 14.4987 9.99642C14.4987 7.25801 12.2788 5.03809 9.54036 5.03809C6.80195 5.03809 4.58203 7.25801 4.58203 9.99642C4.58203 12.7348 6.80195 14.9548 9.54036 14.9548Z"
        stroke={strokeColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.54036 30.5378C12.2788 30.5378 14.4987 28.3178 14.4987 25.5794C14.4987 22.841 12.2788 20.6211 9.54036 20.6211C6.80195 20.6211 4.58203 22.841 4.58203 25.5794C4.58203 28.3178 6.80195 30.5378 9.54036 30.5378Z"
        stroke={strokeColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Ultimatesvg6;
