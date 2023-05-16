import { H6 } from '../typography';
import { LoaderSvg, LoaderSvgPropsT } from './CircularLoader';

type Props = {
  message?: string;
  loaderSvgProps?: LoaderSvgPropsT;
  className?: string;
};

function Loader(props: Props) {
  const { message, loaderSvgProps, className = '' } = props;
  return (
    <div className={`h-full w-full break-all  flex justify-center items-center gap-2 flex-wrap ${className}`}>
      <LoaderSvg type={loaderSvgProps?.type || 'SECONDARY'} size={loaderSvgProps?.size || '10'} className={loaderSvgProps?.className} />
      {message ? <H6>{message}</H6> : null}
    </div>
  );
}

export default Loader;
