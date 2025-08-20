import { basePath } from '../utils/basePath';

const withBase = (p: string) =>
  `${String(basePath || import.meta.env.BASE_URL || '/').replace(/\/?$/, '/')}${p.replace(/^\/+/, '')}`;

const Mascot = () => {
  return (
    <div className="fixed bottom-0 left-0 z-40">
      <img
        src={withBase('assets/cezar.png')}
        alt="Mascote CB Comercial"
        className="w-28 sm:w-40 md:w-52 lg:w-[300px] xl:w-[360px] drop-shadow-2xl transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
};

export default Mascot;
