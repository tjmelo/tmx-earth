let savedStyleElement: HTMLStyleElement | null = null;

const style = (element: HTMLStyleElement | null = null) => {  
  savedStyleElement = element;}

const rootStyle = () => savedStyleElement;

export { rootStyle };
export default style
