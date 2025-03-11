import IceCube from '../assets/svgs/ice-cube.svg';
import Minus from '../assets/svgs/icon-minus.svg';
import Pencil from '../assets/svgs/icon-pencil.svg';
import PlayButton from '../assets/svgs/icon-play.svg';
import Plus from '../assets/svgs/icon-plus.svg';
import Rewind from '../assets/svgs/icon-rewind.svg';
import Caret from '../assets/svgs/icon-caret.svg';

const SVGMap = {
  'ice-cube': IceCube,
  'minus': Minus,
  'pencil': Pencil,
  'play-button': PlayButton,
  'plus': Plus,
  'rewind': Rewind,
  'caret': Caret
};

export type SVGName = keyof typeof SVGMap;

interface SVGProps {
  name: SVGName;
}

const SVG: React.FC<SVGProps> = ({ name }) => {
  const SvgComponent = SVGMap[name];
  return <SvgComponent />;
};

export default SVG;