import { ISvgPropsType } from './svg-props.type';

function SecondPlaceIcon(props: ISvgPropsType) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="11 19 42 42"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Flat">
        <g id="Color">
          <circle cx="32" cy="41.5" fill="var(--olive-6)" r="19.5" />

          <circle cx="32" cy="41.5" fill="var(--olive-8)" r="14.5" />

          <path
            d="M33.88,33.57a6.49,6.49,0,0,0-5.81,1.23,6.41,6.41,0,0,0-2.21,4.89H30c0-2.24,3.37-2.38,4-1,1,2.1-8,7-8,7v4H38v-4H34a7.07,7.07,0,0,0,4-7.54A6.16,6.16,0,0,0,33.88,33.57Z"
            fill="var(--olive-6)"
          />
        </g>
      </g>
    </svg>
  );
}

export default SecondPlaceIcon;
