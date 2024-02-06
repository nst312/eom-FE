const components = {};


export function registerComponent(name, Component) {
  components[name] = Component;
}

let clickNumber = 0;

export default function FuseNavItem(props) {
  clickNumber += 1;
  const C = components[props.type];
  return C ? <C {...props} data-tour={clickNumber} /> : null;
}
