import { ISvgPropsType } from './svg-props.type';

function ThirdPlaceIcon(props: ISvgPropsType) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="11 19 42 42"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Flat">
        <g id="Color">
          <circle cx="32" cy="41.5" fill="var(--bronze-6)" r="19.5" />

          <circle cx="32" cy="41.5" fill="var(--bronze-8)" r="14.5" />

          <path
            d="M36.54,41.5A4.52,4.52,0,0,0,38.38,38c0-2.76-2.86-5-6.38-5s-6.37,2.24-6.37,5h3.92a2,2,0,0,1,3.9-.29c.17,1.23-.77,2.73-2,2.73v2.12c2.22,0,2.84,3.5.72,4.32A2,2,0,0,1,29.55,45H25.63c0,2.76,2.85,5,6.37,5s6.38-2.24,6.38-5A4.52,4.52,0,0,0,36.54,41.5Z"
            fill="var(--bronze-6)"
          />
        </g>
      </g>
    </svg>
  );
}

export default ThirdPlaceIcon;
