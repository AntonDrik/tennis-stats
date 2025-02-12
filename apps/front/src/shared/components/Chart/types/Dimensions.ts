interface IPaddings {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface IDimensions {
  fullWidth: number;
  fullHeight: number;
  handleResize: () => void;
}

interface IExtendedDimensions extends IDimensions {
  boundsWidth: number;
  boundsHeight: number;
}

export { IDimensions, IExtendedDimensions, IPaddings };
